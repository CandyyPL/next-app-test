import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { auth, signIn, signOut } from '@/auth';
import { Button } from '@/components/ui/button';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
      <nav className='flex justify-between items-center'>
        <Link href='/' className='flex gap-3 items-center'>
          <Image src='/throw.png' alt='logo' width={32} height={32} />
          <span className='text-30-bold'>
            Kick<span className='text-app-primary'>throw</span>
          </span>
        </Link>

        <div className='flex items-center gap-5'>
          {session && session?.user ? (
            <>
              <Link href='/startup/create'>
                <span>Create</span>
              </Link>

              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
              >
                <button type='submit' className='cursor-pointer'>
                  Logout
                </button>
              </form>

              <Link href={`/users/${session?.user?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  'use server';
                  await signIn('github');
                }}
              >
                <Button
                  type='submit'
                  className='cursor-pointer'
                  variant='outline'
                >
                  Login
                </Button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
