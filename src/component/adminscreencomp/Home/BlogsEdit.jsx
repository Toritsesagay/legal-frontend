import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
window.Buffer = window.Buffer || require("buffer").Buffer;
const imageMimeType = /image\/(png|jpg|jpeg)/i;



export const BlogEditComponent = ({ updateHandler, }) => {
    let [file, setFile] = useState(false)
    let [photo, setPhoto] = useState(false)

    let [isChangePhoto, setIsChangePhoto] = useState(false)

    const [fileDataURL, setFileDataURL] = useState(null);

    const [photoDataURL, setPhotoDataURL] = useState(null);

    let [isData, setIsData] = useState(null)
    let { color, blog } = useSelector(state => state.userAuth)

    let { id } = useParams()


    let handleChangeHandler = (e, nameField) => {
        let val = e.target.value

        setIsData(prev => {
            prev[`${nameField}`] = val
            let newData = { ...prev }
            return newData
        })

    }

    const changePhotoHandler = (e) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setIsChangePhoto(true)
        setPhoto(file);
    }

    const changeFileHandler = (e) => {
        const file = e.target.files[0];

        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setIsChangePhoto(true)
        setFile(file);
    }



    useEffect(() => {
        let fileReader, isCancel = false;

        if (photo) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {

                const { result } = e.target;

                if (result && !isCancel) {
                    console.log(result)
                    setPhotoDataURL(result)
                }
            }
            fileReader.readAsDataURL(photo);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [photo]);

    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result)
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [file]);

    useEffect(() => {
        let dataObj = blog.find(data => data._id.toString() === id.toString())

        setIsData(dataObj)

    }, [id])

    let submitHandler = (e) => {
        e.preventDefault()
    
        //patch case on
        let objData = {...isData} 
        objData.changedFiles = false

        if(isChangePhoto){
            objData.changedFiles = true
        }
        objData.photo = photo
        objData.file = file
        
        updateHandler(objData)
        return

    }


    return (<>
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>

            <div className={styles.timeline} style={{ backgroundColor: color.background }}>
                <h1 className={styles.timelineHeading}>Edit Blog</h1>

                {blog && isData && <form className={styles.editForm} onSubmit={submitHandler}>

                    <div className={styles.inputCards}>

                        <label>
                            Blog Topic
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'blog_topic')} value={isData.blog_topic} type='text' required />


                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Date Of Creation
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'date')} value={isData.date} type='date' />
                    </div>

                    {photoDataURL?<div className={styles.inputCards}>
                        <label>
                            blog photo 
                        </label>
                        <img src={photoDataURL} />

                    </div>:<div className={styles.inputCards}>
                        <label>
                            blog photo
                        </label>
                        <img src={isData.blog_photo_url} />

                    </div>}

                    <div className={styles.inputCards}>
                        <label>
                            Blog Photo
                        </label>

                        <input type='file' onChange={changePhotoHandler} />

                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Number Of View
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'numOfView')} value={isData.numOfView} type='number' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Blog Text
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'blog_text')} value={isData.blog_text} type='text' required />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Blog Quote
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'blog_qoute')} value={isData.blog_qoute} type='text' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Blog Topic 2
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'blog_topic2')} value={isData.blog_topic2} type='text' />
                    </div>

                    {fileDataURL ? <div className={styles.inputCards}>
                        <label>
                            Blog photo 2
                        </label>
                        <img src={fileDataURL} />

                    </div> : <div className={styles.inputCards}>
                        <label>
                            Blog photo 2
                        </label>
                        <img src={isData.blog_photo_url2} />

                    </div>}

                    <div className={styles.inputCards}>
                        <label>
                            Blog Photo 2
                        </label>

                        <input type='file' onChange={changeFileHandler} />


                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Blog Text 2
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'blog_text2')} value={isData.blog_text2} type='text' />
                    </div>


                    <div className={styles.buttonContainer} >
                        <button >save</button>

                    </div>



                </form>}
            </div>






        </div></>)




}