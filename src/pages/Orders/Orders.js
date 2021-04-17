import React, { useEffect, useState } from 'react';
import cls from './Orders.module.css';
import OrderItem from './OrderItem/OrderItem';
import NewOrder from '../../components/NewOrder/NewOrder';
import {fire} from '../../services/firebase';
import Footer from '../Main/Footer/Footer';
import OrderFilter from './OrderFilter/OrderFilter';
import AOS from 'aos';

const Orders = () =>{
    const [user, setUser] = useState(null);
    
    useEffect(() =>{
        fire.auth().onAuthStateChanged(res =>{
            setUser(res);
        })

        AOS.init({
            duration: 1000,
            once: true
        })
        AOS.refresh();
    }, [setUser])

    return(
        <>
            <main className={cls.root}>
                <div className={cls.main_banner}>
                    <h1 data-aos="fade-up" className="display-4 text-center">Найдите подходящего водителя!</h1>
                </div>
                
                <section className={cls.list}>
                    <h1 className="text-center display-4 m-3" data-aos="flip-up" data-aos-offset="100">Список доступных водителей</h1>

                    <OrderFilter />

                    {user !== null && (
                        <div className={cls.form}>
                                <button data-aos="flip-left" className={cls.addOrderBtn + " btn btn-primary"} type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Добавить новый заказ</button>
                            <NewOrder />
                        </div>
                    )}
                    <OrderItem />
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Orders;