import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import regions from './regions.json';

function TopSearchbar() {
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;
  const { region } = useParams();
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState(regions.find((r) => r.region === region));
  const [summonerSearch, setSummonerSearch] = useState('');
  const [searchbarActive, setSearchbarActive] = useState(false);

  const searchSummoner = () => {
    if (summonerSearch !== '') {
      const [gameName, tagline] = summonerSearch.split('#');
      const region = selectedRegion.region;
      if (tagline) {
        navigate(`/summoners/redirect/${region}/${gameName}-${tagline}`);
      } else {
        navigate(`/summoners/redirect/${region}/${gameName}-${region.toUpperCase()}`);
      }
    }
  };

  return (
    <div className='flex justify-end laptop:justify-center my-3 laptop:my-4 mx-6 laptop:mx-0'>
      <form 
        className='relative w-4/5 laptop:w-1/3 laptop:px-0'
        onSubmit={(e) => { 
          e.preventDefault(); 
          searchSummoner(); 
        }}
      >
        <div className='relative'>
          <button 
            type='button'
            className='absolute left-1 top-1/2 -translate-y-1/2 px-1.5 laptop:px-2 w-10 laptop:w-12 ml-1 
              text-sm laptop:text-base text-center text-stone-300'
            style={{ backgroundColor: selectedRegion.color }}
          >
            {selectedRegion.name}
          </button>
          <input 
            type='search' 
            placeholder='Search Summoners/Champions' 
            className='w-full py-[0.35rem] laptop:py-1.5 pl-14 laptop:pl-16 pr-10 rounded bg-slate-900
              text-slate-200 text-sm laptop:text-base truncate focus:outline-none ring-slate-950 ring-1 ring-inset'
            onChange={(e) => { setSummonerSearch((e.target.value).trim()) }}
            onFocus={() => setSearchbarActive(true) }
            onBlur={() => setSearchbarActive(false) }
          />
          <button 
            type='button'
            className='absolute right-px top-1/2 -translate-y-1/2 p-3'
            onClick={() => { searchSummoner() }}
          >
            <AiOutlineSearch className='text-slate-500 size-4 laptop:size-5'/>
          </button>
        </div>
      </form>
    </div>
  )
}
export default TopSearchbar;