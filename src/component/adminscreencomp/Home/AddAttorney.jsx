import React, {useEffect,useState} from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
window.Buffer = window.Buffer || require("buffer").Buffer;
const imageMimeType = /image\/(png|jpg|jpeg)/i;


export const AddAttorneyComponent = ({ createHandler, }) => {
    let [file, setFile] = useState(false)
    const [fileDataURL, setFileDataURL] = useState(null);
  

    let [isData, setIsData] = useState({
        nameOfAttorney:'',
        about:'',
        address:'',
        email:'',
        phone:'',
    })

    let { color} = useSelector(state => state.userAuth)

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
        setFile(file);
    }



    let submitHandler = (e) => {
        e.preventDefault()
        let objData = {...isData}
        objData.file = file
        createHandler(objData)
        return

    }

   

   

   


   
    
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
   


    return (<>
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>

            <div className={styles.timeline} style={{ backgroundColor: color.background }}>
                <h1 className={styles.timelineHeading}>New Attorney</h1>

                <form className={styles.editForm} onSubmit={submitHandler}>

                    <div className={styles.inputCards}>
                        <label>
                            Name Of Attorney
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'nameOfAttorney')} value={isData.nameOfAttorney} type='text' required />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            About Attorney
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'about')} value={isData.about} type='text' required/>
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Address Of Attorney
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'address')} value={isData.address} type='text' required />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Email Of Attorney
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'email')} value={isData.email} type='text' required/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Phone Of Attorney
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'phone')} value={isData.phone} type='text' required/>
                    </div>

                    {fileDataURL?<div className={styles.inputCards}>
                        <label>
                            Photo of attorney
                        </label>
                        <img src={fileDataURL} />

                    </div>:''}

                    
                    <div className={styles.inputCards}>
                        <label>
                            Photo
                        </label>

                        <input type='file' onChange={changePhotoHandler} required/>


                    </div>

                    <div className={styles.buttonContainer} >
                        <button >save</button>
                    </div>



                </form>
            </div>






        </div></>)




}