import React from 'react';
import Banner from '../components/Banner';
import AvailableFoods from '../pages/AvailableFoods';
import FeaturedFoods from '../components/FeaturedFoods';
import AllFood from '../components/AllFood';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AllFood/>
            <FeaturedFoods/>
            <AvailableFoods></AvailableFoods>
        </div>
    );
};

export default Home;