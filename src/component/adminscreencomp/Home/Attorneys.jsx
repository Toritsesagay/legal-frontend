import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { fetchAttorneys, deleteAttorney } from "../../../store/action/userAppStorage";

import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";





export const AttorneysComponent = ({ status }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [attorneyList, setAttorneyList] = useState([])
    let [filteredAttorneys, setFilteredAttorneys] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { color, user } = useSelector(state => state.userAuth)

    let interval

    let navigateHandler = (data) => {
        navigate(`/admin/campaign/${data}`)
    }


    //hook to handle fetch method before the screen mounts
    useEffect(() => {
        fetchAllAttorneys()
    }, [])



    // method to fetch attorneys
    let fetchAllAttorneys = async () => {
        setIsError(false)
        let res = await dispatch(fetchAttorneys())

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here
        setAttorneyList(res.message)
        setFilteredAttorneys(res.message)
        setIsLoading(false)
    }



    let editHandler = (id) => {
        //navigate to the next page
        navigate(`/admindashboard/attorneys/${id}`)
    }


    let deleteHandler = async (id) => {
        //delete this specific case from server

        setIsError(false)
        let res = await dispatch(deleteAttorney(id))
        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //filtering the already list

        let filteredArray = attorneyList.filter(data => data._id !== id)

        setAttorneyList(filteredArray)
        setFilteredAttorneys(filteredArray)
        setIsLoading(false)

    }




    let searchHandler = (e) => {
        setIsLoading(true)
        if (e) {
            const newData = filteredAttorneys.filter((item) => {
                const itemData = item.caseOwner ? item.caseOwner : '';

                const textData = e.target.value.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setAttorneyList(newData)
            setIsLoading(false)

        } else {
            setAttorneyList(filteredAttorneys)
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
            <h1>All Attorneys</h1>

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

                {attorneyList.length === 0 && <div className={styles.emptyContainer}>
                    <p>No atttorney yet</p>

                </div>}

                {attorneyList.length !== 0 && <table>
                    <tbody>
                        <tr>
                            <td>
                                Name Of Attorney
                            </td>
                            <td>
                                About Attorney

                            </td>
                            <td>
                                Address Of Attorney

                            </td>

                            <td>
                                Email Of Attorney

                            </td>

                            <td>
                                Phone Of Attorney

                            </td>

                            <td>
                                Edit Attorney

                            </td>

                            <td>
                                Delete Attorney

                            </td>
                           

                        </tr>

                        {attorneyList.map(data => <tr key={data.__id} >
                            <td >
                                {data.nameOfAttorney}
                            </td>
                            <td>
                                {data.about}
                            </td>
                            <td>
                                {data.address}
                            </td>
                            <td>
                                {data.email}
                            </td>
                            <td>
                                {data.phone}
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