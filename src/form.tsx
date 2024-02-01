import React from 'react'

interface DocusealFormProps {
  src: string,
  host?: string,
  role?: string,
  submitter?: string, // Backward compatibility
  expand?: boolean,
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
  withTitle?: boolean,
  withFieldNames?: boolean,
  sendCopyEmail?: boolean,
  withDownloadButton?: boolean,
  withSendCopyButton?: boolean,
  allowToResubmit?: boolean,
  allowTypedSignature?: boolean,
  values?: object,
  fields?: object[],
  readonlyFields?: string[],
  onComplete?: (detail: any) => void,
  className?: string,
  customCss?: string,
  style?: React.CSSProperties
}

const DocusealForm = ({
  src = '',
  host = 'cdn.docuseal.co',
  role = '',
  submitter = '',
  preview = false,
  expand = true,
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
  withTitle = true,
  withFieldNames = true,
  withDownloadButton = true,
  allowToResubmit = true,
  allowTypedSignature = true,
  withSendCopyButton = true,
  values = {},
  fields = [],
  readonlyFields = [],
  onComplete = () => {},
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
  }

  return (
    <>
      {React.createElement('docuseal-form', {
        'data-src': src,
        'data-email': email,
        'data-role': role || submitter,
        'data-external-id': externalId || applicationKey,
        'data-expand': expand,
        'data-preview': preview,
        'data-go-to-last': goToLast,
        'data-skip-fields': skipFields,
        'data-send-copy-email': sendCopyEmail,
        'data-with-title': withTitle,
        'data-logo': logo,
        'data-language': language,
        'data-with-field-names': withFieldNames,
        'data-with-download-button': withDownloadButton,
        'data-allow-to-resubmit': allowToResubmit,
        'data-allow-typed-signature': allowTypedSignature,
        'data-completed-redirect-url': completedRedirectUrl,
        'data-with-send-copy-button': withSendCopyButton,
        'data-values': JSON.stringify(values),
        'data-fields': JSON.stringify(fields),
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
