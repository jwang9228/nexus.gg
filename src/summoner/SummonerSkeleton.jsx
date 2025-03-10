function SummonerSkeleton() {
  return (
    <div className='mt-16'>
      <div className='flex ml-6 laptop:ml-24 mb-4'>
        <div className='rounded bg-slate-600 w-20 h-20 laptop:w-24 laptop:h-24' />
        <div className='flex flex-col'>
          <div className='rounded bg-slate-600 w-[50vw] laptop:w-[40vw] h-9 laptop:h-10 ml-3 laptop:ml-4' />
          <div className='rounded bg-slate-600 w-24 laptop:w-32 h-9 laptop:h-10 ml-3 laptop:ml-4 mt-2 laptop:mt-4' />
        </div>
      </div>
      <div className='w-screen grid laptop:grid-cols-3 laptop:gap-3 laptop:mt-4'>
        <div className='mx-6 my-2.5 laptop:mx-0 laptop:my-0 laptop:ml-24'>
          {/*
          <div className='bg-slate-600 rounded'>
            ranked solo 
          </div>
          <div className='bg-slate-600 rounded'>
            ranked flex
          </div>
          */}
        </div>
        <div className='laptop:col-span-2 bg-slate-600 rounded mx-6 laptop:mx-0 laptop:mr-7'></div>
      </div>
    </div>
  )
}
export default SummonerSkeleton;