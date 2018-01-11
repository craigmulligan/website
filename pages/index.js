import App from '../components/App'
import Header from '../components/Header'
import Posts from '../components/Posts'
import Repos from '../components/Repos'
import Me from '../components/Me'

import withData from 'next-static-tools/withData'

export default withData((props) => (
  <App>
    <Header pathname={props.url.pathname} />
    <Me />
    <hr />
    <Posts />
    <hr />
    <Repos />
  </App>
))
