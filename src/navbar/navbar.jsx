import { PiListNumbers } from 'react-icons/pi';
import { LuLayoutDashboard } from 'react-icons/lu';
import { AiOutlineAliwangwang } from 'react-icons/ai';
import { FiUserPlus } from 'react-icons/fi';
import { useState, useContext, createContext } from 'react';

const NavbarContext = createContext();

export function Navbar() {
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;
  const [expanded, setExpanded] = useState(false);

  return (
    <nav 
      className='h-screen absolute flex flex-col bg-slate-950'
      onMouseOver={() => setExpanded(true)}
      onMouseOut={() => setExpanded(false)}
    >
      <NavbarContext.Provider value={{expanded}}>
        <div className='flex items-center mt-6 mb-3 ml-5 text-indigo-500 font-[Raleway] font-semibold text-lg'>
          <img src={`${AWS_S3_URL}/general/aftershock.webp`} className='w-[30px] h-[30px]' />
          <span className={`overflow-hidden whitespace-nowrap transition-all
            ${expanded ? 'w-40 ml-3' : 'w-0'}`}
          >
            <div className='bg-gradient-to-r from-[#789F00] via-[#9CB800] to-[#AEC200] inline-block text-transparent bg-clip-text'>DIVERGE.GG</div>
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
        <div className='flex justify-center items-center border-t-2 border-zinc-300/70 mx-4 mb-5 text-zinc-300/85'>
          <button type='button' className='bg-slate-900 p-1.5 ml-0.5 mt-2.5'>
            <FiUserPlus size={25} />
          </button>
          <span 
            className={`overflow-hidden whitespace-nowrap transition-all mt-1.5 ${
              expanded ? 'w-40 ml-3.5' : 'w-0'
            }`}
          >
            <div className='flex flex-col'>
              <div className='font-[550]'>Guest</div>
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
      className=
      {`relative flex justify-center items-center py-1.5 px-2 my-3
        font-[525] tracking-wide rounded-md cursor-pointer 
        transition-colors 
        ${
          active
            ? 'hover:bg-slate-900 text-[#9CB800]'
            : 'hover:bg-slate-900 text-zinc-300/85'
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