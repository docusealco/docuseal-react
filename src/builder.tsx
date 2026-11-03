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
    with_signature_id?: boolean,
    currency?: "USD" | "EUR" | "GBP" | "CAD" | "AUD",
  },
  validation?: {
    pattern?: string,
    message?: string,
    min?: number | string,
    max?: number | string,
    step?: number
  }
}

export type DocusealBuilderSubmitter = {
  email?: string,
  role?: string,
  name?: string,
  phone?: string,
}

export type DocusealBuilderSendData = {
  id: number,
  created_at: string,
  archived_at: string | null,
  template_submitters: Array<{
    name: string,
    uuid: string,
    is_requester?: boolean,
    linked_to_uuid?: string | null,
    order?: number,
    invite_via_field_uuid?: string | null,
    optional_invite_by_uuid?: string | null,
    invite_by_uuid?: string | null,
    email?: string,
  }>,
  template: {
    id: number,
    name: string,
    external_id: string | null,
    created_at: string,
  },
  submitters: Array<{
    id: number,
    uuid: string,
    email: string,
    completed_at: string | null,
    opened_at: string | null,
    sent_at: string | null,
    status_event_at: string,
    status: string,
  }>,
}

type DocusealBuilderTemplateData = {
  id: number,
  author_id: number,
  folder_id: number | null,
  external_id: string | null,
  name: string,
  slug: string,
  source: string | null,
  archived_at: string | null,
  created_at: string,
  updated_at: string,
  shared_link: boolean,
  preferences: Record<string, unknown> | null,
  variables_schema: Record<string, unknown> | null,
  schema: Array<{
    attachment_uuid: string,
    name: string,
    google_drive_file_id?: string,
    dynamic?: boolean,
    conditions?: Array<{
      field_uuid: string,
      value: string,
      action: string,
      operation: string,
    }>,
  }>,
  fields: Array<{
    uuid: string,
    submitter_uuid: string,
    name: string,
    type: string,
    required: boolean,
    readonly?: boolean,
    default_value?: string | string[] | null,
    title?: string,
    description?: string,
    prefillable?: boolean,
    preferences?: Record<string, unknown>,
    options?: Array<{ value: string, uuid: string }>,
    validation?: {
      message?: string,
      pattern?: string,
      min?: number,
      max?: number,
      step?: number,
    },
    conditions?: Array<{
      field_uuid: string,
      value: string,
      action: string,
      operation: string,
    }>,
    areas?: Array<{
      uuid: string,
      x: number,
      y: number,
      w: number,
      h: number,
      cell_w?: number,
      attachment_uuid: string,
      option_uuid?: string,
      page: number,
    }>,
  }>,
  submitters: Array<{
    name: string,
    uuid: string,
    is_requester?: boolean,
    linked_to_uuid?: string | null,
    order?: number,
    invite_via_field_uuid?: string | null,
    optional_invite_by_uuid?: string | null,
    invite_by_uuid?: string | null,
    email?: string,
  }>,
}

export type DocusealBuilderLoadData = DocusealBuilderTemplateData
export type DocusealBuilderUploadData = DocusealBuilderTemplateData
export type DocusealBuilderSaveData = DocusealBuilderTemplateData
export type DocusealBuilderChangeData = DocusealBuilderTemplateData
export type DocusealBuilderErrorData = Error & { status?: number }

export type DocusealBuilderProps = {
  token: string,
  host?: string,
  withRecipientsButton?: boolean,
  withSendButton?: boolean,
  withTitle?: boolean,
  withDocumentsList?: boolean,
  withDynamicDocuments?: boolean,
  withFieldsList?: boolean,
  withFieldsDetection?: boolean,
  withFieldPlaceholder?: boolean,
  withPrefillable?: boolean,
  withCustomFieldsTab?: boolean,
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
  dateFormats?: string[],
  i18n?: object,
  withSignYourselfButton?: boolean,
  withUploadButton?: boolean,
  withSignatureId?: boolean,
  withRevisions?: boolean,
  withAddPageButton?: boolean,
  onLoad?: (data: DocusealBuilderLoadData) => void,
  onUpload?: (data: DocusealBuilderUploadData) => void,
  onSend?: (data: DocusealBuilderSendData) => void,
  onSave?: (data: DocusealBuilderSaveData) => void,
  onChange?: (data: DocusealBuilderChangeData) => void,
  onError?: (error: DocusealBuilderErrorData) => void,
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
  withDynamicDocuments = false,
  withFieldsList = true,
  withFieldsDetection = false,
  withFieldPlaceholder = false,
  withPrefillable = false,
  withCustomFieldsTab = false,
  withSendButton = true,
  withTitle = true,
  onlyDefinedFields = false,
  withSignYourselfButton = true,
  withUploadButton = true,
  withAddPageButton = false,
  withSignatureId,
  withRevisions = false,
  roles = [],
  fields = [],
  submitters = [],
  requiredFields = [],
  dateFormats = [],
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
  onError = () => {},
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

      const handleError = (e: Event) => onError && onError((e as CustomEvent).detail)

      if (el) {
        el.addEventListener('error', handleError)
      }

      return () => {
        if (el) {
          el.removeEventListener('error', handleError)
        }
      }
    }, [onError])

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
        'data-input-mode': booleanToAttr(inputMode),
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
        'data-date-formats': dateFormats.join(','),
        'data-i18n': JSON.stringify(i18n),
        'data-custom-button-title': customButton.title,
        'data-custom-button-url': customButton.url,
        'data-email-subject': emailMessage.subject,
        'data-email-body': emailMessage.body,
        'data-with-recipients-button': booleanToAttr(withRecipientsButton),
        'data-with-send-button': booleanToAttr(withSendButton),
        'data-with-documents-list': booleanToAttr(withDocumentsList),
        'data-with-dynamic-documents': booleanToAttr(withDynamicDocuments),
        'data-with-fields-list': booleanToAttr(withFieldsList),
        'data-with-fields-detection': booleanToAttr(withFieldsDetection),
        'data-with-field-placeholder': booleanToAttr(withFieldPlaceholder),
        'data-with-prefillable': booleanToAttr(withPrefillable),
        'data-with-custom-fields-tab': booleanToAttr(withCustomFieldsTab),
        'data-with-signature-id': booleanToAttr(withSignatureId),
        'data-with-revisions': booleanToAttr(withRevisions),
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
