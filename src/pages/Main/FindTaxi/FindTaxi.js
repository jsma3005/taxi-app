import React, { useEffect } from 'react';
import cls from './FindTaxi.module.css';
import AOS from 'aos';

const FindTaxi = () =>{

    useEffect(() =>{
        AOS.init({
            duration: 800,
            once: true
        })
        AOS.refresh();
    }, [])

    return(
        <>
            <div className={cls.find_taxi}>
                <div className={cls.find_content}>
                    <h1 data-aos="fade-down">App Taxi используют уже более 15000 пользователей</h1>
                    <div className={cls.button + " row"}>
                        <div className="col-lg-6" data-aos="fade-left">
                            <button className="btn btn-outline-light">
                                <img src="https://gett.com/ru/wp-content/uploads/sites/4/2019/11/app_store.svg" alt="Apple" />
                                <span>Apple Store</span>
                            </button>
                        </div>
                        <div className="col-lg-6" data-aos="fade-right">
                            <button className="btn btn-outline-light">
                                <img src="https://gett.com/ru/wp-content/uploads/sites/4/2019/11/google_play_icon.svg" alt="Play Market" />
                                <span>Google play</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FindTaxi;