import Image from 'next/image';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { FeatureSection } from '@/types';

export function Feature({
  label,
  featureButton,
  description,
  title,
  media,
  contentPosition,
}: FeatureSection) {
  const url =
    media.__typename === 'EmbeddedVideo' ? media.url : media.file?.url;
  const contentPositionStyle =
    contentPosition === 'right' ? 'sm:flex-row-reverse' : ' sm:flex-row';

  return (
    <div
      className={cn(
        'flex flex-col gap-12 sm:mx-8 sm:max-w-7xl sm:flex-row sm:items-center sm:justify-center sm:gap-24',
        contentPositionStyle
      )}
    >
      <div className='sm:flex sm:w-2/4 sm:flex-col sm:items-start'>
        {label && (
          <span className='text-lg font-bold text-primary'>{label}</span>
        )}
        <h1 className='text-left text-4xl font-semibold text-foreground'>
          {title}
        </h1>
        <p className='mt-4 text-left text-lg font-normal text-muted'>
          {description}
        </p>

        {featureButton ? (
          <div className='mt-8 flex w-full justify-center gap-2 sm:w-auto sm:flex-row md:w-auto'>
            <Button
              key={featureButton.id}
              className='w-full sm:w-auto'
              size='sm'
            >
              {featureButton.title}
            </Button>
          </div>
        ) : null}
      </div>
      {media.__typename === 'Image' ? (
        <div className='flex items-center justify-center rounded-3xl bg-card sm:mt-12 sm:p-10'>
          <Image
            src={url || ''}
            alt={media.altText || ''}
            height={320}
            width={480}
            className='border border-gray-100'
          />
        </div>
      ) : (
        <div className='flex max-w-full flex-1 items-center justify-center rounded-3xl'>
          <iframe
            className='aspect-video w-full rounded-lg shadow-lg'
            src={url}
            title={media.altText}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          />
        </div>
      )}
    </div>
  );
}
