import React from 'react';
import styles from './Modal.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

let ChangeInfoModal = ({ closeModal}) => {
    let { user,color } = useSelector(state => state.userAuth)
    let navigate = useNavigate()

    let navigateHandler = (data)=>{
        closeModal()
        navigate(`/updateinformation`)
    }


    return <div className={styles.changeInfomodal_screen} >
        <div className={styles.buy_modal_con}>
            <div className={styles.top}>

            </div>

            <div className={styles.buy_modal} style={{backgroundColor:color.fadeColor}}>
                <h1 style={{color:color.importantText}}>Change Information</h1>
                <p style={{color:color.normalText}}>To change your info,tap the button below to proceed</p>
                <div className={styles.buy_con} >
                    <button onClick={()=>navigateHandler('updateinfo')} style={{backgroundColor:color.blue,color:color.importantText}}>Continue</button>

                </div>


            </div>

        </div>

    </div>
}

export default ChangeInfoModal