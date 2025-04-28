import Image from 'next/image';

export default function Background({children}) {
  return (
    <div className='flex relative overflow-y-auto overflow-x-hidden
      h-dvh shadow-[inset_0_0_0_2000px_rgba(0,0,0,0.25)]'>
			<div className="absolute inset-0 z-[-1]">
        <Image
          src={`${process.env.NEXT_PUBLIC_AWS_S3_URL}/general/summoners-rift.jpeg`}
          alt=''
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          fill priority
        />
      </div>
      <div className='flex relative overflow-y-auto overflow-x-hidden'>
        {children}
      </div>
    </div>
  );
};