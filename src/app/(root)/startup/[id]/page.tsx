import React from 'react';
import { SINGLE_STARTUP_QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { TStartupPost } from '@/app/(root)/page';
import markdownit from 'markdown-it';

const StartupPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const queryParams = { id };

  const post = (await client.fetch(
    SINGLE_STARTUP_QUERY,
    queryParams
  )) as TStartupPost;

  if (!post) return notFound();

  const markdownContent = markdownit().render(post?.pitch || '');

  return (
    <>
      <section className='hero-container'>
        <p className='tag !bg-app-secondary'>{formatDate(post._createdAt)}</p>

        <h1 className='heading'>{post.title}</h1>
        <p className='sub-heading max-w-5xl'>{post.description}</p>
      </section>

      <section className='section-container'>
        <img
          src={post.image}
          alt='thumbnail'
          className='w-full h-auto rounded-xl'
        />
        <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
          <div className='flex-between gap-5'>
            <Link
              href={`/users/${post.author?._id}`}
              className='flex gap-2 items-center mb-3'
            >
              <Image
                src={post.author?.image || ''}
                alt='avatar'
                width={64}
                height={64}
                className='rounded-full drop-shadow-lg'
              />

              <div>
                <p className='text-20-medium'>{post.author?.name}</p>
                <p className='text-16-medium !text-black-300'>
                  @{post.author?.username}
                </p>
              </div>
            </Link>

            <p className='category-tag'>{post.category}</p>
          </div>

          <h3 className='text-30-bold'>Pitch Details</h3>
          {markdownContent ? (
            <article
              dangerouslySetInnerHTML={{ __html: markdownContent }}
              className='prose max-w-4xl font-work-sans'
            />
          ) : (
            <p className='no-result'>No details provided.</p>
          )}
        </div>
        <hr className='divider' />
        {/* TODO: Editor selected startups */}
      </section>
    </>
  );
};

export default StartupPage;
