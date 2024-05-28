import { PiSwordDuotone, PiCoinsDuotone } from 'react-icons/pi';

function AdvancedMatch({overallTeamStats, teamStats, myPlayerStats, isMyTeam, region}) {
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;

  const objectives = overallTeamStats.objectives;

  const formatGoldEarned = (goldEarned) => {
    if (goldEarned < 1000) return `${goldEarned}`;
    else return `${Math.floor(goldEarned / 1000)}k`;
  };

  const getMyBackgroundColor = () => {
    if (myPlayerStats.matchResult === 'Victory') return 'bg-[#445d90]';
    else if (myPlayerStats.matchResult === 'Defeat') return 'bg-[#804145]';
    else return 'bg-[#929191]';
  };

  return (
    <div className={`flex flex-col ${!isMyTeam && 'rounded-b'} ${isMyTeam ? myPlayerStats.backgroundColor : myPlayerStats.enemyBackgroundColor}`}>
      <div className='flex flex-col px-1 py-0.5 text-xs text-zinc-400 border-y-1.5 border-slate-900 bg-slate-800'>
        <div className='flex items-center justify-between'>
          {overallTeamStats.matchResult}
          <div className='flex items-center gap-x-0.5'>
            <PiSwordDuotone />
            <div className='mr-2'>{overallTeamStats.kills}<span>/</span>{overallTeamStats.deaths}<span>/</span>{overallTeamStats.assists}</div>
            <PiCoinsDuotone />
            <span>{(overallTeamStats.gold).toLocaleString()}</span>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <>{`(${overallTeamStats.side} Side)`}</>
          <ObjectivesData objectives={objectives} />
        </div>
      </div>
      {teamStats.map((player) => (
        <div className={`flex px-1 ${isMyTeam && player.name === myPlayerStats.name && getMyBackgroundColor()}`}>
          <div className='relative size-9 tablet:size-14'>
            <img src={`${AWS_S3_URL}/champion/${player.champion}.png`} className='relative [clip-path:circle(45%)]'/>
            <span className='flex items-center justify-center rounded-full size-[0.8rem] p-1 ml-0.5 mb-0.5 absolute bottom-0 left-0
              bg-slate-400 font-semibold text-xxs text-slate-900'
            >
              {player.level}
            </span>
          </div>
          <div className='flex flex-col ml-0.5 mt-0.5 gap-y-0.5'>
            <div className='flex gap-x-0.5'>
              {player.summonerSpells.map((spell) => (
                <img src={`${AWS_S3_URL}/summoner-spells/${spell}.png`} className='rounded-sm size-4 tablet:size-6' />
              ))}
            </div>
            <div className='flex gap-x-1'>
              <img src={`${AWS_S3_URL}/${player.primaryRune}`} className='size-4 tablet:size-6' />
              <div className='flex items-center justify-center mt-0.5 size-fit tablet:size-6'>
                <img src={`${AWS_S3_URL}/${player.secondaryTree}`} className='tablet:w-4 h-3 tablet:h-[18px]' />
              </div>
            </div>
          </div>
          <div className='flex flex-col ml-1'> 
            <a 
              href={`/summoners/${region}/${player.name}-${player.tagline}`}
              className='text-xs w-24 truncate font-medium'
            >
              {player.name}
            </a>
            <div className='flex tablet:hidden items-center mt-1 gap-x-0.5 text-xxs text-slate-900'>
              {player.kills}<span>/</span>{player.deaths}<span>/</span>{player.assists}
              <span className={`ml-auto font-medium ${player.kdaColor}`}>{`${player.kda}:1`}</span>
            </div>
          </div>
          <div className='flex flex-col ml-auto mt-0.5'>
            <div className='flex gap-x-0.5'>
              {player.items.map((item) => (
                (item !== 0)
                ? <img src={`${AWS_S3_URL}/item/${item}.png`} className='rounded-sm size-4 tablet:size-6 laptop:size-7'/>
                : <div className={`rounded-sm size-4 tablet:size-6 laptop:size-7 ${player.itemBackgroundColor}`} />
              ))}
            </div>
            <div className='flex mt-0.5 gap-x-1 text-xxs'>
              <div className='flex gap-x-0.5'>
                {player.cs}<span>/</span>{formatGoldEarned(player.goldEarned)}
              </div>
              <div className='ml-auto w-3/5 bg-slate-600'>
                <div className={`bg-rose-500/80 px-0.5`} style={{width: `${player.champDamagePercentage}%`}}>
                  {(player.champDamage).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
};
export default AdvancedMatch;

function ObjectivesData({objectives}) {
  return (
    <div className='flex items-center gap-x-2'>
      {Object.values(objectives).map((objective) => (
        <div className='flex items-center gap-x-0.5'>
          {objective[1]} {objective[0]}
        </div>
      ))}
    </div>
  );
};