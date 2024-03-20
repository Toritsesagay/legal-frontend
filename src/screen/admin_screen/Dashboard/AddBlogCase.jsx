import React, { useState } from 'react';
import styles from '../../Home.module.css';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import Sidebar from '../../../component/adminscreencomp/sidebar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import LoadingModal from "../../../component/Modal/LoadingModal";
import { useDispatch } from 'react-redux';
import { Error } from '../../../component/common/Error';

import ReactS3 from 'react-s3';

import { createBlogCase } from '../../../store/action/userAppStorage';
import { AddBlogCasesComponent } from '../../../component/adminscreencomp/Home/AddBlogCase';

const AddBlogCase = ({ status }) => {
    //tradeModal and transfer modal

    let [isErrorInfo, setIsErrorInfo] = useState()


    //tradeModal and transfer modal

    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)

    let dispatch = useDispatch()
    let navigate = useNavigate()

    let showmenuHandler = () => {
        let drawer = document.querySelector('.drawerCon')
        drawer.classList.toggle('showdrawer')
    }



    let createHandler = async (data) => {
        alert('reached')
    
        setIsLoading(true)
        let  imageUrl_1
      

         const config = {
            dirName:process.env.REACT_APP_DIRNAME,
            bucketName:process.env.REACT_APP_BUCKETNAME,
            region:process.env.REACT_APP_REGION,
            accessKeyId:process.env.REACT_APP_ACCESSKEYID,
            secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY 
        }

        try {
            let upload_1 = async () => {
                console.log(data.photo)

                if(data.photo){
                    return ReactS3.uploadFile(data.photo, config).then(response => {

                        if (response.result.status !== 204)
                            throw new Error("Failed to upload image to S3");
                        else {
    
                            imageUrl_1 = (response.location)
                        }
                    })
                        .catch(error => {
                            console.log(error);
                        })
                }
               
               
            }

            await upload_1()



        } catch (err) {
            setIsLoading(false)
            setIsError(true)
            setIsErrorInfo(err.message)
            return
          
           
        }

        let newData = {
            case_photo_url:imageUrl_1,
            case_topic:data.case_topic,
            case_type:data.case_type,
            case_text:data.case_text,
            case_attorney:data.case_attorney,
            case_duration:data.case_duration,
            result_price:data.result_price,
            case_category:data.case_category,
            case_challenge:data.case_challenge,
            case_legal_strategy:data. case_legal_strategy,
            result_text:data.result_text,
        }



        let res = await dispatch(createBlogCase(newData))

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }

        setIsLoading(false)
        navigate('/admindashboard/blogcases')

    }





    if (isError) {
        return <Error />
    }


    return (<>
        {isLoading && <LoadingModal />}
        <div className={styles.dashboard}>
            <div className={styles.sidebar}>
                <Sidebar status='new Blog Case' />
            </div>

            <div className={styles.main}>
                {/*mobile and dashboard headers*/}
                <DashboardDrawer showmenuHandler={showmenuHandler} />
                <DashboardHeader showmenuHandler={showmenuHandler} title='new Blog Case' />

                <AddBlogCasesComponent status={status} createHandler={createHandler} />
            </div>
        </div>
    </>
    )
}

export default AddBlogCase