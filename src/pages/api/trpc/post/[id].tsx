import { type NextPage } from 'next'
import Head from 'next/head'

const SinglePostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <main className='flex justify-center'>
        <div className='h-screen w-full border-x border-slate-400 text-center md:max-w-3xl'>
          Post view
        </div>
      </main>
    </>
  )
}

export default SinglePostPage
