import { AiOutlineSearch } from 'react-icons/ai';
import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { MdHistory } from 'react-icons/md';
import TopNav from '../navbar/topnav';
import RegionsSwiper from './regions-swiper';
import * as userClient from './user-client';
import * as summonerClient from '../summoner/summoner-client';
import regions from './regions.json';
import champions from '../summoner/champion.json';
import backgrounds from './backgrounds.json';

function Home() {
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;
  const navigate = useNavigate();

  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [showRegions, setShowRegions] = useState(false);
  const [summonerSearch, setSummonerSearch] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchbarActive, setSearchbarActive] = useState(false);
  const [activeBackground, setActiveBackground] = useState(backgrounds[3]);

  const searchSummoner = () => {
    if (summonerSearch !== '') {
      const [gameName, tagline] = summonerSearch.split('#');
      const region = selectedRegion.region;
      if (tagline) {
        navigate(`/summoners/${region}/${gameName}-${tagline}`);
      } else {
        navigate(`/summoners/${region}/${gameName}-${region.toUpperCase()}`);
      }
    }
  };

  const filterRecentSearches = () => {
    return recentSearches.filter((search) => `${search.name}#${search.tagline}`.toLowerCase().startsWith(summonerSearch.toLowerCase()));
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

  const handleSelectRegion = async (region) => {
    setSelectedRegion(region);
    await userClient.setSelectedRegion(region);
  }

  useEffect(() => {
    const getRecentSearches = async () => {
      const response = await summonerClient.getRecentSearches();
      if (response) setRecentSearches(response);
    };
    getRecentSearches();

    const fetchActiveBackground = async () => {
      const response = await userClient.getActiveBackground();
      if (Object.keys(response).length !== 0) {
        setActiveBackground(response);
      } else {
        setActiveBackground(backgrounds[3]);
      }
    };
    fetchActiveBackground();

    const fetchSelectedRegion = async () => {
      const response = await userClient.getSelectedRegion();
      if (Object.keys(response).length !== 0) {
        setSelectedRegion(response);
      } else {
        setSelectedRegion(regions[0]);
      }
    };
    fetchSelectedRegion();
  }, []);

  return (
    <div className='flex flex-col items-center h-dvh shadow-[inset_0_0_0_2000px_rgba(0,0,0,0.20)]'>
      {backgrounds.map((background, index) => (
        <div 
          key={index}
          style={{'--bg-image-url': `url(${AWS_S3_URL}/regions/images/${background.background}.jpeg)`}}
          className={`bg-cover bg-center bg-fixed bg-[image:var(--bg-image-url)] z-[-1] absolute size-full
            ${background.index === activeBackground.index ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-out
          `}
        />
      ))}
      <div className='ml-auto'><TopNav /></div>
      <div className={`mt-24 mb-3 font-[Raleway] font-bold tracking-[0.5em]
        ${activeBackground.colors === 'dark' ? 'text-slate-950' : 'text-slate-900'} text-2xl tablet:text-3xl laptop:text-4xl 
      `}>
        DIVERGE.GG
      </div>
      <form 
        className='relative w-screen tablet:w-4/5 laptop:w-1/2 px-5 tablet:px-0'
        onSubmit={(e) => { 
          e.preventDefault(); 
          searchSummoner(); 
        }}
      >
        <div className='relative'>
          <button 
            type='button'
            className='absolute left-3 top-1/2 -translate-y-1/2 px-2 py-0.5 w-[56px] rounded-md 
              text-base text-center text-stone-300'
            style={{ backgroundColor: selectedRegion.color }}
            onClick={() => { setShowRegions(!showRegions) }}
          >
            {selectedRegion.name}
          </button>
          <input 
            type='search' 
            placeholder='Search Summoners/Champions' 
            className='w-full py-3 pl-20 pr-12 rounded-md bg-slate-900 
              text-slate-200 text-xl truncate focus:outline-none'
            onChange={(e) => { setSummonerSearch((e.target.value).trim()) }}
            onFocus={() => {
              setSearchbarActive(true);
              if (showRegions) setShowRegions(false);
            }}
            onBlur={() => setSearchbarActive(false) }
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
        <div className='flex flex-wrap justify-center w-screen tablet:w-4/5 laptop:w-1/2 px-5 tablet:px-0 gap-y-3 gap-x-2 mt-4'>
          {regions.map((region) => (
            <button
              type='button'
              key={region.name}
              style={{ backgroundColor: region.name === selectedRegion.name ? region.color : '#464264' }}
              className='w-12 tablet:w-14 h-7 rounded-md text-stone-300'
              onClick={() => handleSelectRegion(region)}
            >
              {region.name}
            </button>
          ))}
        </div>
      )}
      {searchbarActive && (
        <ul className='w-screen tablet:w-4/5 laptop:w-1/2 overflow-auto mt-2.5 px-5 tablet:px-0'>
          {summonerSearch.length > 0 && filterChampionsSearch().map((champion) => (
            <li className='bg-slate-800 hover:bg-slate-900 first:rounded-t-md last:rounded-b-md' key={champion.id}>
              <a 
                href={`/champions/${champion.id}`} 
                className='flex justify-between py-1.5 px-3 text-zinc-300/95'
                onMouseDown={e => e.preventDefault()}
              >
                <div className='flex flex-row items-center'>
                  <AiOutlineSearch className='size-5 mr-3' size={18}/>
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
            <li className='bg-slate-800 hover:bg-slate-900 first:rounded-t-md last:rounded-b-md' key={`${search.name}${search.tagline}`}>
              <a 
                href={`/summoners/${search.region}/${search.name}-${search.tagline}`} 
                className='flex justify-between py-1.5 px-3 text-zinc-300/95'
                onMouseDown={e => e.preventDefault()}
              >
                <div className='flex flex-row items-center'>
                  <MdHistory className='size-5 mr-3'/>
                  <img 
                    src={`${AWS_S3_URL}/profileicon/${search.profileIconId}.png`}
                    className='size-5 rounded-sm mr-2'
                  />
                  {summonerSearch.length === 0 ? (
                    <div className='truncate'>
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
                  className='flex items-center px-2 mr-0.5 text-sm'
                  style={{backgroundColor: regions.find((region) => region.region === search.region).color}}
                >
                  {regions.find((region) => region.region === search.region).name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
      {activeBackground && (
        <div className='ml-auto mt-auto mr-5 tablet:mr-6 mb-6 tablet:mb-7'>
          <RegionsSwiper activeBackground={activeBackground} setActiveBackground={setActiveBackground}/>
        </div>
      )}
    </div>
  );
}
export default Home;