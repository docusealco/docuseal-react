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
  language?: string,
  autosave?: boolean,
  roles?: string[],
  fields?: DocusealField[],
  withSignYourselfButton?: boolean,
  withUploadButton?: boolean,
  onLoad?: (detail: any) => void,
  onUpload?: (detail: any) => void,
  onSend?: (detail: any) => void,
  customButton?: {
    title: string,
    url: string,
  },
  backgroundColor?: string,
  saveButtonText?: string,
  sendButtonText?: string,
  className?: string,
  customCss?: string,
  style?: React.CSSProperties
}

const DocusealBuilder = ({
  token,
  host = 'cdn.docuseal.co',
  language = 'en',
  preview = false,
  autosave = true,
  withRecipientsButton = true,
  withSignYourselfButton = true,
  withUploadButton = true,
  roles = [],
  fields = [],
  customButton = { title: '', url: '' },
  backgroundColor = '',
  onLoad = () => {},
  onUpload = () => {},
  onSend = () => {},
  className = '',
  sendButtonText = '',
  saveButtonText = '',
  customCss = '',
  style = {}
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

    React.useEffect(() => {
      const el = builderRef?.current

      const handleUpload = (e: Event) => onUpload && onUpload((e as CustomEvent).detail)

      if (el) {
        el.addEventListener('upload', handleUpload)
      }

      return () => {
        if (el) {
          el.removeEventListener('upload', handleUpload)
        }
      }
    }, [onUpload])
  }

  return (
    <>
      {React.createElement('docuseal-builder', {
        'data-token': token,
        'data-preview': preview,
        'data-language': language,
        'data-autosave': autosave,
        'data-send-button-text': sendButtonText,
        'data-save-button-text': saveButtonText,
        'data-roles': roles.join(','),
        'data-fields': JSON.stringify(fields),
        'data-custom-button-title': customButton.title,
        'data-custom-button-url': customButton.url,
        'data-with-recipients-button': withRecipientsButton,
        'data-with-upload-button': withUploadButton,
        'data-with-sign-yourself-button': withSignYourselfButton,
        'data-background-color': backgroundColor,
        'data-custom-css': customCss,
        ref: builderRef,
        className,
        style,
      })}
      {isServer && <script id={scriptId} src={scriptSrc} async />}
    </>
  )
}

export default DocusealBuilder
