import HomePageHeader from 'Components/HomePage/HomePageHeader';
import HomePageContent from 'Components/HomePage/HomePageContent';
import React from 'react';

const HomePage = () => {
    return(
        <div style = {{background: 'white'}}>
            <HomePageHeader />
            <HomePageContent />
        </div>
    )
}

export default HomePage;