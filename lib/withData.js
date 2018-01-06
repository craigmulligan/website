import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import Head from 'next/head'
import initApollo from './initApollo'
import fs from 'fs-jetpack'
import deepMerge from 'deepmerge'
// Gets the display name of a JSX component for dev tools
function getComponentDisplayName (Component) {
  return Component.displayName || Component.name || 'Unknown'
}

const isServer = () => typeof window === 'undefined'

export const isExport = () =>
  (typeof __NEXT_DATA__ !== 'undefined' && __NEXT_DATA__.nextExport) ||
    (!isServer() &&
      typeof window.__NEXT_DATA__ !== 'undefined' &&
      window.__NEXT_DATA__.nextExport)

export default ComposedComponent => {
  return class WithData extends React.Component {
    static displayName = `WithData(${getComponentDisplayName(ComposedComponent)})`
    static propTypes = {
      serverState: PropTypes.object.isRequired
    }

    static async getInitialProps (ctx) {
      let serverState = { apollo: {} }
      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {}
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx)
      }

      const url = {query: ctx.query, pathname: ctx.pathname}
      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        const apollo = initApollo()
        // Provide the `url` prop data in case a GraphQL query uses it
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <ApolloProvider client={apollo}>
            <ComposedComponent url={url} {...composedInitialProps} />
            </ApolloProvider>
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
          console.error(error.networkError.result)
        }
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()

        if (url.pathname.endsWith('/')) {
          url.pathname = `${url.pathname}index`
        }
        await fs.writeAsync(`./static/data${url.pathname}.json`, JSON.stringify(apollo.cache.extract(), null, 2).replace(/</g, '\\u003c'))
        console.log('file written')
        // Extract query data from the Apollo store
        serverState = {
          apollo: {
            data: apollo.cache.extract()
          }
        }
      } else {
        if (process.browser) {
          if (url.pathname.endsWith('/')) {
            url.pathname = `${url.pathname}index`
          }
          const clientData = await fetch(`/static/data${url.pathname}.json`).then(res => res.json())

          serverState = {
            apollo: {
              data: clientData
            }
          }
        }
      }

      return {
        serverState,
        ...composedInitialProps
      }
    }

    constructor (props) {
      super(props)
      this.apollo = initApollo(this.props.serverState.apollo.data)
    }

    render () {
      return (
        <ApolloProvider client={this.apollo}>
        <ComposedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }
}
