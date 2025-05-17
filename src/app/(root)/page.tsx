import React from 'react'
import SearchForm from '@/components/SearchForm'
import StartupCard from '@/components/StartupCard'

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>
}) => {
  const query = (await searchParams).query

  const posts = [
    {
      _createdAt: new Date(),
      views: 50,
      author: {
        _id: 0,
        name: 'John Doe',
      },
      _id: 0,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      image: 'https://picsum.photos/640/480',
      category: 'Robots',
      title: 'We Robots',
    },
  ]

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
            ? posts.map((post: TStartupCard) => (
                <StartupCard key={post._id} post={post} />
              ))
            : ''}
        </ul>
      </section>
    </>
  )
}

export default Home
