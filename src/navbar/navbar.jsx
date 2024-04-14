import { PiListNumbers } from 'react-icons/pi';
import { LuLayoutDashboard } from 'react-icons/lu';
import { AiOutlineAliwangwang } from 'react-icons/ai';
import { FiUserPlus } from 'react-icons/fi';
import { SiLeagueoflegends } from "react-icons/si";
import { useState, useContext, createContext } from 'react';

const NavbarContext = createContext();

export function Navbar() {
  const [expanded, setExpanded] = useState(false);
  return (
    <aside 
      className='h-screen absolute'
      onMouseOver={() => setExpanded(true)}
      onMouseOut={() => setExpanded(false)}
    >
      <nav className='h-full flex flex-col bg-slate-950 shadow-sm'>
        <NavbarContext.Provider value={{expanded}}>
          <div className='flex items-center mt-6 mb-4 ml-5 text-indigo-500 font-[Raleway] font-semibold text-lg'>
            <div className='text-indigo-500/90'>
              <SiLeagueoflegends size={27} />
            </div>
            <span className={`overflow-hidden whitespace-nowrap transition-all
              ${
                expanded ? 'w-40 ml-3' : 'w-0'
              }`}
            >
              AFTERSHOCK.GG
            </span>
          </div>
          <ul className='flex-1 px-3'>
            <NavbarItem 
              icon={<LuLayoutDashboard size={25} />}
              text='Home'
              linkTo='/'
              active
            />
            <NavbarItem 
              icon={<PiListNumbers size={25} />}
              text='Tier List'
              linkTo='/'
            />
            <NavbarItem 
              icon={<AiOutlineAliwangwang size={25} />}
              text='Champions'
              linkTo='/'
            />
          </ul>
          <div className='flex justify-center items-center border-t-2 border-indigo-500/75 mx-4 mb-6 text-indigo-500/80'>
            <button type='button' className='bg-slate-900/80 p-1.5 ml-0.5 mt-2.5'>
              <FiUserPlus size={25} />
            </button>
            <span 
              className={`overflow-hidden whitespace-nowrap transition-all mt-1.5 ${
                expanded ? 'w-40 ml-3.5' : 'w-0'
              }`}
            >
              <div className='flex flex-col'>
                <div className='font-[525]'>Guest</div>
                <div className='text-sm text-indigo-500/70'>Logged Out</div>
              </div>
            </span>
          </div>
        </NavbarContext.Provider>
      </nav>
    </aside>
  )
}
export default Navbar

function NavbarItem({ icon, text, linkTo, active }) {
  const {expanded} = useContext(NavbarContext);

  return (
    <a
      href={`${linkTo}`}
      className=
      {`relative flex justify-center items-center py-1.5 px-2 my-3
        font-[525] rounded-md cursor-pointer 
        transition-colors 
        ${
          active
            ? 'bg-gradient-to-tr from-indigo-600/80 to-indigo-500/80 text-stone-950'
            : 'hover:bg-slate-900/85 text-indigo-500/70'
        }
      `}
    >
      {icon}
      <span 
        className={`overflow-hidden whitespace-nowrap transition-all ${
          expanded ? 'w-40 ml-3' : 'w-0'
        }`}
      >
        {text}
      </span>
    </a>
  )
}