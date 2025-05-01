import { IoLanguageSharp } from 'react-icons/io5';
import { useState } from 'react';

export default function Languages() {
  const [showLanguages, setShowLanguages] = useState(false);
  const [showRoundedB, setShowRoundedB] = useState(true);
  
  return (
    <div className='relative  text-zinc-300/90'>
      <button 
        type='button' 
        className={`p-2 rounded-t-full ${showRoundedB && 'rounded-b-full'} bg-slate-900 cursor-pointer`}
        onClick={() => setShowLanguages(!showLanguages)}
      >
        <IoLanguageSharp className='size-[1.13rem] tablet:size-5'/>
      </button>
      <div 
        onTransitionStart={() => {showLanguages && setShowRoundedB(false)}}
        onTransitionEnd={() => setShowRoundedB(!showLanguages)}
        className={`absolute left-1/2 transform -translate-x-1/2
        transition-all ease-in-out overflow-hidden 
        ${showLanguages ? 'max-h-dvh duration-500 pt-1 pb-1.5' : 'max-h-0 duration-300 py-0'}
        px-[0.21rem] tablet:px-[0.28rem] rounded-b-full bg-slate-900 text-sm cursor-pointer`
      }>    
        <div className='rounded-full bg-slate-800 px-1 py-0.5'>
          US
        </div>
      </div>
    </div>
  )
}