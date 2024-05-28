import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';
import backgrounds from '../metadata/backgrounds.json';
import * as userClient from './userClient';

function RegionsSwiper({activeBackground, setActiveBackground}) {
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;
  const [textVisible, setTextVisible] = useState(true);

  const handleSwiperMove = async (swiper) => {
    const swiperIndex = swiper.realIndex;
    const prevSwiperIndex = activeBackground.index;
    const currentBackground = backgrounds[swiperIndex];
    if (swiperIndex !== prevSwiperIndex) setActiveBackground(currentBackground);
    setTextVisible(true);
    await userClient.setActiveBackground(currentBackground);
  };

  return (
    <>
      <div 
        className={`mb-2 font-[Raleway] font-semibold tracking-widest 
          text-zinc-300/95 text-center tablet:text-lg 
          transition-opacity duration-300 ${textVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {activeBackground.name}
      </div>
      <Swiper
        effect={'coverflow'}
        grabCursor
        centeredSlides
        loop
        slidesPerView={2.7}
        spaceBetween={12}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false
        }}
        modules={[EffectCoverflow]}
        initialSlide={activeBackground.index}
        onTouchStart={() => setTextVisible(false)}
        onTouchEnd={handleSwiperMove}
        className='w-[100px] tablet:w-[130px]'
      >
        {backgrounds.map(background => (
          <SwiperSlide 
            key={activeBackground.index}
            className={`bg-cover bg-center 
              ${background.name === activeBackground.name ? 'blur-none' : 'blur-[0.4px]'}`}
            >
            <img 
              src={`${AWS_S3_URL}/regions/crests/${background.background}.png`} 
              className='block'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
};
export default RegionsSwiper;