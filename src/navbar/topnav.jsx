import { IoLanguageSharp } from 'react-icons/io5';
import { AiOutlineMail } from 'react-icons/ai';

function TopNav() {
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;
  const patchVersion = '14.9';
  const [majorVersion, minorVersion] = patchVersion.split('.');
  const patchSite = `https://www.leagueoflegends.com/en-us/news/game-updates/patch-${majorVersion}-${minorVersion}-notes/`;
  return (
    <div className='flex mt-3 tablet:mt-4 mr-4 tablet:mr-5 gap-x-1 z-10'>
      <button type='button' className='rounded-full px-2.5 py-1.5 bg-slate-900'>
        <a href={patchSite} className='text-sm tablet:text-base text-zinc-300' target='_blank' rel='noopener noreferrer'>
          <div className='flex items-center font-[Raleway]'>
            <img src={`${AWS_S3_URL}/general/lol.png`} className='size-[18px] tablet:size-5 mr-1'/>
            {'Patch\u00A0'}
            <span className='mb-0.5'>{patchVersion}</span>
          </div>
        </a>
      </button>
      <div className='flex items-center justify-center'>
        <button type='button' className='rounded-full p-2 text-zinc-300/95 bg-slate-900'>
          <AiOutlineMail className='size-[18px] tablet:size-5'/>
        </button>
      </div>
      <div className='flex items-center justify-center'>
        <button type='button' className='rounded-full p-2 bg-slate-900 text-zinc-300/90'>
          <IoLanguageSharp className='size-[18px] tablet:size-5'/>
        </button>
      </div>
    </div>
  )
}
export default TopNav;