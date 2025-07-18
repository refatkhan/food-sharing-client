import React from 'react';
import Banner from '../components/Banner';
import AvailableFoods from '../pages/AvailableFoods';
import FeaturedFoods from '../components/FeaturedFoods';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedFoods/>
            <AvailableFoods></AvailableFoods>
        </div>
    );
};

export default Home;