import React, { useEffect } from 'react'

interface DocusealFormProps {
  src: string;
  role?: string;
  submitter?: string; // Backward compatibility
  expand?: boolean;
  email?: string;
  backgroundColor?: string;
  completedButton?: {
    title: string;
    url: string;
  };
  goToLast?: boolean;
  skipFields?: boolean;
  values?: object;
  readonlyFields: string[];
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
        data-role={role}
        data-submitter={submitter}
        data-expand={expand}
        data-go-to-last={goToLast}
        data-skip-fields={skipFields}
        data-values={JSON.stringify(values)}
        data-readonly-fields={readonlyFields.join(',')}
        data-completed-button-title={completedButton.title}
        data-completed-button-url={completedButton.url}
        data-background-color={backgroundColor}
      />
      {isServer && <script id={scriptId} src={scriptSrc} async />}
    </>
  );
}

export default DocusealForm;
