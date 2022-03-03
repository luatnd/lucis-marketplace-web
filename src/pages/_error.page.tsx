const Error = ({ statusCode }) => {
  return (
    <div className="error-page">
      <h1 className="error-code">{statusCode}</h1>
      <span className="error-description">This page could not be found.</span>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
