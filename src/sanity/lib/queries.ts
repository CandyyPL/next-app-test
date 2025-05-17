import { defineQuery } from 'next-sanity'

const STARTUPS_QUERY = defineQuery(`
  *[_type == 'startup' && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
    _id,
    _createdAt,
    author -> {
      _id, name
    },
    title,
    slug,
    description,
    image,
    category,
    views
  }
`)

export default STARTUPS_QUERY
