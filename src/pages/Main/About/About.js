import React, { useEffect } from 'react';
import cls from './About.module.css';
import AOS from 'aos';

const About = () =>{

    useEffect(() =>{
        AOS.init({
            duration: 800,
            once: true
        })
        AOS.refresh();
    }, [])

    return(
        <> 
            <div className={cls.root}>
                <div className="row m-0 p-0">
                    <div className="col-lg-6" data-aos="flip-left">
                        <h1>Коротко о нас</h1>
                        <p className="mt-5">Наша <strike>мечта</strike> цель автоматизировать экосистему такси в нечто большее, чем просто поездка. Ваше удобство - наша работа!</p>
                        <button className="btn btn-light mt-5">Learn More</button>
                    </div>
                    <div className="col-lg-6" data-aos="flip-right">
                        <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_558,h_372/v1586184518/assets/ef/95d634-7cb9-4b27-8de0-79c9680c7077/original/City-4_5.jpg" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}


export default About;