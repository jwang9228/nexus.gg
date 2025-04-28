import TopSearch from '../home/TopSearch';
import Profile from './profile/Profile';
import RankStats from './profile/RankStats';
import Match from './match/Match';

export default function SummonerData({summonerData, matches, updateSummoner}) {
  return (
    <div className='w-dvw'>
      <div className='flex'>
        <TopSearch />
      </div>
      <div className='mt-6 mx-6 laptop:mx-0 laptop:ml-24'>
        <Profile summonerData={summonerData} updateSummoner={updateSummoner} />
        <div className='grid laptop:grid-cols-10 laptop:gap-3 laptop:mt-4'>
          <div className='laptop:col-span-3 my-2 space-y-2.5'>
            <RankStats 
              queueData={summonerData.soloQueueRank}
              queueName='Ranked Solo/Duo'
            />
            <RankStats 
              queueData={summonerData.flexQueueRank}
              queueName='Ranked Flex'
            />
          </div>
          <div className='laptop:col-span-7 laptop:ml-1 laptop:mr-8 mt-2 mb-4'>
            <div className='flex flex-col gap-y-2.5'>
              {matches && matches.map((matchData, i) => (
                matchData && 
                  <Match 
                    key={i}
                    matchData={matchData} 
                    summonerName={summonerData.summonerName} 
                    region={summonerData.server} 
                  />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};