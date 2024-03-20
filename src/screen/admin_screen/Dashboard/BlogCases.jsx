import React, { useState } from 'react';
import styles from '../../Home.module.css';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';

import Sidebar from '../../../component/adminscreencomp/sidebar';

import { useSelector } from "react-redux";
import LoadingModal from "../../../component/Modal/LoadingModal";

import { BlogCasesComponent } from '../../../component/adminscreencomp/Home/BlogCases';

import { Error } from '../../../component/common/Error';


const BlogCases_ = ({status}) => {
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
                <Sidebar status='Blog Cases' />
            </div>

            <div className={styles.main}>
                {/*mobile and dashboard headers*/}
                <DashboardDrawer showmenuHandler={showmenuHandler} />
                <DashboardHeader showmenuHandler={showmenuHandler}  title='Blogs' />
                <BlogCasesComponent status={status}/>
            </div>
        </div>
    </>
    )
}

export default BlogCases_