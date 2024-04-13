import { IoLanguageSharp } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";

function TopNav() {
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;
  const patchVersion = '14.7';
  const [majorVersion, minorVersion] = patchVersion.split('.');
  const patchSite = `https://www.leagueoflegends.com/en-us/news/game-updates/patch-${majorVersion}-${minorVersion}-notes/`;
  return (
    <div className='flex mt-3 me-3 laptop:mt-4 laptop:me-5'>
      <button type='button' className='rounded-full bg-slate-900 px-3 py-1.5'>
        <a href={patchSite} className='text-sm laptop:text-base text-zinc-300' target='_blank' rel='noopener noreferrer'>
          <div className='flex items-center'>
            <img src={`${AWS_S3_URL}/general/lol.png`} className='h-[18px] laptop:h-[20px] mr-1'/>
            {`Patch ${patchVersion}`}
          </div>
        </a>
      </button>
      <div className='flex items-center justify-center mx-1'>
        <button type='button' className='rounded-full bg-slate-900 text-zinc-300/95 p-2'>
          <AiOutlineMail className='w-[18px] h-[20px] laptop:w-[20px] laptop:h-[22px]'/>
        </button>
      </div>
      <div className='flex items-center justify-center'>
        <button type='button' className='rounded-full bg-slate-900 text-zinc-300/90 p-2'>
          <IoLanguageSharp className='w-[18px] h-[18px] laptop:w-[20px] laptop:h-[20px]'/>
        </button>
      </div>
    </div>
  )
}
export default TopNav;