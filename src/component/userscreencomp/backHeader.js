import React from 'react'
import styles from './BackHeader.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";



const BackHeader = ({ showmenuHandler, title, openTransferModal, openTradeModal }) => {
    let { user, color } = useSelector(state => state.userAuth)
    let navigate = useNavigate()


    let navigateHandler = (data) => {
        navigate(data)
    }


    return (<div className={styles.dashboardheader} style={{ backgroundColor: color.background, boxShadow: color.background && 'none', borderBottom:`1px solid ${color.normalText?color.normalText:'#fff' }`}}>
        <div className={styles.headerleft}>
            <span className='material-icons' onClick={() => { navigate(-1) }} style={{ color: color.importantText, backgroundColor: color.fadeButtonColor }}>
                arrow_back
            </span>
            <h1 className={styles.title} style={{ color: color.importantText }}>{title}</h1>
        </div>


        <div className={styles.headerright}>
            <div className={styles.headerrightinner}>
                <button onClick={() => openTradeModal()}>Buy & Sell</button>

                <button onClick={() => openTransferModal()} style={{ backgroundColor: color.fadeButtonColor, color: color.importantText }}>Send & Recieve</button>
                {/*
                <span className='material-icons' onClick={() => navigateHandler('/notifications')} style={{backgroundColor:color.fadeButtonColor,color:color.importantText}}>
                    notifications_none
                </span>
*/}
                <div className={styles.notificationContainer}>
                    <span className='material-icons' onClick={() => navigateHandler('/notifications')} style={{ backgroundColor: color.fadeButtonColor, color: color.importantText }}>
                        notifications_none
                    </span>
                    {user.notifications.length > 0 ? <span style={{ width: '5px', height: '5px', borderRadius: '100%', backgroundColor: 'red' }}></span> : <></>}
                </div>

                <span className='material-icons' style={{ backgroundColor: color.fadeButtonColor, color: color.importantText }}>
                    apps
                </span>






                <div className={styles.menu}>
                    <span className='material-icons ' style={{ color: color.importantText ? color.importantText : 'rgb(0,0,0)', backgroundColor: color.background ? color.fadeButtonColor : 'transparent', fontSize: '1.8rem' }} onClick={showmenuHandler}>
                        menu
                    </span>

                </div>




                <div className={styles.profileimage}>
                    <span className='material-icons' onClick={() => navigateHandler('/profilesettings')} style={{ backgroundColor: color.fadeButtonColor, color: color.importantText }} >
                        person
                    </span>

                </div>

            </div>




        </div>

    </div>)
}




export default BackHeader