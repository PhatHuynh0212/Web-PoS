export default function Home() {
  return (
    <>
      <section className="h-full w-full md:pt-10 mt-[-70px] relative flex items-center justify-center flex-col" style={{ backgroundColor: '#FFFCF4', height: '110vh' }}>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground bg-clip-text relative" style={{ color: 'black' }}>
          <h1 className="text-9x2 font-bold text-center md:text-[150px]">
            Web PoS
          </h1>
          <h1 className="text-9x2 font-bold text-center md:text-[70px]">
            Multi Tenancy
          </h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-70px]">
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10" style={{ backgroundColor: '#FFFCF4' }}></div>
        </div>
      </section>
    </>
  );
}