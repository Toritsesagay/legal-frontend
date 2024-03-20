import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


export const AttorneyEditComponent = ({ updateHandler, }) => {

    let [isData, setIsData] = useState(null)
    let { color, attorney } = useSelector(state => state.userAuth)

    let { id } = useParams()


    let handleChangeHandler = (e, nameField) => {
        let val = e.target.value

        setIsData(prev => {
            prev[`${nameField}`] = val
            let newData = { ...prev }
            return newData
        })

    }



    let submitHandler = (e) => {
        e.preventDefault()
        //patch case on 
        updateHandler(isData)
        return

    }

    useEffect(() => {
        let dataObj = attorney.find(data => data._id.toString() === id.toString())

        setIsData(dataObj)

    }, [id])

   




    return (<>
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>

            <div className={styles.timeline} style={{ backgroundColor: color.background }}>
                <h1 className={styles.timelineHeading}>Edit Attorney</h1>

                {attorney && isData && <form className={styles.editForm} onSubmit={submitHandler}>

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
                        <input onChange={(e) => handleChangeHandler(e, 'about')} value={isData.about} type='text' required />
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

                    
                    
                    <div className={styles.buttonContainer} >
                        <button >save</button>

                    </div>



                </form>}
            </div>






        </div></>)




}