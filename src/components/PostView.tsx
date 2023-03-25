import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import Link from 'next/link'
import Image from 'next/image'

import { type RouterOutputs } from '~/utils/api'

type PostWithUser = RouterOutputs['posts']['getAll'][number]

export const PostView = (props: PostWithUser) => {
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
