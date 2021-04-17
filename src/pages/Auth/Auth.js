import React, { useContext, useState } from 'react';
import cls from './Auth.module.css';
import logo from '../../components/Navbar/img/logo.png';
import {Link} from 'react-router-dom';
import {fire} from '../../services/firebase';
import DatePicker from 'react-datepicker';
import { CurrentUserContext } from '../../contexts/currentUser';

const Auth = props =>{
    const [userEmail, setUserEmail] = useState('');
    const [userPass, setUserPass] = useState('');
    const [userName, setUserName] = useState('');
    const [lastName, setLastName] = useState('');

    const [town, setTown] = useState('');
    const [carBrand, setCarBrand] = useState('');
    const [carYear, setCarYear] = useState(null);
    const [carColor, setCarColor] = useState('');
    const [driverStage, setDriverStage] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState(0);
    const isLogin = props.match.path === "/login";
    const pageTitle = isLogin ? "Введите ниже вашу электронную почту и пароль для того, чтобы пользоваться нашими сервисами в полной мере." : "Пройдите бесплатную регистрацию для создания нового пользователя.";
    const linkTitle = isLogin ? "Создать аккаунт" : "Авторизоваться";
    const linkDescription = isLogin ? "Нет аккаунта?" : "Есть аккаунт?";
    const submitTitle = isLogin ? "Войти" : "Создать аккаунт";
    const authLink = isLogin ? "/register" : "/login";
    const [, setCurrentUserState] = useContext(CurrentUserContext);

    const signIn = e =>{
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(userEmail, userPass).then(res =>{
            setCurrentUserState({
                isLoading: false,
                isLoggedIn: true,
                currentUser: res.user
            });
        }).catch(err =>{
            console.log(err);
            alert(err.message);
        })
        setUserEmail('');
        setUserPass('');
        props.history.push('/');
    }

    const signUp = e =>{
        e.preventDefault();
        if(userName !== "" && lastName !== "" && town !== "" && carBrand !== '' && carColor !== "" && carYear !== null && driverStage !== "" && phone !== "" && age > 17 && age < 90){
            fire.auth().createUserWithEmailAndPassword(userEmail, userPass).then(res =>{
                const user = res.user;
                user.updateProfile({
                    displayName: userName
                })
                setUserName('');
                setLastName('');
                setUserEmail('');
                setUserPass('');
                setTown('');
                setCarBrand('');
                setCarColor('');
                setCarYear(null);
                setDriverStage('');
                setPhone('');
                setAge(0);

                // Adding user to database
                fire.database().ref(`/users/taxiDrivers/${res.user.uid}`).set({
                    uid: res.user.uid,
                    username: userName,
                    lastName,
                    phone,
                    age,
                    userImg: '',
                    userEmail,
                    aboutUser: '',
                    town,
                    car: {
                        carModel: carBrand,
                        carYear: carYear.getFullYear(),
                        carColor,
                        driverStage
                    }
                });

                props.history.push('/login');
            }).catch(err => {
                console.log(err);
                alert(err.message);
            })
        }else{
            alert("Не все поля заполнены!");
        }
    }

    // console.log(carYear.getFullYear());

    return(
        <main className={cls.main}>
            <div className={cls.card + " card p-5"}>
                <img src={logo} alt="" />

                <p className={cls.title}>{pageTitle}</p>

                <form onSubmit={isLogin ? signIn : signUp}>
                    {
                        !isLogin && (
                            <>
                                <div className={cls.formGroup + " form-group"}>
                                    <input type="text" placeholder="Имя" className={cls.formControl + " form-control"} onChange={e => setUserName(e.target.value)} value={userName || ""} />
                                </div>

                                <div className={cls.formGroup + " form-group"}>
                                    <input type="text" placeholder="Фамилия" className={cls.formControl + " form-control"} onChange={e => setLastName(e.target.value)} value={lastName || ""} />
                                </div>

                                <div className={cls.formGroup + " form-group"}>
                                    <input type="text" placeholder="Номер телефона..." className={cls.formControl + " form-control"} onChange={e => setPhone(e.target.value)} value={phone || ""} />
                                </div>

                                <div className={cls.formGroup + " form-group"}>
                                    <input type="number" placeholder="Возраст..." className={cls.formControl + " form-control"} onChange={e => setAge(e.target.value)} value={age || ""} />
                                </div>

                                <div className={cls.formGroup + " form-group"}>
                                    <select className="form-control" onChange={e => setTown(e.target.value)} value={town || ''}>
                                        <option defaultValue>Где вы проживаете?</option>
                                        <option value="Bishkek">Бишкек</option>
                                        <option value="Osh">Ош</option>
                                    </select>
                                </div>

                                <div className={cls.formGroup + " form-group"}>
                                    <input type="text" placeholder="Марка и модель машины" className={cls.formControl + " form-control"} onChange={e => setCarBrand(e.target.value)} value={carBrand || ''} />
                                </div>

                                <div className={cls.formGroup + " form-group"}>
                                    <div className="form-control">
                                        <DatePicker
                                            placeholderText="Выберите год машины"
                                            selected={carYear || null}
                                            onChange={date => setCarYear(date)}
                                            showYearPicker
                                            dateFormat="yyyy"
                                        />
                                    </div>
                                </div>
                                
                                <div className={cls.formGroup + " form-group"}>
                                    <select className="form-control" onChange={e => setCarColor(e.target.value)} value={carColor || ''}>
                                        <option defaultValue>Выберите цвет машины</option>
                                        <option value="Белый">Белый</option>
                                        <option value="Черный">Черный</option>
                                        <option value="Красный">Красный</option>
                                        <option value="Зеленый">Зеленый</option>
                                        <option value="Синий">Синий</option>
                                        <option value="Золотой">Золотой</option>
                                        <option value="Оранжевый">Оранжевый</option>
                                        <option value="Фиолетовый">Фиолетовый</option>
                                    </select>
                                </div>

                                <div className={cls.formGroup + " form-group"}>
                                    <select className="form-control" onChange={e => setDriverStage(e.target.value)} value={driverStage || ''}>
                                        <option defaultValue>Выберите стаж работы</option>
                                        <option value="От 1 до 3">от 1 до 3 лет</option>
                                        <option value="От 3 до 5">от 3 до 5 лет</option>
                                        <option value="От 5 до 7">от 5 до 7 лет</option>
                                        <option value="От 7 до 10">от 7 до 10 лет</option>
                                        <option value="От 10 до 15">от 10 до 15 лет</option>
                                        <option value="От 15">от 15 лет</option>
                                    </select>
                                </div>
                            </>
                        )
                    }

                    <div className={cls.formGroup + " form-group"}>
                        <input type="email" placeholder="Электронная почта" className={cls.formControl + " form-control"} 
                            onChange={e => setUserEmail(e.target.value)}
                            value={userEmail || ""}
                        />
                    </div>
                    <div className={cls.formGroup + " form-group"}>
                        <input type="password" placeholder="Пароль" className={cls.formControl + " form-control"} 
                            onChange={e => setUserPass(e.target.value)}
                            value={userPass || ""}
                        />
                    </div>
                    <div className={cls.auth}>
                        <p>{linkDescription} &nbsp;
                            <strong>
                                <Link to={authLink}>{linkTitle}</Link>
                            </strong> 
                        </p>
                    </div>
                    <div>
                        <button className={cls.btn + " btn btn-success"}>{submitTitle}</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Auth;