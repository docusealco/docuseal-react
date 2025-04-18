import React from 'react'

export type DocusealBuilderField = {
  name: string,
  type?: string,
  role?: string,
  title?: string,
  description?: string,
  required?: boolean,
  readonly?: boolean,
  default_value?: string,
  width?: number,
  height?: number,
  options?: string[],
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
  },
  validation?: { pattern?: string, message?: string }
}

export type DocusealBuilderSubmitter = {
  email?: string,
  role?: string,
  name?: string,
  phone?: string,
}

export type DocusealBuilderProps = {
  token: string,
  host?: string,
  withRecipientsButton?: boolean,
  withSendButton?: boolean,
  withTitle?: boolean,
  withDocumentsList?: boolean,
  withFieldsList?: boolean,
  withFieldPlaceholder?: boolean,
  onlyDefinedFields?: boolean,
  preview?: boolean,
  previewMode?: boolean,
  inputMode?: boolean,
  language?: string,
  autosave?: boolean,
  roles?: string[],
  fieldTypes?: string[],
  drawFieldType?: string,
  fields?: DocusealBuilderField[],
  submitters?: DocusealBuilderSubmitter[],
  requiredFields?: DocusealBuilderField[],
  i18n?: object,
  withSignYourselfButton?: boolean,
  withUploadButton?: boolean,
  withAddPageButton?: boolean,
  onLoad?: (detail: any) => void,
  onUpload?: (detail: any) => void,
  onSend?: (detail: any) => void,
  onSave?: (detail: any) => void,
  onChange?: (detail: any) => void,
  customButton?: {
    title: string,
    url: string,
  },
  emailMessage?: {
    subject: string,
    body: string
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
  host = 'cdn.docuseal.com',
  language = 'en',
  preview = false,
  previewMode = false,
  inputMode = false,
  autosave = true,
  withRecipientsButton = true,
  withDocumentsList = true,
  withFieldsList = true,
  withFieldPlaceholder = false,
  withSendButton = true,
  withTitle = true,
  onlyDefinedFields = false,
  withSignYourselfButton = true,
  withUploadButton = true,
  withAddPageButton = false,
  roles = [],
  fields = [],
  submitters = [],
  requiredFields = [],
  i18n = {},
  fieldTypes = [],
  drawFieldType = 'text',
  customButton = { title: '', url: '' },
  emailMessage = { subject: '', body: '' },
  backgroundColor = '',
  onLoad = () => {},
  onUpload = () => {},
  onSend = () => {},
  onSave = () => {},
  onChange = () => {},
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

    React.useEffect(() => {
      const el = builderRef?.current

      const handleSave = (e: Event) => onSave && onSave((e as CustomEvent).detail)

      if (el) {
        el.addEventListener('save', handleSave)
      }

      return () => {
        if (el) {
          el.removeEventListener('save', handleSave)
        }
      }
    }, [onSave])

    React.useEffect(() => {
      const el = builderRef?.current

      const handleChange = (e: Event) => onChange && onChange((e as CustomEvent).detail)

      if (el) {
        el.addEventListener('change', handleChange)
      }

      return () => {
        if (el) {
          el.removeEventListener('change', handleChange)
        }
      }
    }, [onChange])
  }

  const booleanToAttr = (value: any) => value === true ? 'true' : (value === false ? 'false' : value)

  return (
    <>
      {React.createElement('docuseal-builder', {
        'data-token': token,
        'data-preview': booleanToAttr(preview || previewMode),
        'data-input-mode': inputMode,
        'data-language': language,
        'data-autosave': booleanToAttr(autosave),
        'data-send-button-text': sendButtonText,
        'data-save-button-text': saveButtonText,
        'data-roles': roles.join(','),
        'data-field-types': fieldTypes.join(','),
        'data-draw-field-type': drawFieldType,
        'data-fields': JSON.stringify(fields),
        'data-submitters': JSON.stringify(submitters),
        'data-required-fields': JSON.stringify(requiredFields),
        'data-i18n': JSON.stringify(i18n),
        'data-custom-button-title': customButton.title,
        'data-custom-button-url': customButton.url,
        'data-email-subject': emailMessage.subject,
        'data-email-body': emailMessage.body,
        'data-with-recipients-button': booleanToAttr(withRecipientsButton),
        'data-with-send-button': booleanToAttr(withSendButton),
        'data-with-documents-list': booleanToAttr(withDocumentsList),
        'data-with-fields-list': booleanToAttr(withFieldsList),
        'data-with-field-placeholder': booleanToAttr(withFieldPlaceholder),
        'data-with-title': booleanToAttr(withTitle),
        'data-only-defined-fields': booleanToAttr(onlyDefinedFields),
        'data-with-upload-button': booleanToAttr(withUploadButton),
        'data-with-add-page-button': booleanToAttr(withAddPageButton),
        'data-with-sign-yourself-button': booleanToAttr(withSignYourselfButton),
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
