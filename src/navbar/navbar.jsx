import { PiListNumbers } from 'react-icons/pi';
import { LuLayoutDashboard } from 'react-icons/lu';
import { AiOutlineAliwangwang } from 'react-icons/ai';
import { FiUserPlus } from 'react-icons/fi';
import { useState, useContext, createContext } from 'react';

const NavbarContext = createContext();

export function Navbar({modalStates}) {
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;
  const [expanded, setExpanded] = useState(false);

  return (
    <nav 
      className='h-dvh absolute flex flex-col z-20 bg-slate-950'
      onMouseOver={() => setExpanded(true)}
      onMouseOut={() => setExpanded(false)}
    >
      <NavbarContext.Provider value={{expanded}}>
        <div className='flex items-center mt-6 mb-4 ml-4 
          font-[Raleway] font-semibold text-lg'
        >
          <img src={`${AWS_S3_URL}/general/piercing-arrow.png`} className='ml-0.5 size-8' />
          <span className={`overflow-hidden whitespace-nowrap transition-all
            ${expanded ? 'w-40 ml-2' : 'w-0'}`}
          >
            <div className='bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 inline-block text-transparent bg-clip-text tracking-widest'>
              DIVERGE.GG
            </div>
          </span>
        </div>
        <ul className='flex-1 px-3'>
          <NavbarItem 
            icon={<LuLayoutDashboard size={22} />}
            text='Home'
            linkTo='/'
            active />
          <NavbarItem 
            icon={<PiListNumbers size={24} />}
            text='Tier List'
            linkTo='/' />
          <NavbarItem 
            icon={<AiOutlineAliwangwang size={24} />}
            text='Champions'
            linkTo='/' />
        </ul>
        <div className='flex justify-center items-center mx-4 mb-5 
          border-t-2 border-zinc-300/70 text-zinc-300/85'
        >
          <button 
            type='button' 
            className='bg-slate-900 p-1.5 ml-0.5 mt-2.5'
            onClick={() => {
              modalStates.setInDevModalOpen(true);
              modalStates.setInDevFeature('Sign In');
            }}
          >
            <FiUserPlus size={25} />
          </button>
          <span 
            className={`overflow-hidden whitespace-nowrap transition-all mt-1.5 ${
              expanded ? 'w-40 ml-3.5' : 'w-0 ml-0'
            }`}
          >
            <div className='flex flex-col'>
              <div className='font-semibold'>Guest</div>
              <div className='text-sm'>Logged Out</div>
            </div>
          </span>
        </div>
      </NavbarContext.Provider>
    </nav>
  )
}
export default Navbar;

function NavbarItem({ icon, text, linkTo, active }) {
  const {expanded} = useContext(NavbarContext);

  return (
    <a
      href={`${linkTo}`}
      className={`relative flex justify-center items-center p-1.5 my-2
        font-semibold tracking-wide rounded-md cursor-pointer transition-colors
        ${active ? 'bg-slate-900/95 text-indigo-500' : 'hover:bg-slate-900 text-zinc-300/85 hover:text-zinc-200/85'}
      `}
    >
      {icon}
      <span 
        className={`overflow-hidden whitespace-nowrap transition-all
          ${expanded ? 'w-40 ml-3.5' : 'w-0'} 
        `}
      >
        {text}
      </span>
    </a>
  )
}