import React, { useState, useEffect } from 'react';
import styles from './overview.module.css';
import { useDispatch } from "react-redux";
import { getOverViewData } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";
import { VictoryLine, VictoryChart,VictoryTheme,VictoryAxis } from 'victory'



export const OverViewComponent = ({ buy }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)

    let [data,setData]=useState(null)

    //initialising reduzx

    let dispatch = useDispatch()
    let navigate = useNavigate()
    let interval

    let { color, user } = useSelector(state => state.userAuth)


    let navigateHandler = (data) => {
        navigate(`/createcampaign_1xyzab`)
    }

    useEffect(()=>{
        let interval = setInterval(()=>{
            fetchData()
        },10000)
        return ()=>{
            clearInterval(interval)
        }
        
    },[])

    let changeHandler = (e)=>{
        alert(e.target.value)

    }




    let fetchData=async()=>{
        let res = await dispatch(getOverViewData())
        if(!res.bool){
            console.log(res)
            setIsError(true)
            setIsLoading(false)
            return
        }

        setData(res.message)
        setIsLoading(false)

       
        
    }



    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Error />
    }


    return (<div className={styles.homeScreen} style={{ backgroundColor: color.background }}>

        <div className={styles.timeline} style={{ backgroundColor: color.background }}>
            <h1>Overview</h1>


            <div className={styles.graphContainer}>
                <div className={styles.leftGraphContainer} >

                    <div className={styles.dataContainer}>
                        <div className={styles.dataCard}>
                            <p>
                                Users
                            </p>

                            <h1>
                                {data.total_activeUsers}
                            </h1>

                            <p>{data.newActiveUsersPercentage.toFixed(2)}%</p>

                        </div>

                        <div className={styles.dataCard}>
                            <p>
                                New Users
                            </p>

                            <h1>
                                {data.total_newUsers}
                            </h1>

                            <p>{data.newUserPercentage.toFixed(2)}%</p>

                        </div>

                        {/*<div className={styles.dataCard}>
                            <p>
                                Event Count
                            </p>

                            <h1>
                                {data.total_eventCount}
                            </h1>

                            <p>{data.eventCountPercentage.toFixed(2)}%</p>

                        </div>*/}

                        <div className={styles.dataCard}>
                            <p>
                                Conversions
                            </p>

                            <h1>
                                {data.conversions}
                            </h1>

                        </div>
                        

                    </div>

                    <div className={styles.lineGraph}>
                    <VictoryChart
                     height={120}
                    domainPadding={{x:25}}
                    padding={
                        {
                            top:20,
                            bottom:0,
                            right:10,
                            left:10
                        }
                    }
                
                       theme={VictoryTheme.material}
                       animate={{
                        duration:2000,
                        onLoad:{
                            duration:1000
                        }
                       }}
                       >
                        <VictoryAxis
                        style={{
                            axis:{
                                stroke:'transparent'
                            },
                            ticks:{
                                stroke:'transparent'
                            },
                            tickLabels:{
                                fill:'transparent'
                            },
                            height:'300px'
                        }}
                        />

                        <VictoryLine
                         style={{
                            data:{
                                stroke:'purple'
                            },
                            parent:{
                                border:'1px solid #ccc'
                            },
                            labels:{
                                fill:'none'
                            }
                        }}

                        data={data.graphData}
                        />
                    </VictoryChart>

                    </div>


            

                    <div className={styles.iconContainer}>

                    <p className={styles.material}><select onChangeHandler={changeHandler}>
                        <option>Last 7 days</option>
                        <option>last 14 days</option>
                        <option>last 28 days</option>
                        <option>last 30 days</option>
                    </select></p>

                    <p className={styles.material}>view report snapshot<span className='material-icons'>arrow_forward</span></p>

                    </div>

                    




                </div>
                <div className={styles.rightGraphContainer}>
                    <h3>
                        users in the last 30minutes
                    </h3>

                    <h1>
                    {data.users_30minutes}
                    </h1>

                    <p className={styles.material}>view realtime <span className='material-icons'>arrow_forward</span></p>
                </div>

                
            </div>


        </div>



    </div>)




}