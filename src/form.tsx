import React from 'react'

export type DocusealFormField = {
  name: string,
  title?: string,
  description?: string,
  type?: string,
  position?: number,
  required?: boolean,
  readonly?: boolean,
  validation?: {
    pattern?: string,
    message?: string,
  },
  preferences?: {
    font_size?: number,
    font_type?: "bold" | "italic" | "bold_italic",
    mask?: boolean | number,
    font?: "Times" | "Helvetica" | "Courier",
    color?: "black" | "white" | "blue",
    align?: "left" | "center" | "right",
    valign?: "top" | "center" | "bottom",
    format?: string,
    price?: number,
    currency?: "USD" | "EUR" | "GBP" | "CAD" | "AUD",
  }
}

export type DocusealFormProps = {
  src: string,
  host?: string,
  role?: string,
  submitter?: string, // Backward compatibility
  expand?: boolean,
  minimize?: boolean,
  orderAsOnPage?: boolean,
  preview?: boolean,
  email?: string,
  name?: string,
  applicationKey?: string,
  externalId?: string,
  backgroundColor?: string,
  logo?: string,
  language?: string,
  completedMessage?: {
    title?: string,
    body?: string,
  },
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
  withCompleteButton?: boolean,
  allowToResubmit?: boolean,
  allowTypedSignature?: boolean,
  signature?: string,
  rememberSignature?: boolean,
  reuseSignature?: boolean,
  values?: object,
  metadata?: object,
  i18n?: object,
  fields?: DocusealFormField[],
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
  orderAsOnPage = false,
  email = '',
  name = '',
  backgroundColor = '',
  sendCopyEmail,
  applicationKey = '',
  externalId = '',
  logo = '',
  language = '',
  completedRedirectUrl = '',
  completedButton = { title: '', url: '' },
  completedMessage = { title: '', body: '' },
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
  reuseSignature = true,
  withSendCopyButton = true,
  withCompleteButton = false,
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

  const booleanToAttr = (value: any) => value === true ? 'true' : (value === false ? 'false' : value)

  return (
    <>
      {React.createElement('docuseal-form', {
        'data-src': src,
        'data-email': email,
        'data-name': name,
        'data-role': role || submitter,
        'data-external-id': externalId || applicationKey,
        'data-expand': booleanToAttr(expand),
        'data-minimize': booleanToAttr(minimize),
        'data-order-as-on-page': orderAsOnPage,
        'data-preview': booleanToAttr(preview),
        'data-go-to-last': booleanToAttr(goToLast),
        'data-skip-fields': booleanToAttr(skipFields),
        'data-autoscroll-fields': booleanToAttr(autoscrollFields),
        'data-send-copy-email': booleanToAttr(sendCopyEmail),
        'data-with-title': booleanToAttr(withTitle),
        'data-with-decline': booleanToAttr(withDecline),
        'data-logo': logo,
        'data-language': language,
        'data-with-field-names': booleanToAttr(withFieldNames),
        'data-with-field-placeholder': booleanToAttr(withFieldPlaceholder),
        'data-with-download-button': booleanToAttr(withDownloadButton),
        'data-allow-to-resubmit': booleanToAttr(allowToResubmit),
        'data-allow-typed-signature': booleanToAttr(allowTypedSignature),
        'data-signature': signature,
        'data-remember-signature': booleanToAttr(rememberSignature),
        'data-reuse-signature': booleanToAttr(reuseSignature),
        'data-completed-redirect-url': completedRedirectUrl,
        'data-with-send-copy-button': booleanToAttr(withSendCopyButton),
        'data-with-complete-button': booleanToAttr(withCompleteButton),
        'data-values': JSON.stringify(values),
        'data-metadata': JSON.stringify(metadata),
        'data-fields': JSON.stringify(fields),
        'data-i18n': JSON.stringify(i18n),
        'data-readonly-fields': readonlyFields.join(','),
        'data-completed-message-title': completedMessage.title,
        'data-completed-message-body': completedMessage.body,
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
