import { AiOutlineSearch } from 'react-icons/ai';
import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { MdHistory } from 'react-icons/md';
import TopNav from '../navbar/topnav';
import RegionsSwiper from './regions-swiper';
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
  }

  const filterChampionsSearch = () => {
    const searchLowerCase = summonerSearch.trim().toLowerCase();
    const filteredChampions = Object.values(champions.data).filter(champion =>
      [champion.id, champion.name].some(prop =>
        prop.toLowerCase().startsWith(searchLowerCase)
      )
    );
    return filteredChampions;
  }

  useEffect(() => {
    const getRecentSearches = async () => {
      const response = await summonerClient.getRecentSearches();
      setRecentSearches(response);
    };
    getRecentSearches();
  }, []);

  return (
    <div 
      className='flex flex-col items-center h-screen shadow-[inset_0_0_0_2000px_rgba(0,0,0,0.20)]'
    >
      {backgrounds.map((background, index) => (
        <div 
          key={index}
          style={{'--bg-image-url': `url(${AWS_S3_URL}/regions/images/${background.background}.jpeg)`}}
          className={`bg-cover bg-center bg-[image:var(--bg-image-url)] z-[-1] absolute top-0 left-0 w-full h-full 
            ${background.index === activeBackground.index ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-out
          `}
        ></div>
      ))}
      <div className='ml-auto'>
        <TopNav />
      </div>
      <div className={`
        mt-40 mb-3 laptop:mt-28 laptop:px-0 font-[Raleway] font-bold tracking-[0.5em]
        ${activeBackground.colors === 'dark' ? 'text-slate-950' : 'text-slate-900'} text-xl laptop:text-4xl 
      `}>
        AFTERSHOCK.GG
      </div>
      <form 
        className='w-screen relative px-5 laptop:w-1/2 laptop:px-0'
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
            placeholder='Search Summoners/Champions' 
            className='w-full p-3 ps-20 pe-20 rounded-md bg-slate-900 text-slate-200 text-xl focus:outline-none'
            onChange={(e) => { setSummonerSearch((e.target.value).trim()) }}
            onFocus={() => setSearchbarActive(true) }
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
        <div className='flex flex-wrap justify-center w-screen px-5 laptop:w-1/2 laptop:px-0'>
          {regions.map((region) => (
            <button
              type='button'
              key={region.name}
              style={{ backgroundColor: region === selectedRegion ? region.color : "#464264" }}
              className='mx-1 mt-4 w-[46px] h-[26px] laptop:w-[56px] laptop:h-[32px] rounded-md text-stone-300'
              onClick={() => { setSelectedRegion(region) }}
            >
              {region.name}
            </button>
          ))}
        </div>
      )}
      {searchbarActive && (
        <ul className='w-screen overflow-auto mt-2.5 px-5 laptop:w-1/2 laptop:px-0'>
          {summonerSearch.length > 0 && filterChampionsSearch().map((champion) => (
            <li className='bg-slate-800 hover:bg-slate-900 first:rounded-t-md last:rounded-b-md' key={champion.id}>
              <a href={`/champions/${champion.id}`} className='flex justify-between py-1.5 px-3 text-zinc-300/95'>
                <div className='flex flex-row items-center'>
                  <AiOutlineSearch className='mt-0.5 mr-3' size={18}/>
                  <img 
                    src={`${AWS_S3_URL}/champion/${champion.image.full}`}
                    className='w-[16px] rounded-sm mr-1.5 mt-0.5'
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
            <li className='bg-slate-800 hover:bg-slate-900 first:rounded-t-md last:rounded-b-md' key={search.name}>
              <a 
                href={`/summoners/${search.region}/${search.name}-${search.tagline}`} 
                className='flex justify-between py-1.5 px-3 text-zinc-300/95'
                onMouseDown={e => e.preventDefault()}
              >
                <div className='flex flex-row items-center'>
                  <MdHistory className='mt-0.5 mr-3' size={18}/>
                  <img 
                    src={`${AWS_S3_URL}/profileicon/${search.profileIconId}.png`}
                    className='w-[16px] rounded-sm mr-1.5 mt-0.5'
                  />
                  {summonerSearch.length === 0 ? (
                    `${search.name}#${search.tagline}`
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
                  className='w-[48px] text-center'
                  style={{backgroundColor: regions.find((region) => region.region === search.region).color}}
                >
                  {regions.find((region) => region.region === search.region).name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
      <div className='ml-auto mt-auto mr-5 mb-6 laptop:mr-6 laptop:mb-7'>
        <RegionsSwiper activeBackground={activeBackground} setActiveBackground={setActiveBackground}/>
      </div>
    </div>
  );
}
export default Home;