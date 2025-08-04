import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ActivityComponent from "../components/ActivityComponent";
import DealsSection from '../components/DealsSection';
import FlightDealsCarousel from '../components/FlightDealsCarousel';
import AboutSection from '../components/AboutSection';
import HotelTeaser from './HotelTeaser';
import BaggageSection from '../components/BaggageSection';
import ReviewsSection from '../components/ReviewsSection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // ✅ scroll to top on every load
  }, []);

  return (
    <>
      <HeroSection />
        <ActivityComponent />
        <DealsSection />
        <FlightDealsCarousel />
        <AboutSection />
        <HotelTeaser />
        <BaggageSection />
        <ReviewsSection />
        <NewsletterSection />
        <Footer />




    </>
  );
};

export default HomePage;







