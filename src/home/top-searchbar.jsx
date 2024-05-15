import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdHistory } from 'react-icons/md';
import * as summonerClient from '../summoner/summoner-client';
import regions from './regions.json';
import champions from '../summoner/champion.json';

function TopSearchbar() {
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;
  const { region } = useParams();
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState(regions.find((r) => r.region === region));
  const [summonerSearch, setSummonerSearch] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
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

  const filterChampionsSearch = () => {
    const searchLowerCase = summonerSearch.trim().toLowerCase();
    const filteredChampions = Object.values(champions.data).filter(champion =>
      [champion.id, champion.name].some(prop =>
        prop.toLowerCase().startsWith(searchLowerCase)
      )
    );
    return filteredChampions;
  };

  const filterRecentSearches = () => {
    return recentSearches.filter((search) => `${search.name}#${search.tagline}`.toLowerCase().startsWith(summonerSearch.toLowerCase()));
  };

  useEffect(() => {
    const getRecentSearches = async () => {
      const response = await summonerClient.getRecentSearches();
      if (response) setRecentSearches(response);
    };
    getRecentSearches();
  }, []);

  return (
    <div className='relative w-screen flex flex-col items-end tablet:items-center justify-end tablet:justify-center my-3 tablet:my-3.5 laptop:my-4 mx-6 tablet:mx-0'>
      <form 
        className='relative w-4/5 tablet:w-1/2 laptop:w-1/3'
        onSubmit={(e) => { 
          e.preventDefault(); 
          searchSummoner(); 
        }}
      >
        <div className='relative'>
          <button 
            type='button'
            className='absolute left-1 top-1/2 -translate-y-1/2 px-1.5 w-10 ml-1 
              text-sm text-center text-stone-300'
            style={{ backgroundColor: selectedRegion.color }}
          >
            {selectedRegion.name}
          </button>
          <input 
            type='search' 
            placeholder='Search Summoners/Champions' 
            className={`w-full py-[0.35rem] laptop:py-1.5 pl-14 pr-10 rounded 
              ${searchbarActive && (summonerSearch.length > 0 || recentSearches.length > 0) && 'rounded-b-none'}
              bg-slate-900 text-slate-200 text-sm tablet:text-base truncate focus:outline-none border-1.5 border-slate-950`}
            onChange={(e) => { setSummonerSearch((e.target.value).trim()) }}
            onFocus={() => setSearchbarActive(true) }
            onBlur={() => setSearchbarActive(false) }
          />
          <button 
            type='button'
            className='absolute right-px top-1/2 -translate-y-1/2 p-3'
            onClick={() => { searchSummoner() }}
          >
            <AiOutlineSearch className='text-slate-500 size-4 tablet:size-5'/>
          </button>
        </div>
      </form>
      {searchbarActive && (
        <ul className='absolute w-4/5 tablet:w-1/2 laptop:w-1/3 overflow-auto top-full transform z-10'>
          {summonerSearch.length > 0 && filterChampionsSearch().map((champion) => (
            <li className='bg-slate-800 hover:bg-slate-900 border-x-1.5 border-slate-950 last:rounded-b last:border-b-1.5' key={champion.id}>
              <a 
                href={`/champions/${champion.id}`} 
                className='flex justify-between py-1.5 px-2 text-sm text-zinc-300/95'
                onMouseDown={e => e.preventDefault()}
              >
                <div className='flex flex-row items-center'>
                  <AiOutlineSearch className='size-5 mr-3'/>
                  <img 
                    src={`${AWS_S3_URL}/champion/${champion.image.full}`}
                    className='size-5 rounded-sm mr-2'
                  />
                  {`${champion.name.substring(0, summonerSearch.length).replace(' ', '\u00A0')}`}
                  <span className='font-semibold'>
                    {`${champion.name.substring(summonerSearch.length).replace(' ', '\u00A0')}`}
                  </span>
                </div>
              </a>
            </li>
          ))}
          {filterRecentSearches().map((search) => (
            <li className='bg-slate-800 hover:bg-slate-900 border-x-1.5 border-slate-950 last:rounded-b last:border-b-1.5' key={`${search.name}${search.tagline}`}>
              <a 
                href={`/summoners/${search.region}/${search.name}-${search.tagline}`} 
                className='flex justify-between py-1.5 px-2 text-sm text-zinc-300/95'
                onMouseDown={e => e.preventDefault()}
              >
                <div className='flex flex-row items-center'>
                  <MdHistory className='size-5 mr-3'/>
                  <img 
                    src={`${AWS_S3_URL}/profileicon/${search.profileIconId}.png`}
                    className='size-5 rounded-sm mr-2'
                  />
                  {summonerSearch.length === 0 ? (
                    <div className='truncate w-40 tablet:w-full'>
                      {`${search.name}#${search.tagline}`}
                    </div>
                  ) : (
                    <>
                      {`${search.name}#${search.tagline}`.substring(0, summonerSearch.length)}
                      <span className='font-semibold'>
                        {`${search.name}#${search.tagline}`.substring(summonerSearch.length)}
                      </span>
                    </>
                  )}
                </div>
                <span 
                  className='flex items-center px-1.5 mr-0.5 text-sm'
                  style={{backgroundColor: regions.find((region) => region.region === search.region).color}}
                >
                  {regions.find((region) => region.region === search.region).name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default TopSearchbar;