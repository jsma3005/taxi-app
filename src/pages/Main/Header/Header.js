import React, { useEffect, useRef, useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as HiIcons from 'react-icons/hi';
import Car1 from './img/car5.png';
import Car2 from './img/car2.png';
import Carousel from 'react-elastic-carousel';
import './Header.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import AOS from 'aos';

registerLocale('ru', ru);

const Header = () =>{
    const [startDate, setStartDate] = useState(null);
    const carousel = useRef();

    const slides = [
        {id: 1, img: Car2},
        {id: 2, img: Car1}
    ]

    const goto = ({target}) =>{
        carousel.current.goTo(Number(target.value))
    }

    useEffect(() =>{
        AOS.init({
            duration: 800,
            once: true
        })
        AOS.refresh();
    }, [])

    return(
        <section className="main_banner">
            <div className="row m-0 main_inner">
                <div className="col-lg-7 main_left" data-aos="flip-left">
                    <Carousel ref={carousel} pagination={false} showArrows={false} enableSwipe={false}>
                        {slides.map(item => (
                            <div key={item.id}>
                                <img src={item.img} alt="" />
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div className="col-lg-5 main_right">
                    <div className="main_right_content">
                        <h1 data-aos="zoom-in-up">Куда поедем?</h1>
                        <form>
                            <div className="form-group" data-aos="fade-up-right">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Откуда" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                    <span className="input-group-text" id="basic-addon2">
                                        <HiIcons.HiLocationMarker />
                                    </span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group" data-aos="fade-up-left">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Куда" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                    <span className="input-group-text" id="basic-addon2">
                                        <HiIcons.HiLocationMarker />
                                    </span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group" data-aos="fade-up-right">
                                <div className="input-group mb-3">
                                    <div className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2" style={{textAlign: 'left'}}>
                                        <DatePicker placeholderText="Выберите дату" dateFormat="dd/MM/yyyy"  selected={startDate} onChange={date => setStartDate(date)} locale="ru" />
                                    </div>
                                    <div className="input-group-append">
                                        <span className="input-group-text" id="basic-addon2">
                                            <AiIcons.AiTwotoneCalendar />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group" data-aos="fade-up-left">
                                <div className="input-group mb-3">
                                    <select
                                        onChange={goto}
                                    className="custom-select" id="select">
                                        <option value="0" defaultValue>Выберите...</option>
                                        <option value="0">Легковая машина</option>
                                        <option value="1">Автобус</option>
                                    </select>
                                    <div className="input-group-append">
                                    <label className="input-group-text" htmlFor="select">
                                        <AiIcons.AiFillCar/></label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="findBtn btn btn-primary" data-aos="fade-up" data-aos-offset="100">НАЙТИ ТАКСИ</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="skew"></div>
            </div>
        </section>
    )
}

export default Header;