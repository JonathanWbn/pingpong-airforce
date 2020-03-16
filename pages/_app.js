import '../global.css'

// eslint-disable-next-line react/prop-types
export default function MyApp({ Component, pageProps }) {
  return (
    <div className="app">
      <Component {...pageProps} />
    </div>
  )
}
