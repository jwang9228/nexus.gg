import { PiListNumbers } from 'react-icons/pi';
import { LuLayoutDashboard } from 'react-icons/lu';
import { AiOutlineAliwangwang } from 'react-icons/ai';
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
        <div className='p-4 pb-2 mb-1 flex justify-between items-center'>
          
        </div>
        
        <NavbarContext.Provider value={{expanded}}>
          <ul className='flex-1 px-3'>
            <NavbarItem 
              icon={<LuLayoutDashboard size={25} />}
              text='Home'
              active
            />
            <NavbarItem 
              icon={<PiListNumbers size={25} />}
              text='Tierlist'
            />
            <NavbarItem 
              icon={<AiOutlineAliwangwang size={25} />}
              text='Champions'
            />
          </ul>
        </NavbarContext.Provider>
      </nav>
    </aside>
  )
}
export default Navbar

function NavbarItem({ icon, text, active }) {
  const {expanded} = useContext(NavbarContext);
  return (
    <li className=
    {`relative flex items-center py-2 px-3 my-3
      font-[550] rounded-md cursor-pointer 
      transition-colors 
      ${
        active
          ? 'bg-gradient-to-tr from-indigo-700 to-indigo-500 text-stone-950'
          : 'hover:bg-indigo-900 text-indigo-500'
      }
    `}>
      {icon}
      <span 
        className={`overflow-hidden transition-all ${
          expanded ? 'w-32 ml-3' : 'w-0'
        }`}
      >
        {text}
      </span>
    </li>
  )
}