import { useParams } from 'react-router-dom';
import ChampionData from './ChampionData';
import champions from '../metadata/champion.json';

function Champion({modalStates}) {
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;
  const { championName } = useParams();
  const championData = Object.values(champions.data).find(champion => champion.name === championName || champion.id === championName);

  return (
    <div className='flex relative 
			overflow-y-auto overflow-x-hidden h-dvh shadow-[inset_0_0_0_2000px_rgba(0,0,0,0.25)]'
		>
			<div 
				style={{'--bg-image-url': `url(${AWS_S3_URL}/general/summoners-rift.jpeg)`}}
				className='absolute size-full z-[-1] 
					bg-cover bg-center bg-fixed bg-[image:var(--bg-image-url)]'
			/>
      <div className='flex relative overflow-y-auto overflow-x-hidden'>
        <ChampionData modalStates={modalStates} champion={championData} />
      </div>
    </div>
  )
}
export default Champion;