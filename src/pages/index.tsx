import { SignIn, SignInButton, SignOutButton, useUser } from '@clerk/nextjs'
import { type NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
import { api, type RouterOutputs } from '~/utils/api'
import Image from 'next/image'
import { LoadingPage, LoadingSpinner } from '~/components/LoadingSpinner'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { ClientRequest } from 'http'

// Keep things in one file until you are sure you need them elsewhere

const CreatePostWizard = () => {
  const { user } = useUser()
  const [input, setInput] = useState<string>('')
  const ctx = api.useContext()
  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput('')
      void ctx.posts.getAll.invalidate()
    },
    onError: e => {
      const errorMessage = e.data?.zodError?.fieldErrors.content
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0])
      } else toast.error('Posting Failed. Please try again later')
    }
  })

  if (!user) return null

  return (
    <div className='mb-4 flex w-full gap-3  p-4'>
      {/* TODO link to profile*/}
      <Link href={`#`}>
        <Image
          className='h-16 w-16 rounded-full'
          src={user.profileImageUrl}
          alt='profile image'
          width={64}
          height={64}
        />
      </Link>
      <input
        placeholder='Type some emojis'
        type='text'
        className='grow bg-transparent outline-none'
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault()
            if (input !== '') {
              mutate({ content: input })
            }
          }
        }}
        disabled={isPosting}
      />
      {input !== '' && !isPosting && (
        <button disabled={isPosting} onClick={() => mutate({ content: input })}>
          Post
        </button>
      )}
      {isPosting && (
        <div className='flex h-full w-full items-center justify-center'>
          <LoadingSpinner size={12} />
        </div>
      )}
    </div>
  )
}

type PostWithUser = RouterOutputs['posts']['getAll'][number]

const PostView = (props: PostWithUser) => {
  const { post, author } = props
  return (
    <div className='flex gap-3 border-b border-slate-400 p-4' key={post.id}>
      <Link href={`/@${author.username}`}>
        <Image
          src={author.profileImageUrl}
          alt={`${author.username}'s profile image`}
          className='h-10 w-10 rounded-full'
          width={40}
          height={40}
        />
      </Link>

      <div className='flex flex-col'>
        <div className='flex'>
          <Link href={`/@${author.username}`}>
            <span>{`@${author.username}`}</span>
          </Link>
          <Link href={`/post/${post.id}`}>
            <span className='px-2'> · </span>
            <span className='text-gray-600'>
              {dayjs(post.createdAt).fromNow()}
            </span>
          </Link>
        </div>
        <Link href={`/post/${post.id}`}>
          <span className='text-2xl'>{post.content}</span>
        </Link>
      </div>
    </div>
  )
}

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery()

  if (postsLoading) return <LoadingPage />

  return (
    <div className='flex flex-col space-y-2'>
      {data?.map(fullPost => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  )
}

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser()

  // start fetch early to use cached data later in the feed
  api.posts.getAll.useQuery()

  // return empty div when user nor posts have loaded
  if (!userLoaded) return <div></div>

  return (
    <>

      <main className='flex justify-center'>
        <div className='h-screen w-full border-x border-slate-400 md:max-w-3xl '>
          <div className='border-b border-slate-400'>
            <div className='flex justify-between border-b border-slate-400'>
              {!!isSignedIn && <CreatePostWizard />}

              <div className='grow text-sm text-gray-500'>
                {!isSignedIn && <SignInButton />}

                {isSignedIn && <SignOutButton />}
              </div>
            </div>
            <Feed />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
