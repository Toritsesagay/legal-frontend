import React, { useState } from 'react';
import styles from '../../Home.module.css';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import Sidebar from '../../../component/adminscreencomp/sidebar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import LoadingModal from "../../../component/Modal/LoadingModal";


import { BlogsComponent } from '../../../component/adminscreencomp/Home/Blogs';

import { Error } from '../../../component/common/Error';

const Blogs_ = ({status}) => {
    //tradeModal and transfer modal
    let [isOpenTradeModal, setIsOpenTradeModal] = useState(false)
    let [isOpenTransferModal, setIsOpenTransferModal] = useState(false)
    let { color } = useSelector(state => state.userAuth)
    let [isLoading, setIsLoading] = useState(false)
    let [isError,setIsError] = useState(false)



    let showmenuHandler = () => {
        let drawer = document.querySelector('.drawerCon')
        drawer.classList.toggle('showdrawer')
    }


    

    if(isError){
        return <Error/>
    }


    return (<>
        {isLoading && <LoadingModal />}
        <div className={styles.dashboard}>
            <div className={styles.sidebar}>
                <Sidebar status='Blogs' />
            </div>

            <div className={styles.main}>
                {/*mobile and dashboard headers*/}
                <DashboardDrawer showmenuHandler={showmenuHandler} />
                <DashboardHeader showmenuHandler={showmenuHandler}  title='Blogs' />
                <BlogsComponent status={status}/>
            </div>
        </div>
    </>
    )
}

export default Blogs_ 