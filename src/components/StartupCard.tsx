import React from 'react'
import { formatDate } from '@/lib/utils'
import { Eye } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'

const StartupCard = ({ post }: { post: TStartupCard }) => {
  const {
    _createdAt,
    _id,
    author,
    views,
    title,
    category,
    description,
    image,
  } = post

  return (
    <li className='startup-card group'>
      <div className='flex-between'>
        <p className='startup_card_date'>{formatDate(_createdAt)}</p>
        <div className='flex items-center gap-1.5'>
          <Eye className='size-5 text-app-primary' />
          <span className='text-16-medium'>{views}</span>
        </div>
      </div>

      <div className='flex-between mt-5 gap-5'>
        <div className='flex-1'>
          <Link href={`/users/${author?._id}`}>
            <p className='text-16-medium line-clamp-1'>{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
          </Link>
        </div>
        <Link href={`/users/${author?._id}`}>
          <Image
            src='https://placehold.co/64x64'
            alt='palceholder'
            width={48}
            height={48}
            className='rounded-full'
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className='startup_card-desc'>{description}</p>
        <img src={image} alt='image' className='startup-card_img mt-2' />
      </Link>

      <div className='flex-between gap-3 mt-5'>
        <Link href={`/?query=${category.toLowerCase()}`}>
          <p className='text-16-medium'>{category}</p>
        </Link>
        <Button className='startup-card_btn' asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  )
}

export default StartupCard
