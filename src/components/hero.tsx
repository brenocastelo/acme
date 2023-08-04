import type { Button as ButtonType, Hero as HeroType } from '@/types';
import { Button } from './ui/button';

export function Hero({ title, description, actionButtons }: HeroType) {
  return (
    <div className='flex flex-col items-center gap-12'>
      <div className='mx-auto flex flex-col items-center gap-6 sm:max-w-5xl'>
        <h1 className='text-center text-4xl font-semibold text-[#0F172A] sm:text-6xl'>
          {title}
        </h1>
        <p className='text-center text-lg font-normal text-[#64748B] sm:block sm:max-w-3xl sm:text-xl sm:leading-[1.875rem]'>
          {description}
        </p>
      </div>
      {actionButtons.length ? (
        <div className='flex w-full justify-center gap-3 sm:w-auto sm:flex-row'>
          {actionButtons.map((button) => (
            <Button key={button.id} className='w-full sm:w-auto' size='lg'>
              {button.title}
            </Button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
