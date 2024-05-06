import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';
import * as userClient from './user-client';
import backgrounds from './backgrounds.json';

function RegionsSwiper({activeBackground, setActiveBackground}) {
  const [textVisible, setTextVisible] = useState(true);
  const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;

  const handleSwiperMove = async (swiper) => {
    const swiperIndex = swiper.realIndex;
    const prevSwiperIndex = activeBackground.index;
    if (swiperIndex !== prevSwiperIndex) {
      setActiveBackground(backgrounds[swiperIndex]);
    }
    setTextVisible(true);
    await userClient.setActiveBackground(backgrounds[swiperIndex]);
  };

  return (
    <>
      <div 
        className={`
          mb-2 font-[Raleway] font-semibold tracking-widest text-zinc-300/95 text-center laptop:text-lg 
          transition-opacity duration-300 ${textVisible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {activeBackground.name}
      </div>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
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
        className='w-[100px] laptop:w-[130px]'
      >
        {backgrounds.map((background, index) => (
          <SwiperSlide className={`bg-cover bg-center ${background.name === activeBackground.name ? 'blur-none' : 'blur-[0.4px]'}`} key={index}>
            <img src={`${AWS_S3_URL}/regions/crests/${background.background}.png`} className='block'/>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
export default RegionsSwiper;