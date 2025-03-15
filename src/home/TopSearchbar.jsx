import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdHistory } from 'react-icons/md';
import regions from '../metadata/regions.json';
import champions from '../metadata/champion.json';
import * as summonerClient from '../client/summonerClient';

function TopSearchbar() {
  const DDRAGON_URL = `https://ddragon.leagueoflegends.com/cdn/${import.meta.env.VITE_PATCH_VERSION}`;
  const { region } = useParams();
  const navigate = useNavigate();
  const [showRegions, setShowRegions] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(regions.find(r => r.region === region));
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

  const filterRecentSearches = () => {
    return recentSearches.filter(({ name, tagline }) => 
      `${name}#${tagline}`.toLowerCase().startsWith(summonerSearch.toLowerCase()));
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

  useEffect(() => {
    const getRecentSearches = async () => {
      const response = await summonerClient.getRecentSearches();
      if (response) setRecentSearches(response);
    };
    getRecentSearches();
  }, []);

  return (
    <div className='flex flex-col relative 
      justify-end tablet:justify-center items-end tablet:items-center 
      w-dvw mx-6 tablet:mx-0 my-3 tablet:my-3.5 laptop:my-4'
    >
      <form 
        onSubmit={(e) => { 
          e.preventDefault(); 
          searchSummoner(); 
        }}
        className='relative w-4/5 tablet:w-1/2 laptop:w-1/3'
      >
        <div className='relative'>
          <button 
            type='button'
            onClick={() => { 
              setShowRegions(!showRegions);
              setSearchbarActive(false); 
            }}
            style={{backgroundColor: selectedRegion.color}}
            className='absolute top-1/2 left-1 -translate-y-1/2 w-10 ml-1 
              text-sm text-center text-stone-300'
          >
            {selectedRegion.name}
          </button>
          <input 
            type='text' 
            placeholder='Search Summoners/Champions' 
            onChange={(e) => setSummonerSearch((e.target.value).trim())}
            onFocus={() => {
              setSearchbarActive(true);
              setShowRegions(false);
            }}
            onBlur={() => setSearchbarActive(false)}
            className={`w-full py-[0.35rem] laptop:py-1.5 pl-14 pr-10 
              rounded border-1.5 border-slate-950 focus:outline-none
              ${(showRegions || (searchbarActive 
                && (summonerSearch.length > 0 || recentSearches.length > 0))) 
                && 'rounded-b-none'
              }
              bg-slate-900 text-slate-200 text-sm tablet:text-base truncate`}
          />
          <button 
            type='button'
            className='absolute top-1/2 right-px -translate-y-1/2 p-3'
            onClick={() => searchSummoner()}
          >
            <AiOutlineSearch className='size-4 tablet:size-5 text-slate-500'/>
          </button>
        </div>
      </form>
      {showRegions && (
        <ul className='absolute top-full transform z-10 w-4/5 tablet:w-1/2 laptop:w-1/3 overflow-auto'>
          {regions.map(region => (
            <li 
              key={region.name}
              className='border-x-1.5 border-slate-950 last:rounded-b last:border-b-1.5 
                bg-slate-800 hover:bg-slate-900'
            >
              <button 
                type='button' 
                onClick={() => {
                  setSelectedRegion(region);
                  setShowRegions(false);
                }}
                className='flex px-2 py-1.5 gap-x-2.5 text-sm truncate text-zinc-300/95'
              >
                <div className='w-10 text-center' style={{ backgroundColor: region.color }}>
                  {region.name}
                </div>
                {region.title}
              </button>
            </li>
          ))}
        </ul>
      )}
      {searchbarActive && (
        <ul className='absolute top-full transform z-10 w-4/5 tablet:w-1/2 laptop:w-1/3 overflow-auto'>
          {summonerSearch.length > 0 && filterChampionsSearch().map(champion => (
            <li 
              key={champion.id}
              className='border-x-1.5 border-slate-950 last:rounded-b last:border-b-1.5 
                bg-slate-800 hover:bg-slate-900'
            >
              <a 
                href={`/champions/redirect/${selectedRegion.region}/${champion.name}`} 
                onMouseDown={(e) => e.preventDefault()}
                className='flex items-center px-2 py-1.5 text-sm text-zinc-300/95'
              >
                <AiOutlineSearch className='size-5 mr-3'/>
                <img 
                  src={`${DDRAGON_URL}/img/champion/${champion.image.full}`}
                  className='size-5 rounded-sm mr-2'
                />
                {`${champion.name.substring(0, summonerSearch.length).replace(' ', '\u00A0')}`}
                <span className='font-semibold'>
                  {`${champion.name.substring(summonerSearch.length).replace(' ', '\u00A0')}`}
                </span>
              </a>
            </li>
          ))}
          {filterRecentSearches().map(search => (
            <li 
              key={`${search.name}${search.tagline}`}
              className='bg-slate-800 hover:bg-slate-900 border-x-1.5 border-slate-950 last:rounded-b last:border-b-1.5'
            >
              <a 
                href={`/summoners/redirect/${search.region}/${search.name}-${search.tagline}`} 
                className='flex items-center py-1.5 px-2 text-sm text-zinc-300/95'
                onMouseDown={e => e.preventDefault()}
              >

                  <MdHistory className='size-5 mr-3'/>
                  <img 
                    src={`${DDRAGON_URL}/img/profileicon/${search.profileIconId}.png`}
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
                <span 
                  style={{backgroundColor: regions.find(region => 
                    region.region === search.region).color}}
                  className='px-1.5 ml-auto mr-0.5 text-sm text-center'
                >
                  {regions.find(region => region.region === search.region).name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
};
export default TopSearchbar;