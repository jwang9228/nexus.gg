import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import Navbar from './navbar/Navbar';
import Home from './home/Home';
import Summoner from './summoner/Summoner';
import SummonerRedirect from './summoner/SummonerRedirect';
import Modals from './modals/Modals';

function App() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [inDevModalOpen, setInDevModalOpen] = useState(false);
  const [inDevFeature, setInDevFeature] = useState('');
  
  const isModalActive = () => {
    return contactModalOpen || inDevModalOpen;
  };

  const modalStates = {
    'isModalActive': isModalActive,
    'contactModalOpen': contactModalOpen,
    'setContactModalOpen': setContactModalOpen,
    'inDevModalOpen': inDevModalOpen,
    'setInDevModalOpen': setInDevModalOpen,
    'inDevFeature': inDevFeature,
    'setInDevFeature': setInDevFeature,
  };
  
  const bgColor = 'bg-[#24253a]';
  useEffect(() => {
		document.body.classList.add(bgColor);
		return () => {
			document.body.classList.remove(bgColor);
		};
	}, []);

  return (
    <BrowserRouter>
      <Modals modalStates={modalStates} />
      <div className={`flex 
        ${isModalActive() 
          ? 'pointer-events-none opacity-30' 
          : 'pointer-events-auto opacity-100'
        }`
      }>
        <div className='hidden laptop:flex'>
          <Navbar modalStates={modalStates} />
        </div>
        <div className='flex-1 w-full'>
          <Routes>
            <Route index element={<Home modalStates={modalStates}/>} />
            <Route 
              path='/summoners/:region/:summonerName' 
              element={<Summoner modalStates={modalStates}/>} 
            />
            <Route 
              path='/summoners/redirect/:region/:summonerName'
              element={<SummonerRedirect />} 
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
};
export default App;
