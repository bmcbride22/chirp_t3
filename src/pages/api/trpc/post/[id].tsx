import { type NextPage } from 'next'
import Head from 'next/head'

const ProfilePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chirp T3</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex justify-center'>
        <div className='h-screen w-full border-x border-slate-400 text-center md:max-w-3xl'>
          Post view
        </div>
      </main>
    </>
  )
}

export default ProfilePage
