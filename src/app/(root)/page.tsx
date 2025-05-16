import React from 'react'
import SearchForm from '@/components/SearchForm'

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>
}) => {
  const query = (await searchParams).query

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
    </>
  )
}

export default Home
