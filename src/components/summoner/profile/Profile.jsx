import { LuRefreshCw } from 'react-icons/lu';

export default function Profile({summonerData, updateSummoner}) {
  const DDRAGON_URL = `https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_PATCH_VERSION}`;

  return (
    <div className='flex mb-4'>
      <div className='flex flex-col relative'>
        <img 
          src={`${DDRAGON_URL}/img/profileicon/${summonerData.profileIconId}.png`}
          className='size-16 tablet:size-20 laptop:size-24 
            border border-slate-950 rounded bg-slate-600' 
        />
        <div className='absolute bottom-0 left-1/2 transform 
          -translate-x-1/2 translate-y-1.5 tablet:translate-y-2 px-2 py-0.5 
          rounded-full bg-slate-900 text-zinc-300 text-xxs tablet:text-xs'
        >
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
          onClick={() => updateSummoner()}
        >
          <div className='flex items-center justify-center'>
            <LuRefreshCw className='size-4 tablet:size-[1.13rem]'/>
            <span className='ml-1.5'>Update</span>
          </div>
        </button>
      </div>
    </div>
  );
};