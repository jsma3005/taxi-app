import React from 'react';
import cls from './Footer.module.css';
import {Link} from 'react-router-dom';

const Footer = () =>{
    return(
        <div className={cls.root}>
            <h1 className={cls.title}>Created by <span>ENIGMA</span> </h1>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    <Link className={cls.listLink} to="https://www.instagram.com/enigma.develop/"><i className={cls.icon + " fa fa-instagram"} aria-hidden="true"></i></Link>
                </li>
                <li className={cls.listItem}>
                    <Link className={cls.listLink} to="/enigma-facebook"><i className={cls.icon + " fa fa-facebook"} aria-hidden="true"></i></Link>
                </li>
                <li className={cls.listItem}>
                    <Link className={cls.listLink} to="/enigma-whatsapp"><i className={cls.link + " fa fa-whatsapp"} aria-hidden="true"></i></Link>
                </li>
            </ul>
        </div>
    )
}

export default Footer;