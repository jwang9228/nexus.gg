import ContactModal from "./contact-modal";
import DevelopmentModal from "./development-modal";

function Modals({modalStates}) {
  return (
    <div className='pointer-events-auto'>
      <div className={`absolute inset-0 flex items-center justify-center px-5 z-10
        transition-all duration-300 ${modalStates.contactModalOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <ContactModal setContactModalOpen={modalStates.setContactModalOpen} />
      </div>
      <div className={`absolute inset-0 flex items-center justify-center px-5 z-10
        transition-all duration-300 ${modalStates.inDevModalOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <DevelopmentModal inDevFeature={modalStates.inDevFeature} setInDevModalOpen={modalStates.setInDevModalOpen} />
      </div>
    </div>
  )
}
export default Modals;