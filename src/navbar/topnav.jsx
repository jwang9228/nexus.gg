import { IoLanguageSharp } from 'react-icons/io5';
import { AiOutlineMail } from 'react-icons/ai';

function TopNav({modalStates}) {
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;
  const patchVersion = '25.08';
  const [majorVersion, minorVersion] = patchVersion.split('.');
  const patchSite = `https://www.leagueoflegends.com/en-us/news/game-updates/patch-${majorVersion}-${minorVersion}-notes/`;

  return (
    <div className='flex z-10 mt-3 tablet:mt-4 mr-4 tablet:mr-5 gap-x-1'>
      <button 
        type='button' 
        className='px-2.5 py-1.5 rounded-full bg-slate-900'
      >
        <a 
          href={patchSite} 
          target='_blank' 
          rel='noopener noreferrer'
          className='text-sm tablet:text-base text-zinc-300'
        >
          <div className='flex items-center font-[Raleway]'>
            <img src={`${AWS_S3_URL}/general/lol.png`} className='size-[1.13rem] tablet:size-5 mr-1'/>
            {'Patch\u00A0'}
            <span className='mb-0.5'>{patchVersion}</span>
          </div>
        </a>
      </button>
      <button 
        type='button' 
        className='p-2 rounded-full bg-slate-900 text-zinc-300/95' 
        onClick={() => modalStates.setContactModalOpen(true)}
      >
        <AiOutlineMail className='size-[1.13rem] tablet:size-5'/>
      </button>
      <button 
        type='button' 
        className='p-2 rounded-full bg-slate-900 text-zinc-300/90'
        onClick={() => {
          modalStates.setInDevModalOpen(true);
          modalStates.setInDevFeature('Language Select');
        }}
      >
        <IoLanguageSharp className='size-[1.13rem] tablet:size-5'/>
      </button>
    </div>
  )
};
export default TopNav;