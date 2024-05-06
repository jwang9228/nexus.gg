import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import Navbar from './navbar/navbar';
import NavbarMobile from './navbar/navbar-mobile';
import Home from './home/home';
import Summoner from './summoner/summoner';
import SummonerRedirect from './summoner/summoner-redirect';

function App() {
  const bgColor = 'bg-[#24253a]';

  useEffect(() => {
		document.body.classList.add(bgColor);
		return () => {
			document.body.classList.remove(bgColor);
		};
	}, []);

  return (
    <BrowserRouter>
      <div className='flex'>
        <div className='laptop:hidden'>
          <NavbarMobile />
        </div>
        <div className='hidden laptop:flex'>
          <Navbar />
        </div>
        <div className='flex-1 m-0 p-0'>
          <Routes>
            <Route index element = {<Home />} />
            <Route path='/summoners/:region/:summonerName' element={<Summoner />} />
            <Route path='/summoners/redirect/:region/:summonerName' element={<SummonerRedirect />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
