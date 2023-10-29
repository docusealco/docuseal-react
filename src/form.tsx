import React from 'react'

interface DocusealFormProps {
  src: string,
  role?: string,
  submitter?: string, // Backward compatibility
  expand?: boolean,
  email?: string,
  backgroundColor?: string,
  completedButton?: {
    title: string,
    url: string,
  },
  goToLast?: boolean,
  skipFields?: boolean,
  values?: object,
  readonlyFields?: string[],
  onComplete?: (detail: any) => void,
}

const DocusealForm = ({
  src = '',
  role = '',
  submitter = '',
  expand = true,
  email = '',
  backgroundColor = '',
  completedButton = { title: '', url: '' },
  goToLast = true,
  skipFields = true,
  values = {},
  readonlyFields = [],
  onComplete = () => {},
}: DocusealFormProps): JSX.Element => {
  const scriptId = 'docuseal-form-script'
  const scriptSrc = 'https://cdn.docuseal.co/js/form.js'
  const isServer = typeof window === 'undefined'
  const formRef = isServer ? null : React.useRef<HTMLElement>(null)

  if (!isServer && !document.getElementById(scriptId)) {
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
        'data-role': role,
        'data-submitter': submitter,
        'data-expand': expand,
        'data-go-to-last': goToLast,
        'data-skip-fields': skipFields,
        'data-values': JSON.stringify(values),
        'data-readonly-fields': readonlyFields.join(','),
        'data-completed-button-title': completedButton.title,
        'data-completed-button-url': completedButton.url,
        'data-background-color': backgroundColor,
        ref: formRef,
      })}
      {isServer && <script id={scriptId} src={scriptSrc} async />}
    </>
  )
}

export default DocusealForm
