import TopSearch from '../home/TopSearch';
import NavMobile from '../navbar/NavMobile';
import champions from '../../metadata/champion.json';

export default function ChampionData({modalStates, championName}) {
  const DDRAGON_URL = `https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_PATCH_VERSION}`;
  const champion = Object.values(champions.data).find(champion => champion.name === championName || champion.id === championName);

  return (
    <div className='w-dvw'>
      <div className='flex'>
        <div className='laptop:hidden'>
          <NavMobile modalStates={modalStates} />
        </div>
        <TopSearch />
      </div>
      <div className='mt-6 mx-6 laptop:mx-0 laptop:ml-24'>
        <div className='flex gap-x-4 h-16 tablet:h-20 laptop:h-24'>
          <img 
            src={`${DDRAGON_URL}/img/champion/${champion.image.full}`}
            className='rounded-lg size-16 tablet:size-20 laptop:size-24'
          />
          <div className='flex flex-col h-full justify-between'>
            <div className='text-zinc-300 text-xl tablet:text-3xl laptop:text-4xl font-semibold -translate-y-1 '>
              {champion.name}
            </div>
            <div className='flex gap-x-2'>
              <img 
                src={`${DDRAGON_URL}/img/passive/${champion.passive.image.full}`}
                className='rounded size-8 tablet:size-9 laptop:size-10 border-2 border-black'
              />
              {['Q', 'W', 'E', 'R'].map((spellKey, i) => (
                <div className='relative' key={spellKey}>
                  <img 
                    src={`${DDRAGON_URL}/img/spell/${champion.spells[i].image.full}`}
                    className='rounded size-8 tablet:size-9 laptop:size-10 border-2 border-black'
                  />
                  <div className='absolute bottom-0 right-0 px-0.5 rounded
                    text-xs laptop:text-sm text-zinc-300 font-medium bg-slate-900'>
                    {spellKey}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}