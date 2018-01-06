import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const getDate = (ts) => {
  const date = new Date(ts)
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

const Repos = ({ data: { error, repos, loading }}) => {
  return (
    <article>
      <h3>Latest Repos</h3>
      {repos && repos
        .map(p => {
        return(
          <div key={p.id}>
            <p>
              <a href={p.html_url} target='_blank'>{p.name}</a>
              &nbsp;-&nbsp;
              {p.description} 
            </p>
          </div>
        )
      })}
    </article>
  )
}

// We use the gql tag to parse our query string into a query document
const postsQuery = gql`
  query reposQuery($username: String!){
    repos(username: $username) {
      id
      name 
      html_url
      description
      fork
      created_at
    }
  }
`

export default graphql(postsQuery, {
  options: {
    variables: {
      username: 'hobochild',
      limit: 5,
    }
  }
})(Repos)
