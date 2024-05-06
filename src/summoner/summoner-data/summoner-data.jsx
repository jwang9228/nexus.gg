import TopSearchbar from '../../home/top-searchbar';
import RankStats from './rank-stats';
import { LuRefreshCw } from 'react-icons/lu';

function SummonerData({ summonerData }) {
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;
  return (
    <div className='z-10'>
      <TopSearchbar />
      <div className='mt-8'>
        <div className='flex ml-6 laptop:ml-24 mb-4'>
          <div className='flex flex-col relative'>
            <img 
              src={`${AWS_S3_URL}/profileicon/${summonerData.profileIconId}.png`} 
              className='rounded bg-slate-600 size-16 laptop:size-24 border border-slate-950' 
            />
            <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1.5 laptop:translate-y-2 rounded-full px-2 py-0.5 
              bg-slate-900 text-zinc-300 text-[10px] laptop:text-xs'>
              {summonerData.summonerLevel}
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='ml-3.5 laptop:ml-5 mb-auto -translate-y-1 
              text-base laptop:text-3xl text-zinc-300 font-semibold'>
              {summonerData.summonerName}
              <span className='ml-1 text-zinc-300/95 font-semibold laptop:font-medium'>{`#${summonerData.tagLine}`}</span>
            </div>
            <button 
              type='button' 
              className='rounded w-24 laptop:w-28 py-1.5 ml-3.5 laptop:ml-5
                text-sm laptop:text-base text-zinc-300 tracking-wide font-semibold 
                bg-blue-600 hover:bg-blue-600/95 border border-blue-900'
            >
              <div className='flex items-center justify-center'>
                <LuRefreshCw className='size-4 laptop:size-[18px]'/>
                <span className='ml-1.5'>Update</span>
              </div>
            </button>
          </div>
        </div>
        <div className='w-screen grid laptop:grid-cols-3 laptop:gap-3 laptop:mt-4'>
          <div className='mx-6 laptop:mx-0 laptop:mt-1.5 laptop:ml-24'>
            <RankStats 
              queueData={summonerData.soloQueueRank}
              queueName='Ranked Solo/Duo'
            />
            <RankStats 
              queueData={summonerData.flexQueueRank}
              queueName='Ranked Flex'
            />
          </div>
          <div className='laptop:col-span-2 bg-slate-600 rounded mx-6 laptop:mx-0 laptop:mr-7'>overall stats</div>
        </div>
      </div>
    </div>
  )
}
export default SummonerData;