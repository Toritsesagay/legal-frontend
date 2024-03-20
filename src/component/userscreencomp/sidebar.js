import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './sidebar.module.css';
import { useSelector } from "react-redux";


const Sidebar = ({status}) => {
    let navigate = useNavigate()
    let { color } = useSelector(state => state.userAuth)

    
    let menuBackgroundColor = color.fadeColor?'rgba(0,0,255,0.2)':' #382b7d';

    let menutextColor = color.fadeColor?'blue':'#fff';


    let navigateHandler = (data)=>{
        navigate(data)
    }

    const linkData = [
        {
            icon: 'home',
            title: 'Dashboard',
            link:'/dashboard'
        },
        {
            icon: 'image',
            title: 'Profile',
            link:'/dashboard'
        },
        {
            icon: 'notifications',
            title: 'Notifications',
            link:'/dashboard'
        },
        {
            icon: 'credit_card',
            title: 'Billing',
            link:'/dashboard'
        },
        {
            icon: 'settings',
            title: 'Settings',
            link:'/dashboard'
        },
       
        
    ]





    return (<div className={styles.sidebar} style={{backgroundColor:color.background}}>
        <div className={styles.topSection} style={{backgroundColor:color.background}}>
            <h1>omni-x</h1>
            <div className={styles.logoContainer}>
                Logo
            </div>
        </div>

        <div className={styles.middleSection}>
            <ul>
                {linkData.map(data => <li onClick={()=>navigateHandler(data.link)}
                    key={data.title} style={{backgroundColor:status===`${data.title}`?menuBackgroundColor:'' }}><span className='material-icons' style={{color:status===`${data.title}`?menutextColor:''}}>{data.icon}</span>
                    
                    <p style={{color:status===`${data.title}`?menutextColor:color.normalText }} className={styles.listText}>{data.title}</p>
                    <div >
                        {data.title}
                    </div>

                </li>)}

            </ul>
        </div>



        <div className={styles.endSection}>
            <div>
                <span className='material-icons'>
                    add
                </span>
                New Campaign
            </div>
            
        </div>

        


    </div>


    )
}



export default Sidebar