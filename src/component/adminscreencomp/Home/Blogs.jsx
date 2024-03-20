import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { fetchBlogs, deleteBlog } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";


export const BlogsComponent = ({ status }) => {

    let [isLoading, setIsLoading] = useState(true)

    let [isError, setIsError] = useState(false)

    let [blogList, setBlogList] = useState([])

    let [filteredBlogs, setFilteredBlogs] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { color } = useSelector(state => state.userAuth)

    
   

    //hook to handle fetch method before the screen mounts
    useEffect(() => {
        fetchAllBlogs()
    }, [])

    // method to fetch attorneys
    let fetchAllBlogs = async () => {
        setIsError(false)
        let res = await dispatch(fetchBlogs())

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here
        setBlogList(res.message)
        setFilteredBlogs(res.message)
        setIsLoading(false)
    }



    let editHandler = (id) => {
        //navigate to the next page
        navigate(`/admindashboard/blogs/${id}`)
    }


    let deleteHandler = async (id) => {
        //delete this specific case from server
        setIsError(false)
        let res = await dispatch(deleteBlog(id))
        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //filtering the already list

        let filteredArray = blogList.filter(data => data._id !== id)

        setBlogList(filteredArray)
        setFilteredBlogs(filteredArray)
        setIsLoading(false)
    }


    let searchHandler = (e) => {
        setIsLoading(true)
        if (e) {
            const newData = filteredBlogs.filter((item) => {
                const itemData = item.blog_topic ? item.blog_topic : '';

                const textData = e.target.value.toUpperCase();

                return itemData.indexOf(textData) > -1;
            })
            setBlogList(newData)
            setIsLoading(false)

        } else {
            setBlogList(filteredBlogs)
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
            <h1>All Blogs</h1>

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

                {blogList.length === 0 && <div className={styles.emptyContainer}>
                    <p>No blogs yet</p>

                </div>}

                {blogList.length !== 0 && <table>
                    <tbody>
                        <tr>
                            <td>
                                Blog Topic
                            </td>
                            <td>
                                Date

                            </td>
                            <td>
                                Blog Text
                            </td>

                            <td>
                                Delete
                            </td>


                            <td>
                                Edit
                            </td>

                        </tr>

                        {blogList.map(data => <tr key={data.__id} >

                            <td>
                                {data.blog_topic}
                            </td>

                            <td>
                                {data.date}
                            </td>

                            <td>
                                {data.blog_text}
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