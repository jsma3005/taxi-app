import React, {useEffect} from 'react';
import cls from './Services.module.css';
import cln from 'classnames';
import Backup from './img/44.png';  
import Database from './img/66.png';
import Freessl from './img/55.png';
import Protect from './img/33.png';
import Setting from './img/11.png';
import Speed from './img/22.png';
import AOS from 'aos';

const Services = () =>{

    useEffect(() =>{
        AOS.init({
            duration: 800,
            once: true
        })
        AOS.refresh();
    }, [])

    return(
        <section>
            <div className="container services_container">
                <h1 className={cln(cls.title, 'text-center')} data-aos="fade-up">6 причин выбрать App Taxi</h1>
                <div className={cls.services}>
                    <div className={cls.servicesBox}>
                        <div className={cls.box} data-aos="zoom-in-right">
                            <div className={cls.serBox}>
                                <div className={cls.icon}>
                                    <img src={Setting} alt=""  />
                                </div>
                                <h4>Лучшие водители</h4>
                                <p>Наши водители самые опытные и доброжелательные люди, которых выбираете вы.</p>
                            </div>
                        </div>
        
                        <div className={cls.box} data-aos="zoom-in-up">
                            <div className={cls.serBox} > 
                                <div className={cls.icon}>
                                    <img src={Speed} alt=""  />
                                </div>
                                <h4>Настройка поездки</h4>
                                <p>Вам не нравится, что кто-то курит в салоне? Вы можете указать это в анкете и собрать своих единомышленников.</p>
                            </div>
                        </div>
        
                        <div className={cls.box} data-aos="zoom-in-left">
                            <div className={cls.serBox}>
                                <div className={cls.icon}>
                                    <img src={Protect} alt=""  />
                                </div>
                                <h4>Удобные цены</h4>
                                <p>Разъезжайтесь по стране самым комфортным ценам.</p>
                            </div>
                        </div>
        
        
                        <div className={cls.box} data-aos="zoom-in-right">
                            <div className={cls.serBox}>
                                <div className={cls.icon}>
                                    <img src={Backup} alt=""  />
                                </div>
                                <h4>Безопасность</h4>
                                <p>Все ваши поездки будут отображаться в реальном времени в вашей истории.</p>
                            </div>
                        </div>
        
                        <div className={cls.box} data-aos="zoom-in-up">
                            <div className={cls.serBox}>
                                <div className={cls.icon}>
                                    <img src={Freessl} alt="" />
                                </div>
                                <h4>Просто и удобно</h4>
                                <p>Вам больше не нужно приезжать на вокзал и ждать отправку. Договаривайтесь с водителем о месте, времени и наслайждайтесь поездкой.</p>
                            </div>
                        </div>
        
                        <div className={cls.box} data-aos="zoom-in-left">
                            <div className={cls.serBox}>
                                <div className={cls.icon}>
                                    <img src={Database} alt="" />
                                </div>
                                <h4>Сообщество</h4>
                                <p>Будьте в курсе всех новостей и изменений. Нам не безразлично, КТО вас везет!</p>
                            </div>
                        </div>
        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Services;