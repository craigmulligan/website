import Link from 'next/link'
import Head from 'next/head'

export default ({ pathname }) => (
  <header>
    <Head>
      <link rel="shortcut icon" href="/static/favicon.ico"/>
      <meta name="viewport" content="width=device-width"/>
    </Head>
    <Link prefetch href='/'>
      <a className={pathname === '/' && 'is-active'}>Home</a>
    </Link>

    <Link prefetch href='/about'>
      <a className={pathname === '/about' && 'is-active'}>About</a>
    </Link>

    <style jsx>{`
      header {
        margin-bottom: 25px;
      }
      a {
        font-size: 14px;
        margin-right: 15px;
        text-decoration: none;
      }
      .is-active {
        text-decoration: underline;
      }
    `}</style>
  </header>
)
