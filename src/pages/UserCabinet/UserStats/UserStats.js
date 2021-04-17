import React, { useContext } from 'react';
import cls from './UserStats.module.css';
import * as ImIcons from 'react-icons/im';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../../contexts/currentUser';

const UserStats = () =>{
    const [{currentUser}] = useContext(CurrentUserContext);

    return (
        <div className={cls.root}>
            <div className="card">
                <div className="card-body">
                    <div className={cls.statsInfo}>
                        <ImIcons.ImStatsBars className={cls.icon} />
                        <h3 className="text-center mt-3">Статистика:</h3>
                        <ul className={cls.statsList}>
                            <li>
                                <p><b>Ранг:</b> <span>Шухер</span></p>
                            </li>
                            <li>
                                <p><b>Стаж:</b> <span>От 1 до 3 лет</span></p>
                            </li>
                            <li>
                                <p><b>Средний балл:</b> <span>7.7</span></p>
                            </li>
                            <li>
                                <p><b>Отзывы:</b> <Link to={currentUser !== null ? `/user/feed/${currentUser.uid}` : '/'}>Прочитать отзывы</Link></p>
                            </li>
                            <li>
                                <p><b>Объявления:</b> <Link to={currentUser !== null ? `/user/orders/${currentUser.uid}` : '/'}>Посмотреть</Link></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserStats;