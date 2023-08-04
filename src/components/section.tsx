export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className='flex w-full flex-col items-center gap-16 py-12  sm:gap-20'>
      {children}
    </section>
  );
}
