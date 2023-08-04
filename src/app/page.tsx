import { Feature } from '@/components/feature';
import Section from '@/components/section';
import { Button } from '@/components/ui/button';
import { Callout } from '@/components/callout';
import { Hero } from '@/components/hero';
import { PageQuery } from '@/queries/page';
import type { Hero as HeroType, Section as SectionType } from '@/types';

export default async function Home() {
  const data = await fetch(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string, {
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
  });
  const res = await data.json();

  const Components = {
    Hero: Hero,
    FeatureSection: Feature,
    Callout: Callout,
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-between bg-blue-50/50'>
      <main className='w-full p-8'>
        {res.data.page.sections.map((section: SectionType) => (
          <Section key={section.id}>
            {section.blocks.map((block) => {
              const Component =
                (block.__typename === 'Hero' && Hero) ||
                (block.__typename === 'FeatureSection' && Feature) ||
                (block.__typename === 'Callout' && Callout);

              if (Component) {
                return <Component key={block.__typename} {...(block as any)} />;
              }

              return null; // Handle unsupported block type if needed
            })}
          </Section>
        ))}
        {/*   {res.data.page.sections.map((section: SectionType) => (
          <Section key={section.id}>
            {section.blocks.map((block) => {
              // let Component;

              if (block.__typename === 'Hero') {
                const heroContent = block as HeroType;
                //   Component = Components[block.__typename];

                return (
                  <Hero
                    key={heroContent.__typename}
                    title={heroContent.title}
                    description={heroContent.description}
                    buttons={heroContent.actionButtons}
                  />
                );
              }

              if (block.__typename === 'FeatureSection') {
                return (
                  <Feature
                    contentPosition={block.contentPosition}
                    media={{
                      type: block.media.__typename,
                      url: block.media.url || block.media.file.url,
                    }}
                    key={block.__typename}
                    title={block.title}
                    description={block.description}
                    button={
                      block.featureButton
                        ? {
                            id: block.featureButton?.id,
                            title: block.featureButton?.title,
                            size: block.featureButton?.size,
                          }
                        : undefined
                    }
                  />
                );
              }

              if (block.__typename === 'Callout') {
                return (
                  <Callout
                    key={block.__typename}
                    title={block.title}
                    description={block.description}
                    button={{
                      id: block.featureButton?.id,
                      title: block.featureButton?.title,
                      size: block.featureButton?.size,
                    }}
                  />
                );
              }
            })}
          </Section>
        ))} */}
      </main>
    </div>
  );
}
