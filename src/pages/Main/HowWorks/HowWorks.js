import React, { useEffect } from 'react';
import cls from './HowWorks.module.css';
import cln from 'classnames';
import * as GiIcons from 'react-icons/gi';
import * as IoIcons from 'react-icons/io';
import * as TiIcons from 'react-icons/ti';
import * as RiIcons from 'react-icons/ri';
import AOS from 'aos';

const HowWorks = () =>{

    useEffect(() =>{
        AOS.init({
            duration: 800,
            once: true
        })
        AOS.refresh();
    }, [])

    return(
        <> 
            <div className={cln(cls.how_it_works, "container how_it_works")}>
                <h1 className={cln(cls.title, "text-center")}>Как это работает?</h1>
                <div className="row" data-aos="flip-up">
                    <div className={cln(cls.img_1, "col-lg-12")}>
                        <span className={cls.icons}>
                            <GiIcons.GiClick />
                        </span>
                        <div className={cls.line}></div>
                    </div>
                    <div className={cln(cls.img_2, "col-lg-12")}>
                        <span className={cls.icons}>
                            <IoIcons.IoIosPerson />
                        </span>
                        <div className={cls.line}></div>
                    </div>
                    <div className={cln(cls.img_3, "col-lg-12")}>
                        <span className={cls.icons}>
                            <RiIcons.RiGpsFill/>
                        </span>
                        <div className={cls.line}></div>
                    </div>
                    <div className={cln(cls.img_4, "col-lg-12")}>
                        <span className={cls.icons}>
                            <TiIcons.TiLocationOutline/>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HowWorks;