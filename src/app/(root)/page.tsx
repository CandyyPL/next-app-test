import React from 'react'
import SearchForm from '@/components/SearchForm'
import StartupCard from '@/components/StartupCard'
import STARTUPS_QUERY from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import { Author, Startup } from '@/sanity/types'

export type TStartupPost = Omit<Startup, 'author'> & { author?: Author }

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>
}) => {
  const query = (await searchParams).query

  const posts = (await client.fetch(STARTUPS_QUERY)) as TStartupPost[]

  console.log(posts)

  return (
    <>
      <section className='pink-container'>
        <h1 className='heading'>
          Pitch your startup, connect with entrepreneurs
        </h1>

        <p className='sub-heading'>
          Submit ideas, vote on pitches, and get noticed in Virtual
          Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className='section-container'>
        <p className='text-30-semibold'>
          {query ? `Search results for "${query}"` : 'All Startups'}
        </p>

        <ul className='mt-7 card-grid'>
          {posts?.length > 0
            ? posts.map((post: TStartupPost) => (
                <StartupCard key={post._id} post={post} />
              ))
            : ''}
        </ul>
      </section>
    </>
  )
}

export default Home
