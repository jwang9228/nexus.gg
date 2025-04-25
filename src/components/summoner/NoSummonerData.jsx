import NavMobile from '../navbar/NavMobile';
import TopSearch from '../home/TopSearch';

export default function NoSummonerData({modalStates, searchName, tagline}) {
  const AWS_S3_URL = process.env.NEXT_PUBLIC_AWS_S3_URL;
  return (
    <div className='flex flex-col w-dvw h-dvh'>
      <div className='flex'>
        <div className='laptop:hidden'>
          <NavMobile modalStates={modalStates} />
        </div>
        <TopSearch />
      </div>
      <div className='flex grow justify-center items-center'>
        <div className='flex flex-col justify-center items-center tablet:size-fit 
          mx-6 rounded-md bg-slate-950 font-[Raleway] font-medium'
        >
          <div className='flex flex-col items-center 
            text-xl tablet:text-2xl text-zinc-300/95 text-center'
          >
            <img 
              src={`${AWS_S3_URL}/general/sad-kitten.webp`} 
              className='size-36 tablet:size-40'
            />
            <span className='px-1'>
              {'Oh no! We couldn\'t find summoner:'}
            </span>
            <span className='mx-6 my-3 font-semibold break-all text-2xl tablet:text-3xl'>
              {`${searchName}#${tagline}`}
            </span>
          </div>
          <div className='flex flex-col mt-3 mb-4 text-base tablet:text-lg text-zinc-400'>
            <span className='text-center'>{'Double check that you:'}</span>
            <ul className='flex flex-col list-disc list-inside mx-5'>
              <li>{'Included #[tagline] in your search for custom tags'}</li>
              <li>Selected the correct region</li>
            </ul>
          </div>          
        </div>
      </div>
    </div>
  )
};