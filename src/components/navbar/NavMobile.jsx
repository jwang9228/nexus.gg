'use client'

import { IoMenu } from 'react-icons/io5';
import { PiListNumbers } from 'react-icons/pi';
import { LuLayoutDashboard } from 'react-icons/lu';
import { AiOutlineAliwangwang } from 'react-icons/ai';
import { FiUserPlus } from 'react-icons/fi';
import { useState } from 'react';

export default function NavMobile({modalStates}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <nav className='absolute z-20'>
      <div className='relative z-30 ml-5 mt-3 mb-1.5'>
        <IoMenu 
          className={`size-8 tablet:size-10
            ${expanded ? 'text-zinc-400' : 'text-slate-900'}`}
          onClick={() => setExpanded(!expanded)}
        /> 
      </div>
      <div className={`absolute top-0 left-0 w-dvw bg-slate-950 
        transition-all ease-in-out overflow-hidden 
        ${expanded ? 'max-h-dvh pt-2 duration-500' : 'max-h-0 pt-0 duration-[350ms]'}`}
      >
        <ul className='flex flex-col ml-5 mt-10 tablet:mt-12 mb-2'>
          <NavbarItemMobile 
            icon={<LuLayoutDashboard size={23} />}
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
        <div className='flex items-center mx-6 my-3 border-t-2 border-zinc-300/70 text-zinc-300/85'>
          <button 
            type='button' 
            className='ml-0.5 mt-2.5 p-1.5 bg-slate-900 '
            onClick={() => {
              modalStates.setInDevModalOpen(true);
              modalStates.setInDevFeature('Sign In');
            }}
          >
            <FiUserPlus size={25} />
          </button>
          <div className='flex flex-col ml-3.5 mt-1.5'>
            <div className='font-semibold'>{'Guest'}</div>
            <div className='text-sm'>{'Logged Out'}</div>
          </div>
        </div>
      </div>
    </nav>
  )
};

function NavbarItemMobile({ icon, text, linkTo, active }) {
  return (
    <a
      href={`${linkTo}`}
      className={`flex flex-1 w-full my-1.5 p-1 
        font-medium tracking-wide transition-colors
        ${active 
          ? 'hover:bg-slate-900 text-indigo-500' 
          : 'hover:bg-slate-900 text-zinc-300/85'}`}
    >
      {icon}
      <span className='overflow-hidden whitespace-nowrap ml-3'>
        {text}
      </span>
    </a>
  )
};