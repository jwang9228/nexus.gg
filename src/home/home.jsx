import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './home.css';
import regions from './regions.json';

function Home() {
  const navigate = useNavigate();

  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [showRegions, setShowRegions] = useState(false);
  const [summonerSearch, setSummonerSearch] = useState('');

  const searchSummoner = () => {
    if (summonerSearch !== '') {
      const [name, tagline] = summonerSearch.split('#');
      const region = selectedRegion.region;
      if (tagline) {
        navigate(`/summoners/${region}/${name}-${tagline}`);
      } else {
        navigate(`/summoners/${region}/${name}-${region.toUpperCase()}`);
      }
    }
  };

  return (
    <div className='rift-background flex flex-col items-center h-screen'>
      <form 
        className='w-screen min-[801px]:w-1/2 relative mt-36'
        onSubmit={(e) => { 
          e.preventDefault(); 
          searchSummoner(); 
        }}
      >
        <div className='relative'>
          <button 
            type='button'
            className='absolute left-3 top-1/2 -translate-y-1/2 p-2 py-0.5 w-[56px] rounded-md text-base text-center text-stone-300'
            style={{ backgroundColor: selectedRegion.color }}
            onClick={() => { setShowRegions(!showRegions) }}
          >
            {selectedRegion.name}
          </button>
          <input 
            type='search' 
            placeholder='Search Summoners' 
            className='w-full p-3 ps-20 pe-20 rounded-md bg-slate-900 text-slate-200 text-xl focus:outline-none'
            onChange={(e) => { setSummonerSearch(e.target.value) }}
          />
          <button 
            type='button'
            className='absolute right-px top-1/2 -translate-y-1/2 p-4'
            onClick={() => { searchSummoner() }}
          >
            <AiOutlineSearch className='text-slate-500' size={26}/>
          </button>
        </div>
      </form>
      {showRegions && (
        <div className='flex justify-center w-screen min-[801px]:w-1/2'>
          {regions.map((region) => (
            <button
              type='button'
              key={region.name}
              style={{ backgroundColor: region === selectedRegion ? region.color : "#464264" }}
              className='mt-3 mx-1 w-[56px] h-[32px] rounded-md text-stone-300'
              onClick={() => { setSelectedRegion(region) }}
            >
              {region.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;