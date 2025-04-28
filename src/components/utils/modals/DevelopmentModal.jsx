import Image from 'next/image';
import { IoClose } from 'react-icons/io5';

export default function DevelopmentModal({modalState, clearModalState}) {
  return (
    <div className='flex flex-col px-5 py-3 gap-y-1.5 rounded-lg shadow 
      text-zinc-300/95 bg-slate-950'
    >
      <div className='flex items-center text-base'>
        {modalState.msg}
        <IoClose 
          onClick={() => clearModalState()}
          className='size-6 ml-auto hover:cursor-pointer'
        />
      </div>
      <hr className='my-1.5 border-zinc-500' />
      <div className='flex items-center'>
        <Image 
          src={`${process.env.NEXT_PUBLIC_AWS_S3_URL}/general/scout-approved.webp`} 
          alt=''
          className='size-16' 
          width={64} height={64}
        />
        <div className='flex flex-col px-2 text-lg'>
          {'Feature in development.'}
          <span>{'Please check back later!'}</span>
        </div>
      </div>
    </div>
  )
}