import React, { useState } from 'react';
import styles from '../../Home.module.css';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import Sidebar from '../../../component/adminscreencomp/sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import LoadingModal from "../../../component/Modal/LoadingModal";
import { useDispatch } from 'react-redux';
import { BlogEditComponent } from '../../../component/adminscreencomp/Home/BlogsEdit';
import ReactS3 from 'react-s3';
import { updateBlog } from '../../../store/action/userAppStorage';
import { Error } from '../../../component/common/Error';




const BlogEdit = ({ status }) => {
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
        let imgUrl_1
        let imgUrl_2

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
                    if (!data.photo) {
                        return
                    }

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

                let upload_2 = async () => {
                    if (!data.file) {
                        return
                    }

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

                await upload_1()

                await upload_2()
            } catch (err) {
                
                setIsLoading(false)
                setIsError(true)
                setIsErrorInfo(err.message)
                return
            }
            newData = {
                blog_photo_url: imgUrl_1,
                blog_photo_url2: imgUrl_2,
                blog_topic: data.blog_topic,
                date: data.date,
                numOfView: data.numOfView,
                blog_text: data.blog_text,
                blog_qoute: data.blog_qoute,
                blog_topic2: data.blog_topic2,
                blog_text2: data.blog_text2,
               

            }

        } else {
            newData = {
                blog_photo_url: data.blog_photo_url,
                blog_photo_url2: data.blog_photo_url2,
                blog_topic: data.blog_topic,
                date: data.date,
                numOfView: data.numOfView,
                blog_text: data.blog_text,
                blog_qoute: data.blog_qoute,
                blog_topic2: data.blog_topic2,
                blog_text2: data.blog_text2,
                

            }
        }

        newData._id = data._id
        let res = await dispatch(updateBlog(newData))

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }

        setIsLoading(false)
        navigate('/admindashboard/blogs')




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
                <BlogEditComponent updateHandler={updateHandler} />
            </div>
        </div>
    </>
    )
}

export default BlogEdit














