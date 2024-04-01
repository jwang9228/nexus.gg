import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import Navbar from './navbar/navbar'
import Summoner from './summoner/summoner'
import Home from './home/home'
import './App.css'

function App() {
  useEffect(() => {
		document.body.classList.add('app-background-color');
		return () => {
			document.body.classList.remove('app-background-color');
		};
	}, []);

  return (
    <BrowserRouter>
      <div className='flex'>
        <Navbar />
        <div className='flex-1 m-0 p-0'>
          <Routes>
            <Route index element = {<Home />} />
            <Route path='/summoners/:server/:summonerName' element={<Summoner />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
