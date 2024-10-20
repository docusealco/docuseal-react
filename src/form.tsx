import React from 'react'

interface DocusealField {
  name: string,
  title?: string,
  type?: string,
  position?: number,
  required?: boolean
}

interface DocusealFormProps {
  src: string,
  host?: string,
  role?: string,
  submitter?: string, // Backward compatibility
  expand?: boolean,
  minimize?: boolean,
  preview?: boolean,
  email?: string,
  applicationKey?: string,
  externalId?: string,
  backgroundColor?: string,
  logo?: string,
  language?: string,
  completedRedirectUrl?: string,
  completedButton?: {
    title: string,
    url: string,
  },
  goToLast?: boolean,
  skipFields?: boolean,
  autoscrollFields?: boolean,
  withTitle?: boolean,
  withDecline?: boolean,
  withFieldNames?: boolean,
  withFieldPlaceholder?: boolean,
  sendCopyEmail?: boolean,
  withDownloadButton?: boolean,
  withSendCopyButton?: boolean,
  allowToResubmit?: boolean,
  allowTypedSignature?: boolean,
  signature?: string,
  rememberSignature?: boolean,
  values?: object,
  metadata?: object,
  i18n?: object,
  fields?: DocusealField[],
  readonlyFields?: string[],
  onComplete?: (detail: any) => void,
  onInit?: (detail: any) => void,
  onDecline?: (detail: any) => void,
  onLoad?: (detail: any) => void,
  className?: string,
  customCss?: string,
  style?: React.CSSProperties
}

const DocusealForm = ({
  src = '',
  host = 'cdn.docuseal.com',
  role = '',
  submitter = '',
  preview = false,
  expand = true,
  minimize = false,
  email = '',
  backgroundColor = '',
  sendCopyEmail,
  applicationKey = '',
  externalId = '',
  logo = '',
  language = '',
  completedRedirectUrl = '',
  completedButton = { title: '', url: '' },
  goToLast = true,
  skipFields = false,
  autoscrollFields = true,
  withTitle = true,
  withDecline = false,
  withFieldNames = true,
  withFieldPlaceholder = false,
  withDownloadButton = true,
  allowToResubmit = true,
  allowTypedSignature = true,
  signature = '',
  rememberSignature = false,
  withSendCopyButton = true,
  values = {},
  metadata = {},
  i18n = {},
  fields = [],
  readonlyFields = [],
  onComplete = () => {},
  onInit = () => {},
  onDecline = () => {},
  onLoad = () => {},
  className = '',
  customCss = '',
  style = {}
}: DocusealFormProps): JSX.Element => {
  const scriptId = 'docuseal-form-script'
  const scriptSrc = `https://${host}/js/form.js`
  const isServer = typeof window === 'undefined'
  const formRef = isServer ? null : React.useRef<HTMLElement>(null)

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
      const el = formRef?.current

      const handleCompleted = (e: Event) => onComplete && onComplete((e as CustomEvent).detail)

      if (el) {
        el.addEventListener('completed', handleCompleted)
      }

      return () => {
        if (el) {
          el.removeEventListener('completed', handleCompleted)
        }
      }
    }, [onComplete])

    React.useEffect(() => {
      const el = formRef?.current

      const handleInit = (e: Event) => onInit && onInit((e as CustomEvent).detail)

      if (el) {
        el.addEventListener('init', handleInit)
      }

      return () => {
        if (el) {
          el.removeEventListener('init', handleInit)
        }
      }
    }, [onInit])

    React.useEffect(() => {
      const el = formRef?.current

      const handleDecline = (e: Event) => onDecline && onDecline((e as CustomEvent).detail)

      if (el) {
        el.addEventListener('declined', handleDecline)
      }

      return () => {
        if (el) {
          el.removeEventListener('declined', handleDecline)
        }
      }
    }, [onDecline])

    React.useEffect(() => {
      const el = formRef?.current

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
      {React.createElement('docuseal-form', {
        'data-src': src,
        'data-email': email,
        'data-role': role || submitter,
        'data-external-id': externalId || applicationKey,
        'data-expand': expand,
        'data-minimize': minimize,
        'data-preview': preview,
        'data-go-to-last': goToLast,
        'data-skip-fields': skipFields,
        'data-autoscroll-fields': autoscrollFields,
        'data-send-copy-email': sendCopyEmail,
        'data-with-title': withTitle,
        'data-with-decline': withDecline,
        'data-logo': logo,
        'data-language': language,
        'data-with-field-names': withFieldNames,
        'data-with-field-placeholder': withFieldPlaceholder,
        'data-with-download-button': withDownloadButton,
        'data-allow-to-resubmit': allowToResubmit,
        'data-allow-typed-signature': allowTypedSignature,
        'data-signature': signature,
        'data-remember-signature': rememberSignature,
        'data-completed-redirect-url': completedRedirectUrl,
        'data-with-send-copy-button': withSendCopyButton,
        'data-values': JSON.stringify(values),
        'data-metadata': JSON.stringify(metadata),
        'data-fields': JSON.stringify(fields),
        'data-i18n': JSON.stringify(i18n),
        'data-readonly-fields': readonlyFields.join(','),
        'data-completed-button-title': completedButton.title,
        'data-completed-button-url': completedButton.url,
        'data-background-color': backgroundColor,
        'data-custom-css': customCss,
        ref: formRef,
        className,
        style
      })}
      {isServer && <script id={scriptId} src={scriptSrc} async />}
    </>
  )
}

export default DocusealForm
