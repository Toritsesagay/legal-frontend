import React, { useEffect, useState } from 'react';
import styles from '../../Home.module.css';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import Sidebar from '../../../component/adminscreencomp/sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import LoadingModal from "../../../component/Modal/LoadingModal";
import { useDispatch } from 'react-redux';
import { AttorneyEditComponent} from '../../../component/adminscreencomp/Home/AttorneysEdit';


import { updateAttorney} from '../../../store/action/userAppStorage';


import { Error } from '../../../component/common/Error';

const AttorneyEdit = ({ status }) => {
    //tradeModal and transfer modal
    let [isError, setIsError] = useState(false)
    let { color } = useSelector(state => state.userAuth)
    let [isLoading, setIsLoading] = useState(false)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let {id} = useParams()


    let showmenuHandler = () => {
        let drawer = document.querySelector('.drawerCon')
        drawer.classList.toggle('showdrawer')
    }



    let updateHandler = async(data)=>{
        setIsLoading(true)
      
        let res = await dispatch(updateAttorney(data))
        
        if(!res.bool){
            setIsError(true)
            setIsLoading(false)
            return
        }

        setIsLoading(false)
        navigate('/admindashboard/attorneys')




    }



    if(isError){
        return <Error/>
    }


    return (<>
        {isLoading && <LoadingModal />}
        <div className={styles.dashboard}>
            <div className={styles.sidebar}>
                <Sidebar status='Cases' />
            </div>

            <div className={styles.main}>
                {/*mobile and dashboard headers*/}
                <DashboardDrawer showmenuHandler={showmenuHandler} />
                <DashboardHeader showmenuHandler={showmenuHandler} title='Home' />
                <AttorneyEditComponent  updateHandler = {updateHandler} />
            </div>
        </div>
    </>
    )
}

export default AttorneyEdit