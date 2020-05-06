import '../global.css'

type Props = {
  Component: React.FunctionComponent
  pageProps: object
}

// eslint-disable-next-line react/prop-types
const MyApp: React.FunctionComponent<Props> = ({ Component, pageProps }) => {
  return (
    <div className="app">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
