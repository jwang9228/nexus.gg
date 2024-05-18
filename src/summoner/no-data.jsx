import NavbarMobile from "../navbar/navbar-mobile";
import TopSearchbar from "../home/top-searchbar";

function NoData({modalStates, searchName, tagline}) {
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;
  return (
    <div className='flex flex-col w-dvw h-dvh'>
      <div className='flex'>
        <div className='laptop:hidden'>
          <NavbarMobile modalStates={modalStates}/>
        </div>
        <TopSearchbar />
      </div>
      <div className='flex grow justify-center items-center'>
        <div className='flex flex-col justify-center items-center rounded-md mx-6 tablet:size-fit
          font-[Raleway] font-medium bg-slate-950'
        >
          <div className='flex flex-col items-center text-xl text-center tablet:text-2xl text-zinc-300/95'>
            <img src={`${AWS_S3_URL}/general/sad-kitten.webp`} className='size-36 tablet:size-40'/>
            <span className='px-1'>{'Oh no! We couldn\'t find summoner:'}</span>
            <span className='break-all mx-6 my-3 font-semibold text-2xl tablet:text-3xl'>{`${searchName}#${tagline}`}</span>
          </div>
          <div className='flex flex-col mt-3 mb-4 text-base tablet:text-lg text-zinc-400'>
            <span className='text-center'>{'Double check that you:'}</span>
            <ul className='flex flex-col list-disc list-inside mx-5'>
              <li>{'Included #[tagline] in your search for custom tags'}</li>
              <li>Selected the correct region</li>
            </ul>
          </div>
          {
          
            /*
          
          {'Still could not find your summoner? Contact us'}
            */
          }
          
        </div>
      </div>
    </div>
  )
}
export default NoData;