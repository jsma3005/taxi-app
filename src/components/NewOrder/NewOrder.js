import React, {useEffect, useState, useRef} from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import {fire} from '../../services/firebase';
import cls from './NewOrder.module.css';
import {cities} from '../../utils/cities';

registerLocale('ru', ru);

const NewOrder = () =>{
    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [price, setPrice] = useState('');
    const [car, setCar] = useState('');
    const [name, setName] = useState('');
    const [userUid, setUserUid] = useState('');
    const [animal, setAnimal] = useState('');
    const [smoking, setSmoking] = useState('');
    const [comment, setComment] = useState('');

    const [fromOptions, setFromOptions] = useState([]);
    const fromUlRef = useRef();
    const fromInputRef = useRef();

    const [toOptions, setToOptions] = useState([]);
    const toUlRef = useRef();
    const toInputRef = useRef();

    useEffect(() =>{
        const container = document.querySelector('#collapseExample');
        fire.auth().onAuthStateChanged(res => {
            setName(res.displayName);
            setUserUid(res.uid);
        })

        fromInputRef.current.addEventListener('click', e =>{
            e.stopPropagation();
            fromUlRef.current.style.display = "flex";
            onFromInputChange(e);
        })

        fromInputRef.current.addEventListener('keyup', e =>{
            e.stopPropagation();
            if(e.keyCode === 27){
                fromUlRef.current.style.display = "none";
            }
        })
        
        toInputRef.current.addEventListener('click', e =>{
            e.stopPropagation();
            toUlRef.current.style.display = "flex";
            onToInputChange(e);
        })

        toInputRef.current.addEventListener('keyup', e =>{
            e.stopPropagation();
            if(e.keyCode === 27){
                toUlRef.current.style.display = "none";
            }
        })

        container.addEventListener('click', () =>{
            fromUlRef.current.style.display = "none";
            toUlRef.current.style.display = "none";
        })

        fromUlRef.current.style.display = "none";
        toUlRef.current.style.display = "none";
    }, [setName])

    const addOrder = (e) =>{
        e.preventDefault();
        if(from !== "" && to !== "" && price !== "" && car !== "" && startTime !== null & startDate !== null && animal !== "" && smoking !== "" ){
            fire.database().ref(`/orders/`).push({
                uid: userUid,
                name,
                from,
                to,
                price,
                extraInfo: comment || '',
                date: `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}`,
                time: `${startTime.getHours()}:${startTime.getMinutes() === 0 ? startTime.getMinutes() + "0" : startTime.getMinutes()}`,
                carCategory: car,
                userPrefers: {
                    smoking,
                    animal
                }
            }).then(() =>{
                setFrom('');
                setTo('');
                setPrice('');
                setAnimal('');
                setSmoking('');
                setComment('');

                let container = document.querySelector("#collapseExample");
                container.classList.remove('show');
            })
        }else{
            alert("Заполните все поля!");
        }
    }

    const onFromInputChange = e =>{
        setFrom(e.target.value)
        setFromOptions(cities.filter(option => option.city.includes(e.target.value)))
    }

    const onToInputChange = e =>{
        setTo(e.target.value);
        setToOptions(cities.filter(option => option.city.includes(e.target.value)))
    }
  
    return(
        <div className="container collapse mt-3" id="collapseExample" style={{width: '50%'}}>
            <div className="card p-5">
                <form onSubmit={addOrder}>
                    <div className={cls.formGroup + " form-group"}>
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
                    <div className={cls.formGroup + " form-group"}>
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
                    <div className="form-group">
                        <div className="form-control">
                            <DatePicker dateFormat="dd/MM/yyyy" selected={startDate} onChange={date => setStartDate(date)} locale="ru" placeholderText="Выберите дату" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-control">
                            <DatePicker
                                placeholderText="Выберите время"
                                locale="ru"
                                selected={startTime}
                                onChange={time => setStartTime(time)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Время"
                                dateFormat="hh:mm"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder="Цена" type="number" onChange={e => setPrice(e.target.value)} value={price || ""} />
                    </div>
                    <div className="form-group">
                        <select className="custom-select" onChange={e => setCar(e.target.value)} value={car || ''}>
                            <option defaultValue>Выберите категорию машины...</option>
                            <option value="Car">Легковая машина</option>
                            <option value="Bus">Автобус</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <select className="custom-select" onChange={e => setAnimal(e.target.value)} value={animal || ''}>
                            <option defaultValue>Предпочитаете ли вы животных?</option>
                            <option value="animalYes">Да</option>
                            <option value="animalNo">Нет</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <select className="custom-select" onChange={e => setSmoking(e.target.value)} value={smoking || ''}>
                            <option defaultValue>Вы курите?</option>
                            <option value="smokingYes">Да</option>
                            <option value="smokingNo">Нет</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder="Дополнительный комментарий (если есть)" type="text" onChange={e => setComment(e.target.value)} value={comment || ""} />
                    </div>
                    <div className="submit">
                        <button className="btn btn-success">Добавить</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewOrder;