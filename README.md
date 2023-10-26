# DocuSeal React Components

This package provides a convenient way to embed [DocuSeal](https://www.docuseal.co) into React apps. Sign documents and create document forms directly in your apps.

![Docuseal Form](https://github.com/docusealco/docuseal-vue/assets/1176367/828f9f53-3131-494c-8e37-5c74fa94cfa8)

## Installation

```bash
npm install @docuseal/react
```

## Documentation

For detailed documentation, please click [here](https://www.docuseal.co/docs/embedded).

## Usage

### Signing Form

Copy public DocuSeal form URL from [https://docuseal.co](https://docuseal.co) and use it in the `src` component prop:

```jsx
import React from "react"
import { DocusealForm } from '@docuseal/react'

export function App() {
  return (
    <div className="app">
      <DocusealForm
        src="https://docuseal.co/d/LEVGR9rhZYf86M"
        email="signer@example.com"
      />
    </div>
  );
}
```

### Form Builder
#### React Client Render
```jsx
import React, { useEffect, useState } from 'react'
import { DocusealBuilder } from '@docuseal/react'

export function App() {
  const [token, setToken] = useState()

  useEffect(() => {
    fetch('/api/docuseal/builder_token', {
      method: 'POST'
    }).then(async (resp) => {
      const data = await resp.json()

      setToken(data.token)
    })
  }, []);

  return (
    <div className="app">
      {token && <DocusealBuilder token={token} />}
    </div>
  );
}
```

To protect the template builder from unathorized access a secure token (JWT) should be generated on the back-end:

```js
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.post('/api/docuseal/builder_token', (req, res) => {
  const token = jwt.sign({
    user_email: 'your-docuseal-user-email@company.com',
    integration_email: 'customer@example.com', // replace with current user email
    name: 'Integration W-9 Test Form',
    document_urls: ['https://www.irs.gov/pub/irs-pdf/fw9.pdf'],
  }, process.env.DOCUSEAL_TOKEN);

  res.json({ token });
});

app.listen(8080, () => {
  console.log(`Server is running`);
});
```

Obtain secret API token (`DOCUSEAL_TOKEN` env variable) to sign JWT from [https://console.docuseal.co/api](https://console.docuseal.co/api).

Find Express.js example project [here](https://github.com/docusealco/docuseal-react-examples/tree/master/expess-app).

#### Next.js SSR
```js
import jwt from 'jsonwebtoken';
import { DocusealBuilder } from '@docuseal/react'

export default function Home() {
  const token = jwt.sign( {
    user_email: process.env.DOCUSEAL_USER_EMAIL,
    integration_email: 'test@example.com',
    name: 'Integration W-9 Test Form',
    document_urls: ['https://www.irs.gov/pub/irs-pdf/fw9.pdf'],
  }, process.env.DOCUSEAL_TOKEN);

  return (
    <div>
      <h1>Docuseal Builder</h1>
      <DocusealBuilder token={token} />
    </div>
  );
}
```
Find Next.js example project [here](https://github.com/docusealco/docuseal-react-examples/tree/master/next-app).

# License

MIT
