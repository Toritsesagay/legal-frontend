import React, { useEffect, useState } from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";

window.Buffer = window.Buffer || require("buffer").Buffer;

const imageMimeType = /image\/(png|jpg|jpeg)/i;


export const AddBlogCasesComponent = ({ createHandler, }) => {
    let [photo, setPhoto] = useState(false)

   
    const [photoDataURL, setPhotoDataURL] = useState(null);

    let [isData, setIsData] = useState({
        case_photo_url:'',
        case_topic:'',
        case_type:'',
        case_text:'',
        case_attorney:'',
        case_duration:'',
        result_price:'',
        case_category:'',
        case_challenge:'',
        case_legal_strategy:'',
        result_text:'',
    })

    let { color } = useSelector(state => state.userAuth)



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
        setPhoto(file);
    }

   

    let submitHandler = (e) => {
        e.preventDefault()
        let objData = { ...isData }
        objData.photo = photo
        createHandler(objData)
        return

    }

    

    useEffect(() => {
        let fileReader, isCancel = false;
        if (photo) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {

                const { result } = e.target;

                if (result && !isCancel) {
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







    return (<>
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>


            <div className={styles.timeline} style={{ backgroundColor: color.background }}>
                <h1 className={styles.timelineHeading}>New Case Blog</h1>

                <form className={styles.editForm} onSubmit={submitHandler}>

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

                    {photoDataURL ? <div className={styles.inputCards}>
                        <label>
                            Case blog photo
                        </label>
                        <img src={photoDataURL} />

                    </div> : ''}

                    <div className={styles.inputCards}>
                        <label>
                            Case Blog Photo
                        </label>

                        <input type='file' onChange={changePhotoHandler} />


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



                </form>
            </div>






        </div></>)




}