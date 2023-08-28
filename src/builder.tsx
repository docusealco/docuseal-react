import React, { useEffect } from 'react'

interface DocusealBuilderProps {
  token: string
  backgroundColor?: string
}

const DocusealBuilder = ({
  token,
  backgroundColor = '',
}: DocusealBuilderProps) => {
  const scriptId = 'docuseal-builder-script'
  const scriptSrc = 'https://cdn.docuseal.co/js/builder.js'
  const isServer = typeof window === 'undefined'

  if (!isServer) {
    useEffect(() => {
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
      <docuseal-builder
        data-token={token}
        data-background-color={backgroundColor}
      />
      {isServer && <script id={scriptId} src={scriptSrc} async />}
    </>
  )
}

export default DocusealBuilder
