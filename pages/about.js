import App from '../components/App'
import Header from '../components/Header'
import Content from '../components/Content'
import withData from 'nextatic/withData'
import Projects from '../components/Projects'

export default withData((props) => (
  <App>
    <Header pathname={props.url.pathname} />
    <Content slug={props.url.pathname} />
  </App>
))
