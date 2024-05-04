import RankStats from './rank-stats';

function SummonerData({ summonerData }) {
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;
  return (
    <div className='mt-16 z-10'>
      <div className='flex ml-[1.5rem] laptop:ml-24 mb-4'>
        <div className='flex flex-col relative'>
          <img src={`${AWS_S3_URL}/profileicon/${summonerData.profileIconId}.png`} className='rounded bg-slate-600 w-[4rem] h-[4rem] laptop:w-24 laptop:h-24' />
          <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1.5 laptop:translate-y-2 rounded-full px-2 py-0.5 
            bg-slate-900 text-zinc-300 text-[10px] laptop:text-xs'>
            {summonerData.summonerLevel}
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='ml-3.5 laptop:ml-5 mb-auto -translate-y-1 
            text-base laptop:text-3xl text-zinc-300 font-semibold laptop:font-[550]'>
            {summonerData.summonerName}
            <span className='ml-1 text-zinc-300/95 font-[550] laptop:font-medium'>{`#${summonerData.tagLine}`}</span>
          </div>
          <button 
            type='button' 
            className='rounded w-20 laptop:w-28 py-1.5 ml-3.5 laptop:ml-5
              text-sm laptop:text-base font-[550] bg-blue-600/95 text-zinc-300 tracking-wider'>
            Update
          </button>
        </div>
      </div>
      <div className='w-screen grid laptop:grid-cols-3 laptop:gap-3 laptop:mt-4'>
        <div className='mx-[1.5rem] my-1.5 laptop:mx-0 laptop:my-0 laptop:ml-24'>
          <RankStats 
            queueData={summonerData.soloQueueRank}
            queueName='Ranked Solo/Duo'
          />
          <RankStats 
            queueData={summonerData.flexQueueRank}
            queueName='Ranked Flex'
          />
        </div>
        <div className='laptop:col-span-2 bg-slate-600 rounded mx-[1.5rem] laptop:mx-0 laptop:mr-7'>overall stats</div>
      </div>
    </div>
  )
}
export default SummonerData;