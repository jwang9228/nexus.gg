import Link from 'next/link';
import Image from 'next/image';
import { PiSwordDuotone, PiCoinsDuotone } from 'react-icons/pi';
import TooltipContent from '../../utils/TooltipContent';

export default function AdvancedMatch({
  overallTeamStats, 
  teamStats, 
  myPlayerStats, 
  isMyTeam, region, 
  summonerSpellsData
}) {
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
    <div className={`flex flex-col 
      ${!isMyTeam && 'rounded-b'} 
      ${isMyTeam ? myPlayerStats.backgroundColor : myPlayerStats.enemyBackgroundColor}`}
    >
      <div className='flex justify-between px-1 tablet:px-1.5 py-0.5 tablet:py-1 
        border-y-1.5 border-slate-900 bg-slate-800 
        text-xs tablet:text-sm text-zinc-400'
      >
        <div className='flex flex-col tablet:flex-row tablet:gap-x-1.5'>
          {overallTeamStats.matchResult}
          <span>{`(${overallTeamStats.side} Side)`}</span>
        </div>
        <div className='flex flex-col tablet:flex-row tablet:gap-x-4'>
          <div className='flex justify-end items-center gap-x-0.5'>
            <PiSwordDuotone />
            <div className='mr-2'>
              {overallTeamStats.kills}<span>/</span>
              {overallTeamStats.deaths}<span>/</span>
              {overallTeamStats.assists}
            </div>
            <PiCoinsDuotone />
            <span>{(overallTeamStats.gold).toLocaleString()}</span>
          </div>
          <div className='flex items-center gap-x-2'>
            {Object.values(objectives).map(objective => (
              <Objective objective={objective} />
            ))}
          </div>
        </div>
      </div>
      {teamStats.map(player => (
        <div key={player.name} className={`flex px-1 
          ${isMyTeam && player.name === myPlayerStats.name && getMyBackgroundColor()}`}
        >
          <div className='relative size-9 tablet:size-11'>
            <Link href={`/champions/${region}/${player.champion}`}>
              <Image
                src={`${process.env.NEXT_PUBLIC_DDRAGON_URL}/img/champion/${player.champion}.png`} 
                alt=''
                className='relative [clip-path:circle(45%)]'
                fill
              />
              <span className='flex absolute bottom-0 left-0 items-center justify-center 
                size-[0.8rem] tablet:size-4 p-1 ml-0.5 mb-0.5
                rounded-full bg-slate-400 font-semibold text-xxs text-slate-900'
              >
                {player.level}
              </span>
            </Link>
          </div>
          <div className='flex flex-col ml-0.5 mt-0.5 gap-y-0.5'>
            <div className='flex gap-x-0.5'>
              {player.summonerSpells.map(spell => (
                <Image
                  src={`${process.env.NEXT_PUBLIC_AWS_S3_URL}/summoner-spells/${(summonerSpellsData[spell].name).toLowerCase()}.png`} 
                  alt=''
                  className='rounded-xs size-4 tablet:size-5' 
                  width={16} height={16}
                />
              ))}
            </div>
            <div className='flex gap-x-1'>
              <Image 
                src={`https://ddragon.leagueoflegends.com/cdn/img/${player.primaryRuneIcon}`} 
                alt=''
                className='size-4 tablet:size-5' 
                width={16} height={16}
              />
              <div className='flex items-center justify-center mt-0.5 size-fit'>
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/img/${player.secondaryTreeIcon}`} 
                  alt=''
                  className='tablet:w-4 h-3 tablet:h-3.5' 
                  width={16} height={16}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col ml-1 tablet:ml-2'> 
            <Link
              href={`/summoners/${region}/${player.name}-${player.tagline}`}
              className='w-20 tablet:w-32 laptop:w-40 font-medium text-xs tablet:text-sm truncate'
            >
              {player.name}
            </Link>
            <div className='flex tablet:hidden items-center mt-1 gap-x-0.5 text-xxs text-slate-900'>
              {player.kills}<span>/</span>{player.deaths}<span>/</span>{player.assists}
              <span className={`ml-auto font-medium ${player.kdaColor}`}>{`${player.kda}:1`}</span>
            </div>
            <div className='hidden tablet:flex items-center text-sm text-slate-900'>
              {`#${player.tagline}`}
            </div>
          </div>
          <div className='flex flex-col tablet:flex-row 
            justify-start tablet:justify-center tablet:items-center 
            tablet:gap-x-4 ml-auto mt-0.5'
          >
            <div className='hidden tablet:flex gap-x-2.5 laptop:gap-x-5 text-sm'>
              <div className='flex flex-col items-center'>
                <span>{`${player.kp}% KP`}</span>
                <span>{`${player.cs} CS (${player.csm})`}</span>
              </div>
              <div className='flex flex-col items-center'>
                <div className='flex gap-x-0.5'>
                  <span className='font-medium text-slate-950'>{player.kills}</span>
                  <span className='text-slate-700'>/</span>
                  <span className='text-red-800'>{player.deaths}</span>
                  <span className='text-slate-700'>/</span>
                  <span className='font-medium text-slate-900'>{player.assists}</span>
                </div>
                <span className={`font-medium ${player.kdaColor}`}>
                  {`${player.kda} KDA`}
                </span>
              </div>
            </div>
            <div className='hidden tablet:flex flex-col w-24 gap-y-1 text-xs'>
              <div className='h-fit bg-slate-600'>
                <div 
                  style={{width: `${player.champDamagePercentage}%`}}
                  className={`bg-rose-500/80 px-0.5`}
                >
                  {(player.champDamage).toLocaleString()}
                </div>
              </div>
              <div className='h-fit bg-slate-600'>
                <div 
                  style={{width: `${player.damageTakenPercentage}%`}}
                  className={`bg-zinc-400/80 px-0.5`}
                >
                  {(player.damageTaken).toLocaleString()}
                </div>
              </div>
            </div>
            <div className='flex gap-x-0.5'>
              {player.items.map(item => (
                (item !== 0)
                ? <Image
                    src={`${process.env.NEXT_PUBLIC_DDRAGON_URL}/img/item/${item}.png`} 
                    alt=''
                    className='rounded-xs size-4 tablet:size-7'
                    width={16} height={16}
                  />
                : <div className={`rounded-sm size-4 tablet:size-7
                    ${player.itemBackgroundColor}`} 
                  />
              ))}
            </div>
            <div className='flex tablet:hidden mt-0.5 gap-x-1 text-xxs'>
              <div className='flex gap-x-0.5'>
                {player.cs}<span>/</span>{formatGoldEarned(player.goldEarned)}
              </div>
              <div className='ml-auto w-3/5 bg-slate-600'>
                <div 
                  style={{width: `${player.champDamagePercentage}%`}}
                  className={`bg-rose-500/80 px-0.5`}
                >
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

function Objective({objective}) {
  return (
    <TooltipContent 
      mainContent={
        <div className='flex items-center gap-x-0.5'>
          {objective[1]} {objective[0]}
        </div>
      }
      tooltipContent={
        <div className='text-xs text-white'>
          {objective[2]}
        </div>
      }
    />
  );
};