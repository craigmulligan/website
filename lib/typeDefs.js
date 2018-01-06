const typeDefs = `
  scalar Timestamp

  type Content {
    subtitle: String
  }

  type Post {
    id: ID!
    title: String!
    subtitle: String
    uniqueSlug: String!
    url: String!
    content: Content!
    firstPublishedAt: Timestamp!
    latestPublishedAt: Timestamp
    createdAt: Timestamp
    updatedAt: Timestamp
  }

  type User {
    userId: ID!
    name: String!
    username: String!
    createdAt: Timestamp,
    lastPostCreatedAt: Timestamp,
    imageId: String
    backgroundImageId: String
    bio: String
    type: String
  }

  type Repo {
    name: String!
    description: String
    html_url: String!
    fork: Boolean
    stargazers_count: Int
    created_at: String
    updated_at: String
    id: ID
  }

  type Query {
    hello(name: String): String!
    content(slug: String): String!
    posts(username: String, limit: Int = 10): [Post!]!
    user(username: String!): User!
    repos(username: String!): [Repo!]!
  }
`

module.exports = typeDefs
