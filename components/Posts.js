import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const getDate = (ts) => {
  const date = new Date(ts)
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

const Posts = ({ data: { error, posts, loading }}) => {
  return (
    <article>
      <h3>Latest Posts</h3>
      {posts && posts.map(p => {
        return(
          <div key={p.id}>
            <p>
              <span>{getDate(p.firstPublishedAt)}</span> 
              &nbsp;-&nbsp; 
              <a href={p.url} rel='noopener' target='_blank'>{p.title}</a>
            </p>
          </div>
        )
      })}
    </article>
  )
}

// We use the gql tag to parse our query string into a query document
const postsQuery = gql`
  query postsQuery($username: String!){
    posts(username: $username) {
      id
      title
      content {
        subtitle
      }
      firstPublishedAt
      url
    }
  }
`

export default graphql(postsQuery, {
  options: {
    variables: {
      username: 'hobochild'
    }
  }
})(Posts)
