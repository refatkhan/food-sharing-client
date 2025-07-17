import React from 'react';
import Banner from '../components/Banner';
import AvailableFoods from '../pages/AvailableFoods';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AvailableFoods></AvailableFoods>
        </div>
    );
};

export default Home;