import { useState } from 'react';
import NavSide from '../navbar/NavSide';
import NavMobile from '../navbar/NavMobile';
import Modals from '../utils/modals/Modals';

export default function RootLayout({children}) {
  const [modalState, setModalState] = useState({});

  const clearModalState = () => {
    setModalState({
      'type': undefined, 
      'msg': undefined
    });
  };

  const setModalStateDev = (msg) => {
    setModalState({
      'type': 'dev',
      'msg': msg
    });
  };

  const setModalStateContact = () => {
    setModalState({
      'type': 'contact',
      'msg': undefined
    });
  };

  return (
    <>
      <Modals modalState={modalState} clearModalState={clearModalState} />
      <div className={`flex 
        ${modalState.type
          ? 'pointer-events-none opacity-80' 
          : 'pointer-events-auto opacity-100'
        }`
      }>
        <div className='hidden laptop:flex'>
          <NavSide setModalStateDev={setModalStateDev} />
        </div>
        <div className='laptop:hidden'>
          <NavMobile setModalStateDev={setModalStateDev} />
        </div>
        <div className='flex-1 w-full'>
          <div id='root'>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}