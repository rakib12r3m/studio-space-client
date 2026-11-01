import AboutSection from '@/components/home/AboutSection';
import Banner from '@/components/home/Banner';
import HowItWorks from '@/components/home/HowItWorks';
import React from 'react';

const page = () => {
  return (
    <div>
      <Banner/>
      <HowItWorks/>
      <AboutSection/>
    </div>
  );
};

export default page;