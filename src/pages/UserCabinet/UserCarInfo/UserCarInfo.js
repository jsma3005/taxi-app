import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../../contexts/currentUser';
import { fire } from '../../../services/firebase';
import cls from './UserCarInfo.module.css';

const UserInfo = () =>{
    const [userCar, setUserCar] = useState(null);
    const [{currentUser}] = useContext(CurrentUserContext);
    const [editorState, setEditor] = useState(false);

    const [carColor, setCarColor] = useState('');
    const [carYear, setCarYear] = useState('');
    const [carModel, setCarModel] = useState('');

    useEffect(() =>{
        fire.database().ref(`/users/taxiDrivers`).on('value', res =>{
            Object.entries(res.val()).forEach(i =>{
                if(currentUser !== null){
                    if(currentUser.uid === i[1].uid){
                        setUserCar(i[1].car)
                    }
                }
            });
        })

    }, [setUserCar, currentUser])

    const handleEnableEditor = e =>{
        e.preventDefault();

        setEditor(prev => !prev);
    }

    const handleSubmitEdit = e =>{
        e.preventDefault();
        if(currentUser !== null){
            if(carYear !== "" && carModel !== "" && carColor){
                fire.database().ref(`users/taxiDrivers/${currentUser.uid}/car`).set({
                    carYear,
                    carColor,
                    carModel
                }, () =>{
                    alert("Вы успешно поменяли данные!");
                })
            }else{
                alert("Все поля должны быть заполнены");
            }
        }
    }

    return(
        <div className={cls.root}>
            {
                userCar !== null && (
                    <div className="card">
                        <div className="card-body">
                            <div className={cls.carImg}>
                                <img src="https://img.icons8.com/bubbles/2x/car.png" alt="" />
                                <h2 className="text-center">{editorState ? 
                                <input className="form-control" placeholder={userCar.carModel} onChange={e => setCarModel(e.target.value)} value={carModel ||userCar.carModel} /> : userCar.carModel}</h2>
                                <ul className={cls.CarInfoList}>
                                    <li>
                                        <p><b>Год:</b> 
                                            { editorState ? (
                                                <input type="text" placeholder={userCar.carYear} className="form-control ml-5 text-right" onChange={e => setCarYear(e.target.value)} value={carYear || userCar.carYear} />
                                            ) : (
                                                <span>{userCar.carYear}</span>
                                            )}
                                        </p>
                                    </li>
                                    <li>
                                        <p><b>Цвет:</b>
                                        { editorState ? (
                                            <input type="text" placeholder={userCar.carColor} className="form-control ml-5 text-right" onChange={e => setCarColor(e.target.value)} value={carColor ||userCar.carColor} />
                                        ) : (
                                            <span>{userCar.carColor}</span>
                                        )}
                                        </p>
                                    </li>
                                    <li>
                                        <p><b>Количество поездок:</b> <span>22</span></p>
                                    </li>
                                </ul>
                                <div className={cls.line}></div>
                                <button onClick={handleEnableEditor} className="btn btn-info">{editorState ? "Отменить" : "Редактировать" }</button>
                                {
                                    editorState && <button onClick={handleSubmitEdit} className="btn btn-danger ml-3">Подвердить</button>
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UserInfo;