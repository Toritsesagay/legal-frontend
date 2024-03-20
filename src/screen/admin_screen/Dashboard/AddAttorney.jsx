import React, {useState } from 'react';
import styles from '../../Home.module.css';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import Sidebar from '../../../component/adminscreencomp/sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import LoadingModal from "../../../component/Modal/LoadingModal";
import { useDispatch } from 'react-redux';
import ReactS3 from 'react-s3';
import { createAttorney } from '../../../store/action/userAppStorage';
import { Error } from '../../../component/common/Error';
import { AddAttorneyComponent } from '../../../component/adminscreencomp/Home/AddAttorney';



const Add_Attorney = ({ status }) => {
    //tradeModal and transfer modal
    let [isError, setIsError] = useState(false)
    let [isErrorInfo,setIsErrorInfo] = useState()


    let { color } = useSelector(state => state.userAuth)
    let [isLoading, setIsLoading] = useState(false)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let { id } = useParams()


    let showmenuHandler = () => {
        let drawer = document.querySelector('.drawerCon')
        drawer.classList.toggle('showdrawer')
    }



    let createHandler = async (data) => {
        setIsLoading(true)
        let imgUrl = ''

        const config = {
            dirName:process.env.REACT_APP_DIRNAME,
            bucketName:process.env.REACT_APP_BUCKETNAME,
            region:process.env.REACT_APP_REGION,
            accessKeyId:process.env.REACT_APP_ACCESSKEYID,
            secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY 
        }

        try {
            let upload = async () => {
                if(data.file){
                    return ReactS3.uploadFile(data.file, config).then(response => {

                        if (response.result.status !== 204)
                            throw new Error("Failed to upload image to S3");
                        else {
    
                            imgUrl = (response.location)
                        }
                    })
                        .catch(error => {
                            console.log(error);
                        })
                    
                }
                

                
            }
            await upload()

        } catch (err) {
            setIsLoading(false)
            setIsError(true)
            setIsErrorInfo(err.message)
            return
        }

        let newData = {
            photo: imgUrl,
            nameOfAttorney: data.nameOfAttorney,
            about: data.about,
            address: data.address,
            email: data.email,
            phone: data.phone,
        }


        let res = await dispatch(createAttorney(newData))

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }

        setIsLoading(false)
        navigate('/admindashboard/attorneys')

    }

    if (isError) {
        return <Error />
    }


    return (<>
        {isLoading && <LoadingModal />}
        <div className={styles.dashboard}>
            <div className={styles.sidebar}>
                <Sidebar status='new attorney' />
            </div>

            <div className={styles.main}>
                {/*mobile and dashboard headers*/}
                <DashboardDrawer showmenuHandler={showmenuHandler} />
                <DashboardHeader showmenuHandler={showmenuHandler} title='Home' />
                <AddAttorneyComponent createHandler={createHandler} />
            </div>
        </div>
    </>
    )
}

export default Add_Attorney