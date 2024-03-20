import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

window.Buffer = window.Buffer || require("buffer").Buffer;

const imageMimeType = /image\/(png|jpg|jpeg)/i;



export const BlogCaseEditComponent = ({ updateHandler, }) => {

    let [photo, setPhoto] = useState(false)

    let [isChangePhoto, setIsChangePhoto] = useState(false)


    const [photoDataURL, setPhotoDataURL] = useState(null);

    let [isData, setIsData] = useState(null)

    let { color, blogCase } = useSelector(state => state.userAuth)

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
        let dataObj = blogCase.find(data => data._id.toString() === id.toString())

        setIsData(dataObj)

    }, [id])

    

    let submitHandler = (e) => {
        e.preventDefault()

        //patch case on
        let objData = { ...isData }
        objData.changedFiles = false

        if (isChangePhoto) {
            objData.changedFiles = true
        }
        objData.photo = photo

        updateHandler(objData)
        return

    }


    return (<>
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>

            <div className={styles.timeline} style={{ backgroundColor: color.background }}>
                <h1 className={styles.timelineHeading}>Edit Case Blog </h1>

                {blogCase && isData && <form className={styles.editForm} onSubmit={submitHandler}>



                    {photoDataURL ? <div className={styles.inputCards}>
                        <label>
                            Case Blog Photo
                        </label>
                        <img src={photoDataURL} />

                    </div> : <div className={styles.inputCards}>
                        <label>
                            Case Blog Photo
                        </label>
                        <img src={isData.case_photo_url} />

                    </div>}

                    <div className={styles.inputCards}>
                        <label>
                            Case Blog Photo
                        </label>

                        <input type='file' onChange={changePhotoHandler} />

                    </div>




                    <div className={styles.inputCards}>

                        <label>
                            Case Blog Topic
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'case_topic')} value={isData.case_topic} type='text' required />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Case Blog Type
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'case_type')} value={isData.case_type} type='text' />
                    </div>

                    

                 


                    <div className={styles.inputCards}>
                        <label>
                            Case Blog Text
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'case_text')} value={isData.case_text} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Case Attorney
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'case_attorney')} value={isData.case_attorney} type='text' required />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Case Duration
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'case_duration')} value={isData.case_duration} type='text' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Price
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'result_price')} value={isData.result_price} type='text' />
                    </div>




                    <div className={styles.inputCards}>
                        <label>
                            Case  Category
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'case_category')} value={isData.case_category} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Case  Challenges
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'case_challenge')} value={isData.case_challenge} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>

                            Case  Legal strategy
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'case_legal_strategy')} value={isData.case_legal_strategy} type='text' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>

                            Case Result
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'result_text')} value={isData.result_text} type='text' />
                    </div>














                    <div className={styles.buttonContainer} >
                        <button >save</button>

                    </div>



                </form>}
            </div>






        </div></>)




}