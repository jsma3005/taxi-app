import React from 'react';
import Header from './Header/Header';
import Services from './Services/Services';
import './Main.css';
import HowWorks from './HowWorks/HowWorks';
import FindTaxi from './FindTaxi/FindTaxi';
import About from './About/About';
import Footer from './Footer/Footer';

const Main = () =>{
    return(
        <>
            <Header />
            <main>
                <About />
                <Services />
                <HowWorks />
                <FindTaxi />
            </main>
            <Footer />
        </>
    )
}

export default Main;