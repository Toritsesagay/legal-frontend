import React, { useState } from 'react';
import styles from '../../Home.module.css';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import Sidebar from '../../../component/adminscreencomp/sidebar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import LoadingModal from "../../../component/Modal/LoadingModal";
import { useDispatch } from 'react-redux';
import { AddBlogsComponent } from '../../../component/adminscreencomp/Home/AddBlogs';

import { Error } from '../../../component/common/Error';

import ReactS3 from 'react-s3';

import { createBlog } from '../../../store/action/userAppStorage';

const AddBlog = ({ status }) => {
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
        setIsLoading(true)
        let imgUrl_1 = ''
        let imgUrl_2 = ' '

        const config = {
            dirName:process.env.REACT_APP_DIRNAME,
            bucketName:process.env.REACT_APP_BUCKETNAME,
            region:process.env.REACT_APP_REGION,
            accessKeyId:process.env.REACT_APP_ACCESSKEYID,
            secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY 
        }

        try {
            let upload_1 = async () => {
                if(data.photo){
                    return ReactS3.uploadFile(data.photo, config).then(response => {

                        if (response.result.status !== 204)
                            throw new Error("Failed to upload image to S3");
                        else {
    
                            imgUrl_1 = (response.location)
                        }
                    })
                        .catch(error => {
                            console.log(error);
                        })
                }
               
            }

            let upload_2 = async () => {
                if(data.file){
                    return ReactS3.uploadFile(data.file, config).then(response => {

                        if (response.result.status !== 204)
                            throw new Error("Failed to upload image to S3");
                        else {
    
                            imgUrl_2 = (response.location)
                        }
                    })
                        .catch(error => {
                            console.log(error);
                        })
                }
               

                
            }

            await upload_1()

            await upload_2()



        } catch (err) {
            setIsLoading(false)
            setIsError(true)
            setIsErrorInfo(err.message)
            return
        }

        let newData = {
            blog_photo_url:imgUrl_1,

            blog_photo_url2:imgUrl_2,
            blog_topic: data.blog_topic,
            date: data.date,
            numOfView: data.numOfView,
            blog_text: data.blog_text,
            blog_qoute: data.blog_qoute,
            blog_topic2: data.blog_topic2,
            blog_text2: data.blog_text2,
            blog_video: data.blog_video,
            blog_video_topic: data.blog_video_topic,
            blog_video_text: data.blog_video_text,

        }



        let res = await dispatch(createBlog(newData))

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
                <Sidebar status='Add Blogs' />
            </div>

            <div className={styles.main}>
                {/*mobile and dashboard headers*/}
                <DashboardDrawer showmenuHandler={showmenuHandler} />
                <DashboardHeader showmenuHandler={showmenuHandler} title='Add blogs' />

                <AddBlogsComponent status={status} createHandler={createHandler} />
            </div>
        </div>
    </>
    )
}

export default AddBlog
















