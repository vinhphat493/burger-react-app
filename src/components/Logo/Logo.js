import React from 'react';

import LogoImage from '../../assets/images/burger-logo.png'
import classes from './Logo.css'

const Logo = (props) => {
    return <div className={classes.Logo}><img src={LogoImage} alt=""/></div>;
}
 
export default Logo;