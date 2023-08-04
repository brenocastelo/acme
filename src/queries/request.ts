import { Section, Seo } from '@/types';
import { PageQuery } from './page';

export async function getPage(
  slug: string
): Promise<{ sections: Section[]; seo?: Seo }> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string,
    {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_PERMANENTAUTH_TOKEN}`,
      },
      body: JSON.stringify({
        query: PageQuery,
        variables: { slug },
      }),
    }
  );

  const { data } = await response.json();

  return {
    sections: data.page.sections,
    seo: data.page.seo,
  };
}
