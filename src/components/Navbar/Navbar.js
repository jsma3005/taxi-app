import React, { useContext, useEffect, useState } from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';
import logo from './img/logo.png';
import './Navbar.css';
import {fire} from '../../services/firebase';
import * as VscIcons from 'react-icons/vsc';
import * as GiIcons from 'react-icons/gi';
import { CurrentUserContext } from '../../contexts/currentUser';

const Navbar = () =>{
    const [user, setUser] = useState(null);
    const [, setCurrentUserState] = useContext(CurrentUserContext);
    const history = useHistory();

    useEffect(() =>{
        fire.auth().onAuthStateChanged(res =>{
            setUser(res);
            setCurrentUserState({
                isLoading: false,
                isLoggedIn: true,
                currentUser: res
            });
        })
    }, [setUser, setCurrentUserState])

    const signOut = e =>{
        e.preventDefault();
        fire.auth().signOut();
        setCurrentUserState({
            isLoading: false,
            isLoggedIn: false,
            currentUser: null
        })
        history.push('/');
    }

    return(
        <header>
            <nav className="navbar navbar-expand-lg">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">
                        <GiIcons.GiHamburgerMenu />
                    </span>
                </button>
            
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto ml-5">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/">Главная</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/orders">Объявления</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/services">Сервисы</NavLink>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <Link to={user === null ? "/login" : `/user/cabinet`} className="btn btn-outline-success my-2 my-sm-0 userCab" type="submit">{user === null ? "Я водитель!" : "Личный кабинет" }</Link>
                        {
                            user !== null && (
                                <button onClick={signOut} className="btn btn-outline-success ml-2 userCab">
                                    <VscIcons.VscSignOut style={{fontSize: 20}}/>
                                </button>
                            )
                        }
                    </form>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;