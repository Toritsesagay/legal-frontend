import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { fetchCampaign } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";



export const HomeComponent = ({ buy }) => {
  let [isLoading, setIsLoading] = useState(true)
  let [isError, setIsError] = useState(false)
  let [campaignList, setCampaignList] = useState([])


  let [filteredCampaignList, setFilteredCampaignList] = useState([])

  //initialising reduzx
  let dispatch = useDispatch()
  let navigate = useNavigate()

  let { color, user } = useSelector(state => state.userAuth)

  let interval

  let navigateHandler = (data) => {
    navigate(`/createcampaign_1xyzab`)
  }

  let goToHandler = (url)=>{
    navigate(`/dashboard/overview/${url}`)

  }



  useEffect(() => {
    interval = setInterval(() => {
      fetchAllCampaign()
    }, 5000)

    return () => {
      clearInterval(interval)
    }


  }, [])

  let fetchAllCampaign = async () => {
    setIsError(false)
    let res = await dispatch(fetchCampaign())
    if (!res.bool) {
      setIsError(true)
      setIsLoading(false)
      return
    }
    setCampaignList(res.message)
    setFilteredCampaignList(res.message)
    setIsLoading(false)
  }


  let searchHandler = (e) => {
    setIsLoading(true)
    if (e) {
      const newData = filteredCampaignList.filter((item) => {
        const itemData = item.campaignName ? item.campaignName.toUpperCase() : ''.toUpperCase();
        const textData = e.target.value.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      setCampaignList(newData)
      setIsLoading(false)

    } else {
      setCampaignList(filteredCampaignList)
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
      <h1>Dashboard</h1>

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
          <button onClick={navigateHandler}>
            <span className='material-icons'>
              add
            </span>
            New Campaign
          </button>

        </div>


      </div>



      <div className={styles.tableContainer} >

        {campaignList.length === 0 ? <div className={styles.emptyContainer}>
          <p>No campaign Found</p>

          <button onClick={navigateHandler}>
            create a new campaign
          </button>

        </div> : <table>
          <tbody>
            <tr>
              <td>
                ID
              </td>

              <td>
                Campaign Name

              </td>

              <td>
                Expected Conversions

              </td>

              <td>
                Acquired Conversions

              </td>
              <td>
                Impressions
              </td>

              <td>
                Clicks
              </td>
              <td>Subscription Plan</td>

              <td>
                Date of creation
              </td>

              <td>
                status
              </td>
            </tr>

            {campaignList.map(data => <tr key={data.campaign_client__id} onClick={()=>goToHandler(data.campaign_client__id)}>
              <td >
                {data.campaign_client__id}
              </td>

              <td>
                {data.campaignName}

              </td>

              <td>
                {data.expected_conversions}

              </td>

              <td>
                {data.conversions}

              </td>
              <td>
                {data.impressions}
              </td>

              <td>
                {data.clicks}
              </td>

              <td>
                {data.subscription_plan}
              </td>

              <td>
                {data.dateOfCreation}
              </td>

              <td style={{ color: data.status === 'pending' ? 'red' : 'green' }}>
                {data.status}
              </td>

            </tr>)}


          </tbody>
        </table>}




      </div>



    </div>



  </div>)




}












































