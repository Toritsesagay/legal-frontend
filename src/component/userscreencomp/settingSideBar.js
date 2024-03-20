import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './sidebar.module.css';
import { useSelector } from "react-redux";


const SettingSidebar = ({status}) => {
    let navigate = useNavigate()
     let { color } = useSelector(state => state.userAuth)

    let navigateHandler = (data)=>{
        navigate(data)
    }

    
    let menuBackgroundColor = color.fadeColor?'rgba(0,0,255,0.2)':''


    let menutextColor = color.fadeColor?'blue':' #382b7d'


    const linkData = [
        {
            icon: 'home',
            title: 'Home',
            link:'/home'
        },
        {
            icon: 'access_time',
            title: 'My asssets',
            link:'/assets'
        },
        {
            icon: 'trending_up',
            title: 'Trade',
            link:'/trade'
        },
        {
            icon: 'toll',
            title: 'Pay',
            link:'/pay'
        },
        {
            icon: 'settings',
            title: 'Settings',
            link:'/profilesettings'
        },
       
        
    ]

    return (<div className={styles.sidebar} style={{backgroundColor:color.background}}>
        <div className={styles.topSection} style={{backgroundColor:color.background}}>
            <h1>coincap</h1>
            <div className={styles.logoContainer}>
                <img src='../../../icon.png' />
            </div>
        </div>

        <div className={styles.middleSection}>
            <ul>
                {linkData.map(data => <li onClick={()=>navigateHandler(data.link)}
                    key={data.title} style={{backgroundColor:status===`${data.title}`?menuBackgroundColor:'' }}><span className='material-icons' style={{color:status===`${data.title}`?menutextColor:'' }}>{data.icon}</span>
                    
                    <p style={{color:status===`${data.title}`?menutextColor:color.normalText }}>{data.title}</p>

                    <div >
                        {data.title}
                    </div>

                </li>)}

            </ul>
        </div>

        <div className={styles.bottomSection} style={{backgroundColor:color.fadeColor}}>
            <div className={styles.imgCon}>
                <img src='../../../coinbase_gift.png' />
            </div>
            <div className={styles.textCon} >
                <h1 style={{color:color.importantText}}>Get $10</h1>
                <p style={{color:color.normalText}}>Invite friends</p>

            </div>
        </div>


    </div>


    )
}

export default SettingSidebar