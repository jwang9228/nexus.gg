import { IoClose } from 'react-icons/io5';

function ContactModal({setContactModalOpen}) {
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;

  return (
    <div className='flex flex-col px-5 py-3 gap-y-1.5 rounded-lg shadow 
      text-zinc-300/95 bg-slate-950'
    >
      <div className='flex items-center text-base '>
        {'Questions, bugs, feedback?'}
        <IoClose 
          onClick={() => setContactModalOpen(false)}
          className='size-6 ml-auto hover:cursor-pointer'
        />
      </div>
      <hr className='my-1.5 border-zinc-500' />
      <div className='flex items-center'>
        <img src={`${AWS_S3_URL}/general/blitz-question.webp`} className='size-16' />
        <div className='flex flex-col px-2 text-lg'>
          {'Contact at:'} 
          <a 
            href='mailto:diverge.gg@gmail.com' 
            className='text-sky-500 hover:underline'
          >
            {'diverge.gg@gmail.com'}
          </a>
        </div>
      </div>
    </div>
  )
};
export default ContactModal;