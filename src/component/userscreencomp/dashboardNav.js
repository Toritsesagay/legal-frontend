import React from 'react'
import styles from './dashboardNav.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";


const DashboardHeader = ({ showmenuHandler, title, openTransferModal, openTradeModal,headerTitle}) => {
    let navigate = useNavigate()
    let { user,color } = useSelector(state => state.userAuth)

    let navigateHandler = (data) => {
        navigate(data)
    }

    return (<div className={styles.dashboardheader} style={{backgroundColor:color.background,boxShadow:color.background && 'none',borderBottom:`1px solid ${color.normalText?color.normalText:'#fff'}`}}>
        <div className={styles.headerleft}>
            <h1 className={styles.name}>Admin</h1>

        
        <h1 className={styles.title} style={{color:color.importantText}}>{!headerTitle?'Dashboard':headerTitle}</h1>

        </div>

        <div className={styles.headerright}>
            <div className={styles.headerrightinner}>

                <div className={styles.menu}>
                    <span className='material-icons ' style={{ color:color.importantText?color.importantText: 'rgb(0,0,0)', backgroundColor:color.fadeColor?color.fadeColor:'transparent', fontSize: '1.8rem' }} onClick={showmenuHandler}>
                        menu
                    </span>

                </div>



                <div className={styles.profileimage}>
                    <span className='material-icons' onClick={() => navigateHandler('/profilesettings')} style={{backgroundColor:color.fadeButtonColor,color:color.importantText}}>
                        person
                    </span>


                </div>

            </div>


        </div>
    </div>)
}




export default DashboardHeader