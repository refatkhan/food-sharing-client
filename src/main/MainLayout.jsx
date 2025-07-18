import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow">
                <Outlet />
            </main>

            <Footer />
        </div>

    );
};

export default MainLayout;