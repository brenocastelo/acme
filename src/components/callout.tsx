import { Button } from './ui/button';
import { Callout } from '@/types';

export function Callout({ title, description, calloutbutton }: Callout) {
  return (
    <div className='flex w-full flex-col items-start gap-8 rounded-2xl bg-card-foreground p-8 sm:flex sm:max-w-7xl sm:flex-row sm:p-16'>
      <div className='flex flex-1 flex-col'>
        <h1 className='mb-4 text-3xl font-semibold text-white'>{title}</h1>
        <p className='text-xl text-white'>{description}</p>
      </div>

      {calloutbutton ? (
        <div className='flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row'>
          <Button key={calloutbutton.id} className={'w-full sm:w-auto'}>
            {calloutbutton.title}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
