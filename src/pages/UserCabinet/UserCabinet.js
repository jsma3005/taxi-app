import React, {useEffect, useState, useContext} from 'react';
import { fire } from '../../services/firebase';
import cls from './UserCabinet.module.css';
import UserInfo from './UserCarInfo/UserCarInfo';
import UserStats from './UserStats/UserStats';
import ErrorPage from '../../components/ErrorPage/ErrorPage';
import { CurrentUserContext } from '../../contexts/currentUser';
import AOS from 'aos';

const UserCabinet = () =>{
    const [userAuthState, setUserAuthState] = useState(true);
    const [user, setUser] = useState(null);
    const [showNumber, setShowNumber] = useState(false);
    const [{currentUser}] = useContext(CurrentUserContext);

    useEffect(() =>{
        fire.database().ref(`/users/taxiDrivers`).on('value', res =>{
            Object.values(res.val()).forEach(i =>{
                if(currentUser !== null){
                    if(currentUser.uid === i.uid){
                        setUserAuthState(true);
                        setUser(i);
                    }
                }else{
                    setUserAuthState(false);
                }
            })
        })

        AOS.init({
            duration: 800,
            once: true
        })
        AOS.refresh();
    }, [setUser, currentUser]);

    const showNumberToggle = e =>{
        e.preventDefault();
        setShowNumber(prev => !prev);
    }

    return(
        <div className={cls.root}> 
            {
                userAuthState ? (
                    <>
                    {
                        user === null ?
                        (
                            <div className={cls.spinner}>
                                <div className={"spinner-border"} role="status"></div>
                            </div>
                        ) :
                        (
                            <div className="row m-0">
                                <div className="col-lg-3" data-aos="flip-right">
                                    <UserStats />
                                </div>
                                <div className="col-lg-6" data-aos="flip-up">
                                    <div className={cls.userInfo + " card"}>
                                        <div className="card-body">
                                            <img src={user.userImg !== "" ? user.userImg : "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"} alt="" />
                                            <h2 className="mt-3">{`${user.username} ${user.lastName}`}</h2>
                                            <ul className={cls.infoList}>
                                                <li>
                                                    <p><b>Email:</b> <span>{user.userEmail}</span></p>
                                                </li>
                                                <li>
                                                    <p><b>Возраст:</b> <span>{user.age}</span></p>
                                                </li>
                                                <li>
                                                    <p><b>Город проживания:</b> <span>{user.town}</span></p>
                                                </li>
                                                <li>
                                                    <p><b>Номер телефона:</b> <button className={showNumber ? "btn btn-dark" : "btn btn-danger"} onClick={showNumberToggle}>{showNumber ? user.phone : "Показать номер"}</button></p>
                                                </li>
                                            </ul>
                                            {
                                                user.aboutUser !== '' && (
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <p><b>О себе:</b> <br />
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap.
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            <div className={cls.line}></div>
                                            <button className="btn btn-info">Редактировать</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3" data-aos="flip-left">
                                    <UserInfo />
                                </div>
                            </div>
                        )
                    }
                </>
                ) : <ErrorPage />
            }
        </div>
    )
}

export default UserCabinet;