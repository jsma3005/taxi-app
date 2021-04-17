import React, { useRef, useState, useEffect, useContext } from 'react';
import cls from './OrderFilter.module.css'
import {cities} from '../../../utils/cities';
import ru from 'date-fns/locale/ru';
import DatePicker, { registerLocale } from 'react-datepicker';
import {FilteredOrderContext} from '../../../contexts/filteredOrder';
import AOS from 'aos';

registerLocale('ru', ru);

const OrderFilter = () =>{
    const [from, setFrom] = useState('');
    const [fromOptions, setFromOptions] = useState([]);
    const [to, setTo] = useState('');
    const [toOptions, setToOptions] = useState([]);
    const [startDate, setStartDate] = useState(null);

    const [,setOrderedFilter] = useContext(FilteredOrderContext);

    const fromInputRef = useRef();
    const fromUlRef = useRef();

    const toInputRef = useRef();
    const toUlRef = useRef();

    const onFromInputChange = e =>{
        setFrom(e.target.value)
        setFromOptions(cities.filter(option => option.city.includes(e.target.value)))
    }

    const onToInputChange = e =>{
        setTo(e.target.value);
        setToOptions(cities.filter(option => option.city.includes(e.target.value)))
    }

    const onHandleSetFilter = e =>{
        e.preventDefault();

        if(from !== "" && to !== "" && startDate !== null){
            setOrderedFilter({
                fromState: from,
                toState: to,
                dateState: `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}`,
                buttonState: true
            })
        }
    }

    useEffect(() =>{
        const container = document.querySelector('#containerOrderFilter');

        fromInputRef.current.addEventListener('click', e =>{
            e.stopPropagation();
            fromUlRef.current.style.display = "flex";
            onFromInputChange(e);
        })

        toInputRef.current.addEventListener('click', e =>{
            e.stopPropagation();
            toUlRef.current.style.display = "flex";
            onToInputChange(e);
        })

        window.addEventListener('keyup', e =>{
            if(e.keyCode === 27){
                toUlRef.current.style.display = "none";
                fromUlRef.current.style.display = "none";
            }
        })

        container.addEventListener('click', () =>{
            fromUlRef.current.style.display = "none";
            toUlRef.current.style.display = "none";
        })

        fromUlRef.current.style.display = "none";
        toUlRef.current.style.display = "none";

        AOS.init({
            duration: 1000,
            once: true
        })
        AOS.refresh();
    }, [])

    return (
        <div className={cls.root} data-aos="zoom-in" id="containerOrderFilter">
            <div className="card">
                <div className="card-body">
                    <h5 className="text-center mb-3">Найдите подходящего таксиста</h5>
                    <form className={cls.form}>
                        <div className="row m-0">
                            <div className={cls.formGroup + " col"}>
                                <input ref={fromInputRef} className="form-control" placeholder="Откуда" type="text" onChange={onFromInputChange} value={from || ""} />
                                <ul className={cls.listGroup + " list-group"} ref={fromUlRef}>
                                    {
                                        fromOptions.map(item => (
                                            <button key={item.id} type="button" className={cls.listItem + " list-group-item list-group-item-action"} onClick={() =>{
                                                fromInputRef.current.value = item.city;
                                                setFrom(fromInputRef.current.value);
                                            }}>
                                                {item.city}
                                            </button>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className={cls.formGroup + " col"}>
                                <input ref={toInputRef} className="form-control" placeholder="Куда" type="text" onChange={onToInputChange} value={to || ""} />
                                <ul className={cls.listGroup + " list-group"} ref={toUlRef}>
                                    {
                                        toOptions.map(item => (
                                            <button key={item.id} type="button" className={cls.listItem + " list-group-item list-group-item-action"} onClick={() =>{
                                                toInputRef.current.value = item.city;
                                                setTo(toInputRef.current.value)
                                            }}>
                                                {item.city}
                                            </button>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="col">
                                <div className="form-control">
                                    <DatePicker dateFormat="dd/MM/yyyy" selected={startDate} onChange={date => setStartDate(date)} locale="ru" placeholderText="Выберите дату" />
                                </div>
                            </div>
                        </div>
                        <div className={cls.buttonContainer}>
                            <button onClick={onHandleSetFilter} className="btn btn-danger">Найти</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default OrderFilter;