import { Feature } from '@/components/feature';
import Section from '@/components/section';
import { Callout } from '@/components/callout';
import { Hero } from '@/components/hero';
import type { Section as SectionType, Seo } from '@/types';
import { getPage } from '@/queries/request';

export default async function Home() {
  const page = await getPage('home');

  return (
    <div className='flex min-h-screen flex-col items-center justify-between bg-blue-50/50'>
      <main className='w-full p-8'>
        {page.sections.map((section: SectionType) => (
          <Section key={section.id}>
            {section.blocks.map((block) => {
              const Component =
                (block.__typename === 'Hero' && Hero) ||
                (block.__typename === 'FeatureSection' && Feature) ||
                (block.__typename === 'Callout' && Callout);

              if (Component) {
                return <Component key={block.__typename} {...(block as any)} />;
              }

              return null;
            })}
          </Section>
        ))}
      </main>
    </div>
  );
}
