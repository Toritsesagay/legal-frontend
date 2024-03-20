import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { fetchCases, deleteCase } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";

export const AdminCasesComponent = ({ status }) => {

    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [caseList, setCaseList] = useState([])
    let [filteredCases, setfilteredCases] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { color, user } = useSelector(state => state.userAuth)

    let interval

    let navigateHandler = (data) => {
        navigate(`/admin/campaign/${data}`)
    }


    useEffect(() => {
        fetchAllCases()
    }, [])




    let fetchAllCases = async () => {
        setIsError(false)
        let res = await dispatch(fetchCases())

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here
        setCaseList(res.message)
        setfilteredCases(res.message)
        setIsLoading(false)
    }



    let editHandler = (id) => {
        //navigate to the next page
        navigate(`/admindashboard/cases/${id}`)
    }


    let deleteHandler = async (id) => {
        //delete this specific case from server

        setIsError(false)
        let res = await dispatch(deleteCase(id))
        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //filtering the already list

        let filteredArray = caseList.filter(data => data._id !== id)

        setCaseList(filteredArray)
        setfilteredCases(filteredArray)
        setIsLoading(false)

    }





    let searchHandler = (e) => {
        setIsLoading(true)
        if (e) {
            const newData = filteredCases.filter((item) => {
                const itemData = item.caseOwner ? item.caseOwner : '';
                
                const textData = e.target.value.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setCaseList(newData)
            setIsLoading(false)

        } else {
            setCaseList(filteredCases)
            setIsLoading(false)

        }
    }


    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Error />
    }


    return (<div className={styles.homeScreen} style={{ backgroundColor: color.background }}>

        <div className={styles.timeline} style={{ backgroundColor: color.background }}>
            <h1>All Cases</h1>

            <div className={styles.filter}>

                <div className={styles.searchContainer}>
                    <div className={styles.searchBar}>
                        < input className={styles.input} placeholder='search' onChange={searchHandler} />
                        <span className='material-icons'>
                            search
                        </span>

                    </div>

                </div>

                <div className={styles.dateFilter}>
                </div>


            </div>

            <div className={styles.tableContainer} >

                {caseList.length === 0 && <div className={styles.emptyContainer}>
                    <p>No registered cases</p>

                </div>}

                {caseList.length !== 0 && <table>
                    <tbody>
                        <tr>
                            <td>
                                Case Owner
                            </td>
                            <td>
                                Subject

                            </td>

                            <td>
                                Client Email

                            </td>

                            <td>
                                Client Phone Number

                            </td>

                            <td>
                                Client Address

                            </td>

                            <td>
                                Case Number
                            </td>

                            <td>
                                CaseSubject
                            </td>

                            <td>
                                Case Category
                            </td>

                            <td>
                                Case Matter
                            </td>

                            <td>
                                Status
                            </td>

                            <td>
                                Attorney
                            </td>

                            <td>
                                Court Case Number
                            </td>

                            <td>
                                Stage1
                            </td>

                            <td>
                                Stage2
                            </td>

                            <td>
                                Stage3
                            </td>

                            <td>
                                Progress
                            </td>

                            <td>
                                Charging Court
                            </td>

                            <td>
                                Next Case Date
                            </td>

                            <td>
                                Date Added
                            </td>

                            <td>
                                delete case
                            </td>

                            <td>
                                edit case
                            </td>

                        </tr>


                        {caseList.map(data => <tr key={data.__id} >
                            <td >
                                {data.caseOwner}
                            </td>

                            <td>
                                {data.subject}
                            </td>

                            <td>
                                {data.clientEmail}
                            </td>


                            <td>
                                {data.clientPhoneNumber}
                            </td>

                            <td>
                                {data.clientAddress}
                            </td>

                            <td>
                                {data.caseNumber}
                            </td>


                            <td>
                                {data.caseSubject}
                            </td>

                            <td>
                                {data.caseCategory}
                            </td>

                            <td>
                                {data.caseMatter}
                            </td>

                            <td>
                                {data.status}
                            </td>

                            <td>
                                {data.attorney}
                            </td>

                            <td>
                                {data.courtCaseNumber}
                            </td>


                            <td>
                                {data.stage1}
                            </td>


                            <td>
                                {data.stage2}
                            </td>

                            <td>
                                {data.stage3}
                            </td>

                            <td>
                                {data.progress}
                            </td>
                            <td>
                                {data.chargingCourt}
                            </td>

                            <td>
                                {data.nextCaseDate}
                            </td>

                            <td>
                                {data.dateAdded}
                            </td>

                            <td onClick={() => deleteHandler(data._id)}>
                                <span className='material-icons'> delete</span>
                            </td>

                            <td onClick={() => editHandler(data._id)}>
                                <span className='material-icons'> edit</span>
                            </td>






                        </tr>)}


                    </tbody>
                </table>}




            </div>



        </div>



    </div>)




}
