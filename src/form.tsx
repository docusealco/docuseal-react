import React, { useEffect } from 'react'

interface DocusealFormProps {
  src: string;
  submitter?: string;
  expand?: boolean;
  email?: string;
  backgroundColor?: string;
}

const DocusealForm = ({
  src = '',
  submitter = '',
  expand = true,
  email = '',
  backgroundColor = '',
}: DocusealFormProps) => {
  const scriptId = 'docuseal-form-script'
  const scriptSrc = 'https://cdn.docuseal.co/js/form.js'
  const isServer = typeof window === 'undefined'

  if (!isServer && !document.getElementById(scriptId)) {
    useEffect(() => {
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
      <docuseal-form
        data-src={src}
        data-email={email}
        data-submitter={submitter}
        data-expand={expand}
        data-background-color={backgroundColor}
      />
      {isServer && <script id={scriptId} src={scriptSrc} async />}
    </>
  );
}

export default DocusealForm;
