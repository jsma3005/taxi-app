import React, { useEffect, useState, useContext } from 'react';
import cls from './OrderItem.module.css';
import {fire} from '../../../services/firebase';
import {Link} from 'react-router-dom';
import { FilteredOrderContext } from '../../../contexts/filteredOrder';
import AOS from 'aos';

const OrderItem = () =>{
    const [isEmpty, setIsEmpty] = useState(false);
    const [orders, setOrders] = useState([]);
    const [{fromState, toState, dateState, buttonState}, setOrderedFilter] = useContext(FilteredOrderContext);
    
    useEffect(() =>{
        if(buttonState){
            fire.database().ref('/orders').on('value', res =>{
                let arr = [];
                Object.entries(res.val()).reverse().forEach(item =>{
                    if(item[1].from === fromState && item[1].to === toState && item[1].date === dateState ){
                        arr.push(item);
                    }else{
                        setIsEmpty(true);
                    }
                })
                setOrders(arr);
            })
        }else{
            fire.database().ref('/orders').on('value', res =>{
                setOrders(Object.entries(res.val()).reverse());
            })
        }

        AOS.init({
            duration: 800,
            once: true
        })
        AOS.refresh();
    }, [setOrders, buttonState, fromState, toState, dateState, setOrderedFilter]);

    return(
        <>
            {
                orders.length === 0
                ?
                (
                    <>
                        {
                            isEmpty ? (
                                <h1 className="text-danger text-center">Ничего не найдено!</h1>
                            ) : (
                                <div className="text-center">
                                    <div className={cls.spinner + " spinner-border text-danger"} role="status"></div>
                                </div>
                            )
                        }
                    </>
                ) 
                : 
                orders.map(item =>(
                    <div key={item[0]} className={cls.card}>
                        <Link to={`/order/${item[1].uid}/${item[0]}`} className={cls.link + " btn btn-primary"}>Подробнее...</Link>
                        <div className={cls.top + " row"}>
                            <div className="col-lg-6">
                                <div className={cls.road + " row"}>
                                    <div className={cls.time + " col-lg-4"}>
                                        <img src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/10-512.png" alt="" />
                                        <span>{item[1].time}</span>
                                    </div>
                                    <div className="col-lg-8">
                                        <div className={cls.locationContent + " row"}>
                                            <div className={cls.lineBlock + " col-lg-1"}>
                                                <div className={cls.line}></div>
                                            </div>
                                            <div className={cls.locationBlock + " col-lg-11"}>
                                                <div className={cls.from}>
                                                    <p>{item[1].from}</p>
                                                </div>
                                                <div className={cls.distance}>
                                                    <span>618,0 км</span>
                                                </div>
                                                <div className={cls.to}>
                                                    <p>{item[1].to}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cls.price + " col-lg-6"}>
                                <p>{item[1].price + " сом"}</p>
                            </div>
                        </div>
                        <div className={cls.bottom + " row"}>
                            <div className={cls.date + " col-lg-9"}>
                                <div>
                                    <img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/calendar-512.png" alt="" />
                                    <span>{item[1].date}</span>
                                </div>
                                <div>
                                    <img src="https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/car-512.png" alt="" />
                                    <span>{item[1].carCategory === "Car" ? "Легковая" : "Автобус"}</span>
                                </div>
                            </div>
                            <div className={cls.user + " col-lg-3"}>
                                <img src="https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png" alt="" />
                                <p>{item[1].name}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default OrderItem;