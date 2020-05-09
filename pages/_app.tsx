import '../global.css'

type Props = {
  Component: React.FunctionComponent
  pageProps: object
}

const MyApp: React.FunctionComponent<Props> = ({ Component, pageProps }) => {
  return (
    <div className="app">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
