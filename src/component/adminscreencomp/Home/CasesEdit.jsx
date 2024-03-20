import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { updateCase } from '../../../store/action/userAppStorage';


export const AdminCaseEditComponent  = ({ updateHandler,}) => {
    let [isData,setIsData] = useState(null)
    let { color, user,casesList } = useSelector(state => state.userAuth)

    let {id} = useParams()


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
        let dataObj = casesList.find(data=>data._id.toString() === id.toString())

        setIsData(dataObj)

    }, [id])







    return (<>
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>

            <div className={styles.timeline} style={{ backgroundColor: color.background }}>
                <h1 className={styles.timelineHeading}>Edit Case</h1>

                {casesList && isData && <form className={styles.editForm} onSubmit={submitHandler}>

                    <div className={styles.inputCards}>
                        <label>
                            Case Owner
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'caseOwner')} value={isData.caseOwner} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Subject
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'subject')} value={isData.subject} type='text'/>
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Client Email
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'clientEmail')} value={isData.clientEmail} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Client Phone Number
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'clientPhoneNumber')} value={isData.clientPhoneNumber} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Client Address
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'clientAddress')} value={isData.clientAddress} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Case Number
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'caseNumber')} value={isData.caseNumber} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Case Subject
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'caseSubject')} value={isData.caseSubject} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Case Category
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'caseCategory')} value={isData.caseCategory} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Case Matter

                        </label>

                        <input onChange={(e)=>handleChangeHandler(e,'caseMatter')} value={isData.caseMatter} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Status
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'status')} value={isData.status} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Attorney
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'attorney')} value={isData.attorney} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Court Case Number
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'courtCaseNumber')} value={isData.courtCaseNumber} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Stage 1
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'stage1')} value={isData.stage1} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Stage 2
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'stage2')} value={isData.stage2} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            stage 3
                        </label>
                        <input  onChange={(e)=>handleChangeHandler(e,'stage3')} value={isData.stage3} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Progress
                        </label>
                        <input  onChange={(e)=>handleChangeHandler(e,'progress')} value={isData.progress} type='text'/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Charging Court
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'chargingCourt')} value={isData.chargingCourt} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Next Case Date
                        </label>
                        <input onChange={(e)=>handleChangeHandler(e,'nextCaseDate')} value={isData.nextCaseDate} type='date' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Date Added
                        </label>
                        <input  onChange={(e)=>handleChangeHandler(e,'dateAdded')} value={isData.dateAdded} type='date'/>
                    </div>

                    <div className={styles.buttonContainer} >
                        <button >save</button>

                    </div>



                </form>}
            </div>






        </div></>)




}