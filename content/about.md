## About this site 

Apollo is a GraphQL client that allows you to easily query the exact data you need from a GraphQL server. In addition to fetching and mutating data, Apollo analyzes your queries and their results to construct a client-side cache of your data, which is kept up to date as further queries and mutations are run, fetching more results from the server.

In this simple example, we integrate Apollo seamlessly with Next by wrapping our pages inside a higher-order component (HOC). Using the HOC pattern we're able to pass down a central store of query result data created by Apollo into our React component hierarchy defined inside each page of our Next application.

On initial page load, while on the server and inside getInitialProps, we invoke the Apollo method, getDataFromTree. This method returns a promise; at the point in which the promise resolves, our Apollo Client store is completely initialized.

Ofcoarse we don't want to run a production grapqhl server, for a basic static site. So we instead run it only in dev mode and when building the site we write out the queries and the resulting data to json file. The client then loads these json files and renders the data. 
