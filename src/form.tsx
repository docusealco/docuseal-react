import React from 'react'

interface DocusealFormProps {
  src: string,
  role?: string,
  submitter?: string, // Backward compatibility
  expand?: boolean,
  email?: string,
  applicationKey?: string,
  backgroundColor?: string,
  completedButton?: {
    title: string,
    url: string,
  },
  goToLast?: boolean,
  skipFields?: boolean,
  withTitle?: boolean,
  withDownloadButton?: boolean,
  withSendCopyButton?: boolean,
  allowToResubmit?: boolean,
  values?: object,
  readonlyFields?: string[],
  onComplete?: (detail: any) => void,
  className?: string,
  style?: React.CSSProperties
}

const DocusealForm = ({
  src = '',
  role = '',
  submitter = '',
  expand = true,
  email = '',
  backgroundColor = '',
  applicationKey = '',
  completedButton = { title: '', url: '' },
  goToLast = true,
  skipFields = true,
  withTitle = true,
  withDownloadButton = true,
  allowToResubmit = true,
  withSendCopyButton = true,
  values = {},
  readonlyFields = [],
  onComplete = () => {},
  className = '',
  style = {}
}: DocusealFormProps): JSX.Element => {
  const scriptId = 'docuseal-form-script'
  const scriptSrc = 'https://cdn.docuseal.co/js/form.js'
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
        'data-application-key': applicationKey,
        'data-expand': expand,
        'data-go-to-last': goToLast,
        'data-skip-fields': skipFields,
        'data-with-title': withTitle,
        'data-with-download-button': withDownloadButton,
        'data-allow-to-resubmit': allowToResubmit,
        'data-with-send-copy-button': withSendCopyButton,
        'data-values': JSON.stringify(values),
        'data-readonly-fields': readonlyFields.join(','),
        'data-completed-button-title': completedButton.title,
        'data-completed-button-url': completedButton.url,
        'data-background-color': backgroundColor,
        ref: formRef,
        className,
        style
      })}
      {isServer && <script id={scriptId} src={scriptSrc} async />}
    </>
  )
}

export default DocusealForm
