'use client'

import './index.css';
import RootLayout from '../components/utils/RootLayout';

export default function Layout({ children }) {
  return (
    <html lang='en'>
      <head>
        <link rel="icon" type="image/webp" href={`${process.env.NEXT_PUBLIC_AWS_S3_URL}/general/pengu.webp`} />
        <title>Nexus</title>
      </head>
      <body>
        <RootLayout children={children} />
      </body>
    </html>
  )
}