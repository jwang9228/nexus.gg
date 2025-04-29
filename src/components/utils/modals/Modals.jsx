import DevelopmentModal from './DevelopmentModal';

export default function Modals({modalState, clearModalState}) {
  return (
    <div className='pointer-events-auto'>
      <div className={`absolute z-10 inset-0 flex justify-center items-center px-5
        transition-all duration-300 
        ${modalState.type === 'dev' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`
      }>
        {modalState.type === 'dev' && 
          <DevelopmentModal 
            modalState={modalState}
            clearModalState={clearModalState}
          />
        }
      </div>
    </div>
  )
}