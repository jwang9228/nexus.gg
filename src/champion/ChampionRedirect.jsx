import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ChampionRedirect() {
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;
  const { region, championName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/champions/${region}/${championName}`);
  }, []);

  return (
    <div className='h-dvh shadow-[inset_0_0_0_2000px_rgba(0,0,0,0.25)]'>
      <div 
        style={{'--bg-image-url': `url(${AWS_S3_URL}/general/summoners-rift.jpeg)`}}
        className='absolute size-full bg-cover bg-center bg-fixed bg-[image:var(--bg-image-url)]'
      />
    </div>
  );
};
export default ChampionRedirect;