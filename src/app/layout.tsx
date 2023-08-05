import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import Link from 'next/link';
import Image from 'next/image';
import { getPage } from '@/queries/request';
import { AlignJustify, ArrowRight, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('home');

  return {
    title: page.seo?.title,
    description: page.seo?.description,
    keywords: page.seo?.keywords,
    openGraph: {
      images: [
        {
          url: page.seo?.openGraphImage.url || '',
          width: page.seo?.openGraphImage.width,
          height: page.seo?.openGraphImage.height,
        },
      ],
    },
  };
}

const links = [
  { label: 'Home', href: '/' },
  { label: 'Feature', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'About', href: '#' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={cn(inter.className, 'bg-background')}>
        <header className='sticky top-0 z-10 flex h-20 w-full bg-white px-8'>
          <div className='mx-auto flex max-w-7xl flex-1 flex-row items-center justify-between self-center'>
            <Link href='/'>
              <Image src='/acme.svg' alt='Acme Logo' width={96} height={22} />
            </Link>
            <nav className='flex-1 sm:flex sm:justify-between'>
              <ul className='hidden flex-row  sm:flex'>
                {links.map((link) => (
                  <li key={link.label}>
                    <Button
                      className='text-muted-foreground'
                      asChild
                      variant='link'
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </Button>
                  </li>
                ))}
              </ul>
              <div className='flex justify-end'>
                <div className='hidden gap-3 sm:flex'>
                  <Button
                    variant='link'
                    className='hidden text-muted-foreground sm:block'
                  >
                    Log in
                  </Button>
                  <Button>Sign up</Button>
                </div>

                <Sheet>
                  <SheetTrigger className='sm:hidden' asChild>
                    <AlignJustify />
                  </SheetTrigger>
                  <SheetContent className='w-full bg-white'>
                    <SheetHeader>
                      <SheetTitle className='flex justify-center border-b-2 pb-6'>
                        <Image
                          src='/acme.svg'
                          alt='Acme Logo'
                          width={96}
                          height={22}
                        />
                      </SheetTitle>
                    </SheetHeader>
                    <div className='mt-5 flex h-full flex-col justify-between'>
                      <ul className='flex flex-col'>
                        {links.map((link) => (
                          <li
                            key={link.label}
                            className='flex items-center justify-between py-3 text-lg hover:bg-background'
                          >
                            <Link className='w-full' href={link.href}>
                              <SheetClose className='w-full'>
                                <div className='flex w-full items-center justify-between'>
                                  {link.label}
                                  <ChevronRight size='22' />
                                </div>
                              </SheetClose>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <SheetFooter className='mb-16 flex flex-col gap-3 sm:hidden'>
                        <Button
                          variant='outline'
                          className=' text-black sm:block'
                        >
                          Log in
                        </Button>
                        <Button>Sign up</Button>
                      </SheetFooter>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </nav>
          </div>
        </header>
        {children}
        <footer className='mx-auto flex flex-row items-center justify-center px-8 sm:w-full sm:p-0'>
          <div className='flex flex-col-reverse items-center justify-between gap-8 border-t-2 py-8 sm:w-full sm:max-w-7xl sm:flex-row sm:gap-6'>
            <p className='block text-muted'>
              © {new Date().getFullYear()} Acme Co. All rights reserved.
            </p>

            <div>
              <ul className='flex gap-4'>
                <li>
                  <Button className='px-1 text-muted' asChild variant='link'>
                    <Link href='#'>Terms</Link>
                  </Button>
                </li>
                <li>
                  <Button className='px-1 text-muted' asChild variant='link'>
                    <Link href='#'>Privacy</Link>
                  </Button>
                </li>
                <li>
                  <Button className='px-1 text-muted' asChild variant='link'>
                    <Link href='#'>Cookies</Link>
                  </Button>{' '}
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
