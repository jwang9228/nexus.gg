import TopSearchbar from '../../home/top-searchbar';
import NavbarMobile from '../../navbar/navbar-mobile';
import RankStats from './rank-stats';
import Match from './match/match';
import { LuRefreshCw } from 'react-icons/lu';

function SummonerData({ modalStates, summonerData, matches }) {
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;
  return (
    <div className='w-dvw'>
      <div className='flex'>
        <div className='laptop:hidden'>
          <NavbarMobile modalStates={modalStates}/>
        </div>
        <TopSearchbar />
      </div>
      <div className='mt-6'>
        <div className='flex ml-6 laptop:ml-24 mb-4'>
          <div className='flex flex-col relative'>
            <img 
              src={`${AWS_S3_URL}/profileicon/${summonerData.profileIconId}.png`} 
              className='rounded bg-slate-600 size-16 tablet:size-20 laptop:size-24 border border-slate-950' 
            />
            <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1.5 tablet:translate-y-2 rounded-full px-2 py-0.5 
              bg-slate-900 text-zinc-300 text-[10px] tablet:text-xs'>
              {summonerData.summonerLevel}
            </div>
          </div>
          <div className='flex flex-col ml-3.5 laptop:ml-5'>
            <div className='mb-auto -translate-y-1 
              text-base tablet:text-2xl laptop:text-3xl text-zinc-300 font-semibold'>
              {summonerData.summonerName}
              <span className='ml-1 text-zinc-300/95 font-semibold tablet:font-medium'>{`#${summonerData.tagLine}`}</span>
            </div>
            <button 
              type='button' 
              className='rounded w-24 tablet:w-28 py-1.5
                text-sm tablet:text-base text-zinc-300 tracking-wide font-semibold 
                bg-blue-600 hover:bg-blue-600/95'
            >
              <div className='flex items-center justify-center'>
                <LuRefreshCw className='size-4 tablet:size-[18px]'/>
                <span className='ml-1.5'>Update</span>
              </div>
            </button>
          </div>
        </div>
        <div className='grid laptop:grid-cols-4 laptop:gap-3 laptop:mt-4 laptop:ml-24'>
          <div className='laptop:col-span-1 mx-6 laptop:mx-0 laptop:mt-1.5'>
            <RankStats 
              queueData={summonerData.soloQueueRank}
              queueName='Ranked Solo/Duo'
            />
            <RankStats 
              queueData={summonerData.flexQueueRank}
              queueName='Ranked Flex'
            />
          </div>
          <div className='laptop:col-span-3 mx-6 laptop:mx-0 laptop:ml-1 laptop:mr-8 my-3'>
            <div className='flex flex-col mt-[0.30rem] gap-y-2.5'>
              {matches && matches.map((matchData) => (
                matchData && <Match matchData={matchData} summonerName={summonerData.summonerName} region={summonerData.server} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SummonerData;