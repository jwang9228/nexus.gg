import { IoClose } from "react-icons/io5";

function DevelopmentModal({inDevFeature, setInDevModalOpen}) {
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;
  return (
    <div className='flex flex-col rounded-lg shadow text-zinc-300/95 bg-slate-950 px-5 py-3 gap-y-1.5'>
      <div className='flex text-base items-center'>
        {inDevFeature}
        <IoClose className='ml-auto size-6 hover:cursor-pointer' onClick={() => setInDevModalOpen(false)}/>
      </div>
      <hr className='border-zinc-500 my-1.5'/>
      <div className='flex items-center'>
        <img src={`${AWS_S3_URL}/general/scout-approved.webp`} className='size-16'/>
        <div className='flex flex-col text-lg px-2'>
          {'In development.'}
          <span>{'Please check back later!'}</span>
        </div>
      </div>
    </div>
  )
}
export default DevelopmentModal;