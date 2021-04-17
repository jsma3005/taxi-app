import React, { useEffect, useState } from 'react';
import { fire } from '../../services/firebase';
import cls from './AboutOrder.module.css';
import * as GiIcons from 'react-icons/gi';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { Link } from 'react-router-dom';
import AOS from 'aos';

const AboutOrder = (props) =>{
    const [order, setOrder] = useState([]);
    const [user, setUser] = useState([]);
    const [userCar, setUserCar] = useState([]);
    const [userPrefers, setUserPrefers] = useState([]);
    const matchId = props.match.params.id;
    const matchUid = props.match.params.uid;

    useEffect(() =>{
        fire.database().ref('/orders').on('value', res =>{
            Object.entries(res.val()).forEach(item =>{
                if(item[0] === matchId){
                    setOrder(item[1]);
                    setUserPrefers(item[1].userPrefers)
                }
            });
        })

        fire.database().ref('/users').on('value', res =>{
            Object.entries(res.val().taxiDrivers).forEach(item =>{
                if(item[0] === matchUid){
                    setUser(item[1]);
                    setUserCar(item[1].car);
                }
            });
        })

        AOS.init({
            duration: 800,
            once: true
        })
        AOS.refresh();
    }, [setOrder, matchId, matchUid])

    return(
        <>
            {
            order.length === 0 && user.length === 0 ? (
                <div className={cls.spinnerContainer}>
                    <div className={cls.spinner + " spinner-border text-danger"} role="status"></div>
                </div>
            ) : (
                <div className={cls.root}>
                    <div>
                        <h1 className="text-center mb-5" data-aos="fade-down">{order.date}</h1>
                        <div className={cls.distance + " row mr-0 ml-0 mb-5 text-center"} data-aos="flip-down">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <h1 className={cls.from + " bg-danger"}>{order.from}</h1>
                                <div className={cls.line}>
                                    <span>616 км</span>
                                </div>
                            </div>  
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <h1 className={cls.to + " bg-success"}>{order.to}</h1>
                            </div>
                        </div>
                        <div className="text-center" data-aos="fade-right">
                            <h1 className={cls.price}>
                                {order.price + " сом"}
                            </h1>
                        </div>
                        <div className={cls.info + " row m-0"} data-aos="fade-up-right">
                            <div className={cls.userInfo + " col-lg-6 col-md-6"}>
                                <div className={cls.userInitial}>
                                    <img src="https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png" alt="Avatar" />
                                    <h4>{`${user.username} ${user.lastName}`}</h4>
                                </div>
                                <div className={cls.about}>
                                    <ul>
                                        <li> <GiIcons.GiRank1/> <span>Ранг:</span> Шухер</li>
                                        <li> <AiIcons.AiOutlineCar/> <span>Стаж:</span> {userCar.driverStage}</li>
                                        <li> <BsIcons.BsStar /> <span>Средний балл:</span> 7.7</li>
                                        <li> <RiIcons.RiFeedbackLine/>  <span>Отзывы:</span> <Link to={`/user/feed/${matchUid}`}>Прочитать отзывы</Link> </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={cls.carInfo + " col-lg-6 col-md-6"}>
                                <div className={cls.carImg}>
                                    <img src="https://img.icons8.com/bubbles/2x/car.png" alt="Car" />
                                </div>
                                <div className={cls.carAbout}>
                                    <ul>
                                        <li> <IoIcons.IoLogoModelS /> <span>Марка и модель машины:</span> {userCar.carModel}</li>
                                        <li> <AiIcons.AiOutlineNumber/> <span>Год машины:</span> {userCar.carYear}</li>
                                        <li> <IoIcons.IoIosColorFilter /> <span>Цвет машины:</span>  {userCar.carColor} </li>
                                        <li> <BsIcons.BsArrowCounterclockwise /> <span>Количество успешных поездок:</span>  22 </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={cls.prefers}>
                            <h2 className='text-center'>Предпочтения водителя:</h2>
                            <div className={cls.card + " card"} data-aos="fade-up">
                                <ul>
                                    <li>{userPrefers.animal === "animalNo" ? "Не предпочитает подвозить животных" : "Может подвозить с животными"}
                                    </li>
                                    <li>{userPrefers.smoking === "smokingNo" ? "Не предпочитает курить во время поездки" : "Предпочитает курить во время поездки"}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {
                            order.extraInfo !== "" && (
                                <div className={cls.extraInfo}>
                                    <h2 className='text-center'>Дополнительний комментарий от водителя:</h2>
                                    <div className={cls.card + " card"}>
                                        <div className="card-body">
                                            <p>{order.extraInfo}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <div className={cls.connect} data-aos="fade-up">
                            <h2 className='text-center'>Связаться с водителем:</h2>
                            <div className={cls.card + " card"} data-aos="fade-up">
                                <div className="card-body">
                                    <a className="btn btn-info" href="tel:996704013389">Позвоить</a>
                                    <a rel="noreferrer" className="btn btn-success" target="_blank" href="https://wapp.click/996704013389" title="WhatsApp: 996704013389">Написать по WhatsApp</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
        
    )
}

export default AboutOrder;