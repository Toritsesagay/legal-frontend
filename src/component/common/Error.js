import React from 'react';
import styles from './Error.module.css';
import { useSelector } from "react-redux";

export const Error = ({tryAgain,}) => {
  let { color } = useSelector(state => state.userAuth)
  return (
    <div className={styles.tradeErrorCon} style={{backgroundColor:color.background}}>
            <img src='../../setting.png' width='300px' height='300px' alt='error-img'/>
            <h1 style={{color:color.importantText}}>We're having connection issues</h1>
            <p style={{color:color.normalText}}>we're looking into it eight now.
                please quit the app and try again. funds are safe
            </p>
            <button onClick={tryAgain} style={{backgroundColor:color.fadeColor,color:color.importantText}}>Try again</button>
            <button onClick={tryAgain} style={{backgroundColor:color.fadeColor,color:color.importantText}}>check status</button>
        
        </div>
  )
}
