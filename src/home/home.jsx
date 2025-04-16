import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdHistory } from 'react-icons/md';
import TopNav from '../navbar/Topnav';
import NavbarMobile from '../navbar/NavbarMobile';
import regions from '../metadata/regions.json';
import champions from '../metadata/champion.json';
import backgrounds from '../metadata/backgrounds.json';
import * as userClient from '../client/userClient';
import * as summonerClient from '../client/summonerClient';

function Home({modalStates}) {
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;
  const DDRAGON_URL = `https://ddragon.leagueoflegends.com/cdn/${import.meta.env.VITE_PATCH_VERSION}`;
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [showRegions, setShowRegions] = useState(false);
  const [summonerSearch, setSummonerSearch] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchbarActive, setSearchbarActive] = useState(false);
  const [activeBackground, setActiveBackground] = useState(backgrounds[2]);

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

  const handleSelectRegion = async (region) => {
    setSelectedRegion(region);
    await userClient.setSelectedRegion(region);
  };

  useEffect(() => {
    const fetchHomeData = async () => {
      const [recentSearchesResponse, selectedRegionResponse] = 
        await Promise.all([
          summonerClient.getRecentSearches(),
          userClient.getSelectedRegion()
        ]
      );

      if (recentSearchesResponse) setRecentSearches(recentSearchesResponse);
      if (Object.keys(selectedRegionResponse).length !== 0) {
        setSelectedRegion(selectedRegionResponse);
      } else {
        setSelectedRegion(regions[0]);
      }
    };

    fetchHomeData();

    const changeBackgroundInterval = setInterval(() => {
      setActiveBackground(prevBackground => {
        const currentIndex = backgrounds.indexOf(prevBackground);
        const nextIndex = (currentIndex + 1) % backgrounds.length;
        return backgrounds[nextIndex];
      });
    }, 15000); 

    return () => clearInterval(changeBackgroundInterval);
  }, []);

  return (
    <div className='flex flex-col h-dvh shadow-[inset_0_0_0_2000px_rgba(0,0,0,0.20)]'>
      {backgrounds.map(background => (
        <div 
          key={background.index}
          style={{'--bg-image-url': `url(${AWS_S3_URL}/regions/images/${background.background}.jpeg)`}}
          className={`absolute size-full z-[-1] 
            bg-cover bg-center bg-fixed bg-[image:var(--bg-image-url)]
            ${background.index === activeBackground.index ? 'opacity-100' : 'opacity-0'} 
            transition-opacity duration-1000 ease-out`}
        />
      ))}
      <div className='laptop:hidden'><NavbarMobile modalStates={modalStates}/></div>
      <div className='ml-auto h-1/6'><TopNav modalStates={modalStates}/></div>
      <div className='flex flex-col items-center h-5/6'>
        <div className={`mt-24 mb-3 font-[Raleway] font-bold tracking-[0.5em]
          ${activeBackground.colors === 'dark' ? 'text-slate-950' : 'text-slate-900'} 
          text-2xl tablet:text-3xl laptop:text-4xl`}
        >
          {'NEXUS.GG'}
        </div>
        <form 
          onSubmit={(e) => { 
            e.preventDefault(); 
            searchSummoner(); 
          }}
          className='relative w-dvw tablet:w-4/5 laptop:w-1/2 px-5 tablet:px-0'
        >
          <div className='relative'>
            <button 
              type='button'
              onClick={() => setShowRegions(!showRegions)}
              style={{backgroundColor: selectedRegion.color}}
              className='absolute top-1/2 left-3 -translate-y-1/2 
                w-14 px-2 py-0.5 rounded-md text-base text-center text-stone-300'
            >
              {selectedRegion.name}
            </button>
            <input 
              type='text' 
              placeholder='Search Summoners/Champions' 
              onChange={(e) => setSummonerSearch((e.target.value).trim())}
              onFocus={() => {
                setSearchbarActive(true);
                if (showRegions) setShowRegions(false);
              }}
              onBlur={() => setSearchbarActive(false)}
              className='w-full py-3 pl-20 pr-12 rounded-md focus:outline-none 
                bg-slate-900 text-slate-200 text-xl truncate'
            />
            <button 
              type='button'
              onClick={() => searchSummoner()}
              className='absolute top-1/2 right-px -translate-y-1/2 p-4'
            >
              <AiOutlineSearch className='size-6 text-slate-500'/>
            </button>
          </div>
        </form>
        {showRegions && (
          <div className='flex flex-wrap justify-center w-dvw tablet:w-4/5 laptop:w-1/2 
            mt-4 px-5 tablet:px-0 gap-y-3 gap-x-2'
          >
            {regions.map(region => (
              <button
                type='button'
                key={region.name}
                style={{backgroundColor: region.name === selectedRegion.name 
                  ? region.color 
                  : '#464264'
                }}
                onClick={() => handleSelectRegion(region)}
                className='w-12 tablet:w-14 h-7 rounded-md text-stone-300'
              >
                {region.name}
              </button>
            ))}
          </div>
        )}
        {searchbarActive && (
          <ul className='w-dvw tablet:w-4/5 laptop:w-1/2 overflow-auto my-2.5 px-5 tablet:px-0'>
            {summonerSearch.length > 0 && filterChampionsSearch().map(champion => (
              <li 
                key={champion.id}
                className='first:rounded-t-md last:rounded-b-md 
                  bg-slate-800 hover:bg-slate-900'
              >
                <a 
                  href={`/champions/redirect/${selectedRegion.region}/${champion.name}`} 
                  onMouseDown={(e) => e.preventDefault()}
                  className='flex items-center px-3 py-1.5 text-zinc-300/95'
                >
                  <AiOutlineSearch className='size-5 mr-3' />
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
                className='first:rounded-t-md last:rounded-b-md 
                  bg-slate-800 hover:bg-slate-900' 
              >
                <a 
                  href={`/summoners/redirect/${search.region}/${search.name}-${search.tagline}`} 
                  onMouseDown={(e) => e.preventDefault()}
                  className='flex items-center py-1.5 px-3 text-zinc-300/95'
                >
                  <MdHistory className='size-5 mr-3'/>
                  <img 
                    src={`${DDRAGON_URL}/img/profileicon/${search.profileIconId}.png`}
                    className='size-5 rounded-sm mr-2'
                  />
                  {summonerSearch.length === 0 
                    ? <div className='truncate'>
                        {`${search.name}#${search.tagline}`}
                      </div>
                    : 
                      <>
                        {`${search.name}#${search.tagline}`.substring(0, summonerSearch.length)}
                        <span className='font-semibold'>
                          {`${search.name}#${search.tagline}`.substring(summonerSearch.length)}
                        </span>
                      </>
                  }
                  <span 
                    style={{backgroundColor: regions.find(region => 
                      region.region === search.region).color}}
                    className='px-2 ml-auto mr-0.5 text-sm text-center'
                  >
                    {regions.find(region => region.region === search.region).name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default Home;