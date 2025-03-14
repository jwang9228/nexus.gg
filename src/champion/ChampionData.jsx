import TopSearchbar from '../home/TopSearchbar';
import NavbarMobile from '../navbar/NavbarMobile';

function ChampionData({modalStates, champion}) {
  const DDRAGON_URL = `https://ddragon.leagueoflegends.com/cdn/${import.meta.env.VITE_PATCH_VERSION}`;

  return (
    <div className='w-dvw'>
      <div className='flex'>
        <div className='laptop:hidden'>
          <NavbarMobile modalStates={modalStates} />
        </div>
        <TopSearchbar />
      </div>
      <div className='mt-6 mx-6 laptop:mx-0 laptop:ml-24'>
        <img 
          src={`${DDRAGON_URL}/img/champion/${champion.image.full}`}
          className='size-16 tablet:size-20 laptop:size-24'
        />
      </div>
    </div>
  )
}
export default ChampionData;