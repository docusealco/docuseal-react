import React from 'react'

interface DocusealBuilderProps {
  token: string,
  host?: string,
  backgroundColor?: string
}

const DocusealBuilder = ({
  token,
  host = 'cdn.docuseal.co',
  backgroundColor = '',
}: DocusealBuilderProps): JSX.Element => {
  const scriptId = 'docuseal-builder-script'
  const scriptSrc = `https://${host}/js/builder.js`
  const isServer = typeof window === 'undefined'

  if (!isServer) {
    React.useEffect(() => {
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script')

        script.id = scriptId
        script.async = true
        script.src = scriptSrc

        document.head.appendChild(script)
      }
    }, [])
  }

  return (
    <>
      {React.createElement('docuseal-builder', {
        'data-token': token,
        'data-background-color': backgroundColor,
      })}
      {isServer && <script id={scriptId} src={scriptSrc} async />}
    </>
  )
}

export default DocusealBuilder
