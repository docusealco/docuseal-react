import React from 'react'

interface DocusealField {
  name: string,
  type?: string,
  role?: string,
  default_value?: string,
}

interface DocusealBuilderProps {
  token: string,
  host?: string,
  withRecipientsButton?: boolean,
  preview?: boolean,
  roles?: string[],
  fields?: DocusealField[],
  withSignYourselfButton?: boolean,
  withUploadButton?: boolean,
  onLoad?: (detail: any) => void,
  onSend?: (detail: any) => void,
  customButton?: {
    title: string,
    url: string,
  },
  backgroundColor?: string,
  className?: string,
  style?: React.CSSProperties
}

const DocusealBuilder = ({
  token,
  host = 'cdn.docuseal.co',
  preview = false,
  withRecipientsButton = true,
  withSignYourselfButton = true,
  withUploadButton = true,
  roles = [],
  fields = [],
  customButton = { title: '', url: '' },
  backgroundColor = '',
  onLoad = () => {},
  onSend = () => {},
  className = '',
  style = {},
}: DocusealBuilderProps): JSX.Element => {
  const scriptId = 'docuseal-builder-script'
  const scriptSrc = `https://${host}/js/builder.js`
  const isServer = typeof window === 'undefined'
  const builderRef = isServer ? null : React.useRef<HTMLElement>(null)

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

    React.useEffect(() => {
      const el = builderRef?.current

      const handleSend = (e: Event) => onSend && onSend((e as CustomEvent).detail)

      if (el) {
        el.addEventListener('send', handleSend)
      }

      return () => {
        if (el) {
          el.removeEventListener('send', handleSend)
        }
      }
    }, [onSend])

    React.useEffect(() => {
      const el = builderRef?.current

      const handleLoad = (e: Event) => onLoad && onLoad((e as CustomEvent).detail)

      if (el) {
        el.addEventListener('load', handleLoad)
      }

      return () => {
        if (el) {
          el.removeEventListener('load', handleLoad)
        }
      }
    }, [onLoad])
  }

  return (
    <>
      {React.createElement('docuseal-builder', {
        'data-token': token,
        'data-preview': preview,
        'data-roles': roles.join(','),
        'data-fields': JSON.stringify(fields),
        'data-custom-button-title': customButton.title,
        'data-custom-button-url': customButton.url,
        'data-with-recipients-button': withRecipientsButton,
        'data-with-upload-button': withUploadButton,
        'data-with-sign-yourself-button': withSignYourselfButton,
        'data-background-color': backgroundColor,
        ref: builderRef,
        className,
        style,
      })}
      {isServer && <script id={scriptId} src={scriptSrc} async />}
    </>
  )
}

export default DocusealBuilder
