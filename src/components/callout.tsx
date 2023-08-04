import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Callout } from '@/types';

export function Callout({ title, description, actionButton }: Callout) {
  return (
    <div className='w-full items-center rounded-2xl bg-[#1E293B] p-16 sm:flex sm:max-w-7xl'>
      <div className='flex flex-1 flex-col'>
        <h1 className='mb-4 text-3xl font-semibold text-white'>{title}</h1>
        <p className='text-xl text-white'>{description}</p>
      </div>

      {actionButton ? (
        <div className='flex flex-col items-center gap-3 sm:flex-row'>
          <Button
            key={actionButton.id}
            className={cn('w-full sm:w-auto', actionButton && 'sm:hidden')}
          >
            {actionButton.title}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
