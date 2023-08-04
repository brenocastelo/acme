export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className='flex w-full flex-col items-center gap-16 py-6 sm:gap-20  sm:py-12'>
      {children}
    </section>
  );
}
