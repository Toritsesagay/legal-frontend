import React, { useEffect, useState } from 'react';
import styles from '../../Home.module.css';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import Sidebar from '../../../component/adminscreencomp/sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import LoadingModal from "../../../component/Modal/LoadingModal";
import { useDispatch } from 'react-redux';
import { AdminCaseEditComponent} from '../../../component/adminscreencomp/Home/CasesEdit';
import { updateCase} from '../../../store/action/userAppStorage';
import { Error } from '../../../component/common/Error';



const AdminCaseEdit = ({ status }) => {
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
      
        let res = await dispatch(updateCase(data))

        if(!res.bool){
            setIsError(true)
            setIsLoading(false)
            return
        }

        setIsLoading(false)
        navigate('/admindashboard/cases')




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
                <AdminCaseEditComponent  updateHandler = {updateHandler} />
            </div>
        </div>
    </>
    )
}

export default AdminCaseEdit