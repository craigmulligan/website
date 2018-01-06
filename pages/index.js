import App from '../components/App'
import Header from '../components/Header'
import Posts from '../components/Posts'
import Repos from '../components/Repos'
import withData from '../lib/withData'
import Me from '../components/Me'
import Divider from '../components/Divider'

export default withData((props) => (
  <App>
    <Header pathname={props.url.pathname} />
    <Me />
    <Divider />
    <Posts />
    <Divider />
    <Repos />
  </App>
))
