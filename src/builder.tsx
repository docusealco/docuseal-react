import React from 'react'

interface DocusealBuilderProps {
  token: string,
  host?: string,
  withRecipientsButton?: boolean,
  preview?: boolean,
  withSignYourselfButton?: boolean,
  withUploadButton?: boolean,
  customButton?: {
    title: string,
    url: string,
  },
  backgroundColor?: string
}

const DocusealBuilder = ({
  token,
  host = 'cdn.docuseal.co',
  preview = false,
  withRecipientsButton = true,
  withSignYourselfButton = true,
  withUploadButton = true,
  customButton = { title: '', url: '' },
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
        'data-preview': preview,
        'data-custom-button-title': customButton.title,
        'data-custom-button-url': customButton.url,
        'data-with-recipients-button': withRecipientsButton,
        'data-with-upload-button': withUploadButton,
        'data-with-sign-yourself-button': withSignYourselfButton,
        'data-background-color': backgroundColor,
      })}
      {isServer && <script id={scriptId} src={scriptSrc} async />}
    </>
  )
}

export default DocusealBuilder
