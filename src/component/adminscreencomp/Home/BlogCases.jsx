import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { fetchBlogCases, deleteBlogCase } from "../../../store/action/userAppStorage";

import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";


export const BlogCasesComponent = ({ status }) => {

    let [isLoading, setIsLoading] = useState(true)

    let [isError, setIsError] = useState(false)

    let [blogCaseList, setBlogCaseList] = useState([])

    let [filteredBlogCases, setFilteredBlogCases] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { color } = useSelector(state => state.userAuth)




    //hook to handle fetch method before the screen mounts
    useEffect(() => {
        fetchAllBlogCases()
    }, [])

    // method to fetch attorneys
    let fetchAllBlogCases = async () => {
        setIsError(false)
        let res = await dispatch(fetchBlogCases())

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here
        setBlogCaseList(res.message)
        setFilteredBlogCases(res.message)
        setIsLoading(false)
    }



    let editHandler = (id) => {
        //navigate to the next page
        navigate(`/admindashboard/blogcases/${id}`)
    }


    let deleteHandler = async (id) => {
        //delete this specific case from server
        setIsError(false)
        let res = await dispatch(deleteBlogCase(id))
        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //filtering the already list

        let filteredArray = blogCaseList.filter(data => data._id !== id)

        setBlogCaseList(filteredArray)
        setFilteredBlogCases(filteredArray)
        setIsLoading(false)
    }


    let searchHandler = (e) => {
        setIsLoading(true)
        if (e) {
            const newData = filteredBlogCases.filter((item) => {
                const itemData = item.blog_topic ? item.blog_topic : '';

                const textData = e.target.value.toUpperCase();

                return itemData.indexOf(textData) > -1;
            })
            setBlogCaseList(newData)
            setIsLoading(false)

        } else {
            setBlogCaseList(filteredBlogCases)
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
            <h1>All Cases Blog</h1>

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

                {blogCaseList.length === 0 && <div className={styles.emptyContainer}>
                    <p>No blog case yet</p>

                </div>}

                {blogCaseList.length !== 0 && <table>
                    <tbody>
                        <tr>
                            <td>
                                Case Blog Topic
                            </td>

                            <td>
                                Case Blog Type
                            </td>

                            <td>
                                Case Blog Text
                            </td>

                            <td>
                                Case Attorney
                            </td>


                            <td>
                                Case Duration
                               
                            </td>

                            
                            <td>
                                Price
                               
                            </td>

                            
                            <td>
                                Case  Category
                               
                            </td>

                            
                            <td>
                                Case  Challenges
                               
                            </td>

                            
                            <td>
                                Case  Legal strategy
                               
                            </td>

                            
                            <td>
                                Case Result 
                               
                            </td>

                            
                            

                        </tr>

                        {blogCaseList.map(data => <tr key={data.__id} >

                            <td>
                                {data.case_topic}
                            </td>

                            
                            <td>
                                {data.case_type}
                            </td>

                            <td>
                                {data.case_text}
                            </td>

                            <td>
                                {data.case_attorney}
                            </td>

                            <td>
                                {data.case_duration}
                            </td>

                            
                            <td>
                                {data.result_price}
                            </td>

                            <td>
                                {data.case_category}
                            </td>

                            <td>
                                {data.case_challenge}
                            </td>

                            <td>
                                {data.case_legal_strategy}
                            </td>

                            
                            <td>
                                {data.result_text}
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