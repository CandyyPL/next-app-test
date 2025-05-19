import { defineQuery } from 'next-sanity'

export const STARTUPS_QUERY = defineQuery(`
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

export const SINGLE_STARTUP_QUERY = defineQuery(`
  *[_type == 'startup' && _id == $id][0] {
    _id,
    _createdAt,
    author -> {
      _id, name, username, image, bio
    },
    title,
    slug,
    description,
    image,
    category,
    views,
    pitch
  }
`)
