import { IoClose } from 'react-icons/io5';

function DevelopmentModal({inDevFeature, setInDevModalOpen}) {
  const AWS_S3_URL = process.env.NEXT_PUBLIC_AWS_S3_URL;

  return (
    <div className='flex flex-col px-5 py-3 gap-y-1.5 rounded-lg shadow 
      text-zinc-300/95 bg-slate-950'
    >
      <div className='flex items-center text-base'>
        {inDevFeature}
        <IoClose 
          onClick={() => setInDevModalOpen(false)}
          className='size-6 ml-auto hover:cursor-pointer'
        />
      </div>
      <hr className='my-1.5 border-zinc-500' />
      <div className='flex items-center'>
        <img src={`${AWS_S3_URL}/general/scout-approved.webp`} className='size-16' />
        <div className='flex flex-col px-2 text-lg'>
          {'In development.'}
          <span>{'Please check back later!'}</span>
        </div>
      </div>
    </div>
  )
};
export default DevelopmentModal;