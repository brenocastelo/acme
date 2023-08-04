import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import Image from 'next/image';
import { PageQuery } from '@/queries/page';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string,
    {
      method: 'POST',
      headers: {
        cache: 'no-store',
        'Content-Type': 'application/json',
        authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_PERMANENTAUTH_TOKEN}`,
      },
      body: JSON.stringify({
        query: PageQuery,
        variables: { slug: 'home' },
      }),
    }
  );

  const { data } = await response.json();

  return {
    title: data.page.seo.title,
    description: data.page.seo?.description,
    keywords: data.page.seo.keywords,
    openGraph: {
      images: [
        {
          url: data.page.seo.openGraphImage.url,
          width: data.page.seo.openGraphImage.width,
          height: data.page.seo.openGraphImage.height,
        },
      ],
    },
  };
}

const links = [
  { label: 'Home', href: '/' },
  { label: 'feature', href: '#' },
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
      <body>
        <header className='sticky top-0 z-10 flex h-20 w-full border-b-2 bg-white px-8'>
          <div className='mx-auto flex max-w-7xl flex-1 flex-row items-center justify-between self-center'>
            <Image src='/acme.svg' alt='Acme Logo' width={96} height={22} />
            <nav className='hidden flex-1 sm:flex'>
              <ul className='hidden flex-row  sm:flex'>
                {links.map((link) => (
                  <li key={link.label}>
                    <Button className='text-black' asChild variant='link'>
                      <Link href={link.href}>{link.label}</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className='flex gap-3'>
              <Button variant='link' className='hidden text-black sm:block'>
                Log in
              </Button>
              <Button>Sign up</Button>
            </div>
          </div>
        </header>
        {children}
        <footer className='mx-auto flex flex-row items-center justify-center bg-blue-50/50 p-8 sm:w-full'>
          <div className='flex flex-1 flex-col-reverse items-center justify-between gap-8 sm:max-w-7xl sm:flex-row  sm:gap-6'>
            <p className='block'>
              © {new Date().getFullYear()} Acme Co. All rights reserved.
            </p>

            <div>
              <ul className='flex gap-4'>
                <li>
                  <a href='#'>Terms</a>
                </li>
                <li>
                  <a href='#'>Privacy</a>
                </li>
                <li>
                  <a href='#'>Cookies</a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
