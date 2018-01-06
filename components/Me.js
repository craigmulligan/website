import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Content from './Content'

const Me = ({ data: { error, user, loading }}) => {
  return ( 
    <div>
    {
      user && <img className="avatar" src={`https://cdn-images-1.medium.com/fit/c/100/100/${user.imageId}`} />
    }
    <style jsx>{
      `
      div {
        text-align: center
      }
      `
    }</style>
      <Content slug='/welcome' />
    </div>
  ) 
}
// We use the gql tag to parse our query string into a query document
const meQuery = gql`
  query userQuery($username: String!){
    user(username: $username) {
      imageId
      userId
      name
      username
    }
  }
`

export default graphql(meQuery, {
  options: {
    variables: {
      username: 'hobochild'
    }
  }
})(Me)
