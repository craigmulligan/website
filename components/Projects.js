import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Projects = ({ data: { error, user, loading }}) => {
  return (
    <div>{user}</div>
  )
}
// We use the gql tag to parse our query string into a query document
const helloQuery = gql`
  query userQuery($name: String){
    user(username: $username)
  }
`

export default graphql(helloQuery, {
  options: {
    variables: {
      username: 'hobochild'
    }
  }
})(Projects)
