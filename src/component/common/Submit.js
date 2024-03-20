import React from 'react'
import styles from './Submit.module.css'

const SubmitBtn = (props) => {
    return <button className={styles.btn_container} style={props.style} onClick={props.onClick?props.onClick:()=>{}}>
        <p className={styles.text} style={{
            fontFamily: 'Poppins',
            color: props.buttonTextColor?props.buttonTextColor:'#fff',
            margin: 'auto',
            display: 'inline',
            fontSize: '1.2rem',
            fontWeight: '900'
        }}>{props.text}</p>
    </button>
}

export default SubmitBtn