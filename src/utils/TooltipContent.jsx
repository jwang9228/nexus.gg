import { useState } from 'react';

function TooltipContent({mainContent, tooltipContent}) {
  const [tooltipActive, setTooltipActive] = useState(false);
  return (
    <div 
      tabIndex={0}  
      onFocus={() => setTooltipActive(true)}
      onBlur={() => setTooltipActive(false)} 
      className='flex flex-col relative items-center group'
    > 
      {mainContent}
      <div
        className={`${tooltipActive ? 'flex' : 'hidden'} laptop:hidden group-hover:flex flex-col 
          absolute bottom-0 items-center mb-5 w-64`}
      >
        <span className='relative z-10 p-2 rounded-md shadow-lg bg-black'>
          {tooltipContent}
        </span>
        <div className='size-3 -mt-2 rotate-45 bg-black' />
      </div>
    </div>
  );
};
export default TooltipContent;