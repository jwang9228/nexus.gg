import ContactModal from './ContactModal';
import DevelopmentModal from './DevelopmentModal';

function Modals({modalStates}) {
  return (
    <div className='pointer-events-auto'>
      <div className={`absolute z-10 inset-0 flex justify-center items-center px-5
        transition-all duration-300 
        ${modalStates.contactModalOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <ContactModal setContactModalOpen={modalStates.setContactModalOpen} />
      </div>
      <div className={`absolute z-10 inset-0 flex justify-center items-center px-5
        transition-all duration-300 
        ${modalStates.inDevModalOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <DevelopmentModal 
          inDevFeature={modalStates.inDevFeature} 
          setInDevModalOpen={modalStates.setInDevModalOpen} 
        />
      </div>
    </div>
  )
};
export default Modals;