import '~/styles/globals.css'
import { type AppType } from 'next/app'
import { ClerkProvider } from '@clerk/nextjs'
import Head from 'next/head'

import { api } from '~/utils/api'

import { ToastBar, Toaster } from 'react-hot-toast'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Chirp T3</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Toaster position='bottom-center' />
      <Component {...pageProps} />
    </ClerkProvider>
  )
}

export default api.withTRPC(MyApp)
