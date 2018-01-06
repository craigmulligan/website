import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

function createMarkup(html) { return {__html: html} };

const Content = ({ data: { error, content, loading }, ...props}) => {
  return (
    <article dangerouslySetInnerHTML={createMarkup(content)}/>
  )
}

// We use the gql tag to parse our query string into a query document
const contentQuery = gql`
  query contentQuery($slug: String){
    content(slug: $slug)
  }
`

export default graphql(contentQuery, {
  options: ({ slug }) => ({
    variables: {
      slug 
    }
  })
})(Content)
