import React, { useState } from 'react';
import styles from '../../Home.module.css';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import Sidebar from '../../../component/adminscreencomp/sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import LoadingModal from "../../../component/Modal/LoadingModal";
import { useDispatch } from 'react-redux';

import ReactS3 from 'react-s3';

import { updateBlogCase } from '../../../store/action/userAppStorage';

import { Error } from '../../../component/common/Error';
import { BlogCaseEditComponent } from '../../../component/adminscreencomp/Home/BlogCasesEdit';




const BlogCaseEdit = ({ status }) => {
    //tradeModal and transfer modal
    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')

    let { color } = useSelector(state => state.userAuth)

    let [isLoading, setIsLoading] = useState(false)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let { id } = useParams()




    let showmenuHandler = () => {
        let drawer = document.querySelector('.drawerCon')
        drawer.classList.toggle('showdrawer')
    }



    let updateHandler = async (data) => {
        setIsLoading(true)
        let imageUrl_1 = ''

        let newData

         const config = {
            dirName:process.env.REACT_APP_DIRNAME,
            bucketName:process.env.REACT_APP_BUCKETNAME,
            region:process.env.REACT_APP_REGION,
            accessKeyId:process.env.REACT_APP_ACCESSKEYID,
            secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY 
        }



        if (data.changedFiles) {
            try {

                let upload_1 = async () => {
                    if (data.photo) {
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
            newData = {
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

        } else {
            newData = {
                case_photo_url:data.case_photo_url,
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
        }

        newData._id = data._id
        let res = await dispatch( updateBlogCase(newData))

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }

        setIsLoading(false)
        navigate('/admindashboard/blogCases')


    }



    if (isError) {
        return <Error />
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
                <BlogCaseEditComponent updateHandler={updateHandler} />
            </div>
        </div>
    </>
    )
}

export default BlogCaseEdit