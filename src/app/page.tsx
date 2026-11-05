import AboutSection from '@/components/home/AboutSection';
import Banner from '@/components/home/Banner';
import FeaturedStudios from '@/components/home/FeaturedStudios';
import HowItWorks from '@/components/home/HowItWorks';
import React from 'react';
import StudioCategories from '@/components/home/StudioCategories';

const page = () => {
  return (
    <div>
      <Banner/>
      <FeaturedStudios />
      <StudioCategories/>
      <HowItWorks/>
      <AboutSection/>
    </div>
  );
};

export default page;