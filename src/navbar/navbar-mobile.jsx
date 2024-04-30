import { IoMenu } from 'react-icons/io5';
import { PiListNumbers } from 'react-icons/pi';
import { LuLayoutDashboard } from 'react-icons/lu';
import { AiOutlineAliwangwang } from 'react-icons/ai';
import { useState } from 'react';

function NavbarMobile() {
  const [expanded, setExpanded] = useState(false);
  return (
    <nav className='absolute'>
      <div className='absolute ml-[1.25rem] mt-3 mb-1.5 z-10'>
        <IoMenu 
          className={`${expanded ? 'text-zinc-400' : 'text-slate-900'}`} 
          size={32}
          onClick={() => setExpanded(!expanded)}
        /> 
      </div>
      <div className={`absolute w-screen bg-slate-950 transition-all ease-in-out overflow-hidden ${
        expanded ? 'max-h-48 pt-2 duration-500' : 'max-h-0 pt-0 duration-[350ms]'
      }`}>
        <ul className='flex flex-col ml-[1.25rem] mt-10 mb-2'>
          <NavbarItemMobile 
            icon={<LuLayoutDashboard size={23.5} />}
            text='Home'
            linkTo='/'
            active
          />
          <NavbarItemMobile
            icon={<PiListNumbers size={24} />}
            text='Tier List'
            linkTo='/'
          />
          <NavbarItemMobile
            icon={<AiOutlineAliwangwang size={24} />}
            text='Champions'
            linkTo='/'
          />
        </ul>
      </div>
    </nav>
  )
}
export default NavbarMobile;

function NavbarItemMobile({ icon, text, linkTo, active }) {
  return (
    <a
      href={`${linkTo}`}
      className=
      {`flex flex-1 my-1.5 p-1 font-[525] tracking-wide
        transition-colors w-full 
        ${active ? 'hover:bg-slate-900 text-indigo-500' : 'hover:bg-slate-900 text-zinc-300/85'} 
      `}
    >
      {icon}
      <span className='overflow-hidden whitespace-nowrap ml-3'>
        {text}
      </span>
    </a>
  )
}