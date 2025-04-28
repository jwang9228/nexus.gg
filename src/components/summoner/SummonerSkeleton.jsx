export default function SummonerSkeleton() {
  return (
    <div className='w-dvw animate-pulse'>
      <div className='flex relative mx-6 my-4'>
        <div className='absolute rounded bg-slate-600 size-7 tablet:size-8 hidden' />
        <div className='flex w-full justify-end tablet:justify-center'>
          <div className='rounded bg-slate-600 w-4/5 tablet:w-1/2 laptop:w-1/3 h-7 tablet:h-9' />
        </div> 
      </div>
      <div className='mt-[2.4rem] laptop:mt-11'>
        <div className='flex ml-6 laptop:ml-24 mb-3 gap-x-3.5 laptop:gap-x-5'>
          <div className='rounded bg-slate-600 size-16 tablet:size-20 laptop:size-24' />
          <div className='flex flex-col justify-between gap-y-4'>
            <div className='rounded bg-slate-600 w-48 tablet:w-80 laptop:w-96 h-5 tablet:h-6' />
            <div className='rounded bg-slate-600 w-24 laptop:w-28 h-7 tablet:h-9' />
          </div>
        </div>
        <div className='grid laptop:grid-cols-10 laptop:gap-3 laptop:mt-4 laptop:ml-24'>
          <div className='laptop:col-span-3 mx-6 laptop:mx-0 my-2.5 laptop:my-1.5 space-y-2.5'>
            {[...Array(2)].map((_, i) => (
              <div key={i} className='flex justify-between items-center bg-slate-600 rounded-lg h-[2.12rem] p-2.5'>
                <div className='bg-slate-700 rounded w-24 h-4' />
                <div className='bg-slate-700 rounded w-20 h-4' />
              </div>
            ))}
          </div>
          <div className='laptop:col-span-7 rounded laptop:mx-2 laptop:mr-8 mt-1.5 mb-4 space-y-2.5'>
            {[...Array(20)].map((_, i) => (
              <div key={i} className='flex flex-col bg-slate-600 rounded mx-6 laptop:mx-0 pl-3 pr-2 py-2 gap-y-1.5 animate-pulse' style={{'animationDelay': `${100 * i}ms`}}>
                <div className='laptop:hidden flex justify-between h-3'>
                  <div className='w-20 rounded bg-slate-700' />
                  <div className='w-24 rounded bg-slate-700' />
                </div>
                <div className='flex justify-between h-full mt-0 tablet:mt-2 laptop:mt-1'>
                  <div className='hidden laptop:flex flex-col justify-between'>
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className='flex flex-col gap-y-1.5'>
                          <div className='bg-slate-700 rounded w-20 h-3' />
                          <div className='bg-slate-700 rounded w-24 h-3' />
                        </div>
                      ))}
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex'>
                      <div className='bg-slate-700 rounded-full size-11 tablet:size-[3.25rem]' />
                      <div className='flex flex-col justify-between ml-3 h-full gap-y-2'>
                        {[...Array(2)].map((_, i) => (
                          <div key={i} className='bg-slate-700 rounded w-10 tablet:w-14 h-1/2' />
                        ))}
                      </div>
                    </div>
                    <div className='hidden tablet:flex mt-3 h-6'>
                      <div className='bg-slate-700 rounded w-40' />
                    </div>
                  </div>
                  <div className='flex tablet:hidden'>
                    <div className='flex flex-col justify-between h-full gap-y-2'>
                      <div className='bg-slate-700 rounded w-36 h-1/2' />
                      <div className='flex justify-between h-1/2'>
                        {[...Array(2)].map((_, i) => (
                          <div key={i} className='bg-slate-700 rounded w-12' />
                        ))}
                      </div>
                    </div>
                  </div>
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className='hidden tablet:flex flex-col gap-y-2.5'>
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className='bg-slate-700 rounded w-20 h-4' />
                      ))}
                    </div>
                  ))}
                  <div className='hidden tablet:flex gap-x-6'>
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className='flex flex-col gap-y-1 h-full'>
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className='flex gap-x-2 h-full'>
                            <div className='bg-slate-700 rounded-sm w-4' />
                            <div className='bg-slate-700 rounded-sm w-[4.2rem]' />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}