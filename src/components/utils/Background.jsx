export default function Background({children}) {
  const AWS_S3_URL = process.env.NEXT_PUBLIC_AWS_S3_URL;

  return (
    <div className='flex relative overflow-y-auto overflow-x-hidden
      h-dvh shadow-[inset_0_0_0_2000px_rgba(0,0,0,0.25)]'>
			<div 
				style={{'--bg-image-url': `url(${AWS_S3_URL}/general/summoners-rift.jpeg)`}}
				className='absolute size-full z-[-1] bg-cover bg-center bg-fixed bg-[image:var(--bg-image-url)]'
			/>
      <div className='flex relative overflow-y-auto overflow-x-hidden'>
        {children}
      </div>
    </div>
  );
};