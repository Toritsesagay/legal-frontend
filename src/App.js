import React, { useEffect, Suspense } from "react"
import { Route, Routes } from 'react-router-dom'
import './App.css'
//importing redux action to log user in initially
import { checkIfAdminIsLoggedIn } from "./store/action/userAppStorage";
import { useDispatch } from "react-redux";

import FallBackComponent from './component/general/Fallback'

import { useSelector } from "react-redux";



//User auth screens



{/*Admin dashbaoard section*/ }
const AdminLogin = React.lazy(() => import('./screen/admin_screen/Auth/Login'))

const AdminSignup = React.lazy(() => import('./screen/admin_screen/Auth/Signup'))

const AdminCases = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminCases'))


const AdminEditCase = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminEditCase'))
//attorneys import

const AdminAttorneys = React.lazy(() => import('./screen/admin_screen/Dashboard/Attorneys'))

const AdminEditAttorney = React.lazy(() => import('./screen/admin_screen/Dashboard/AttorneyEdit'))


const AddAttorney = React.lazy(() => import('./screen/admin_screen/Dashboard/AddAttorney'))

//import from blogs

const AdminBlogs = React.lazy(() => import('./screen/admin_screen/Dashboard/Blogs'))

const AdminEditBlog = React.lazy(() => import('./screen/admin_screen/Dashboard/BlogEdit'))

const AddBlog = React.lazy(() => import('./screen/admin_screen/Dashboard/AddBlog'))




//import from blog cases
const AdminBlogCases = React.lazy(() => import('./screen/admin_screen/Dashboard/BlogCases'))

const AdminEditBlogCase = React.lazy(() => import('./screen/admin_screen/Dashboard/BlogCaseEdit'))

const AddBlogCase = React.lazy(() => import('./screen/admin_screen/Dashboard/AddBlogCase'))




function App() {
  let dispatch = useDispatch()
  let { user, color, admin, userToken, adminToken } = useSelector(state => state.userAuth)

  useEffect(async () => {
    await dispatch(checkIfAdminIsLoggedIn())
    //await dispatch(getTheme())
  }, [])


  return (
    <div className="App">
      <Suspense fallback={<FallBackComponent />}>
        <Routes>
          {/*the general routes */}
          <Route path='/' element={<AdminLogin />} />

          <Route path='/adminlogin' element={<AdminLogin />} />
          {/* the Admin  DASHBOARD routes*/}

          <Route path='/adminsignup' element={<AdminSignup />} />

          <Route path='/admindashboard/cases' element={adminToken ? <AdminCases status={false} /> : <AdminLogin />} />

          <Route path='/admindashboard/cases/:id' element={adminToken ? <AdminEditCase status={true} /> : <AdminLogin />} />

          <Route path='/admindashboard/attorneys' element={adminToken ? <AdminAttorneys status={false} /> : <AdminLogin />} />

          <Route path='/admindashboard/attorneys/:id' element={adminToken ? <AdminEditAttorney status={true} /> : <AdminLogin />} />

          <Route path='/admindashboard/newattorney' element={adminToken ? <AddAttorney status={true} /> : <AdminLogin />} />

          {/*blog routes*/}

          <Route path='/admindashboard/blogs' element={adminToken ? <AdminBlogs status={false} /> : <AdminLogin />} />

          <Route path='/admindashboard/blogs/:id' element={adminToken ? <AdminEditBlog status={true} /> : <AdminLogin />} />

          <Route path='/admindashboard/newblog' element={adminToken ? <AddBlog status={true} /> : <AdminLogin />} />




          {/*blog case routes*/}
          <Route path='/admindashboard/blogcases' element={adminToken ? <AdminBlogCases status={false} /> : <AdminLogin />} />

          <Route path='/admindashboard/blogcases/:id' element={adminToken ? <AdminEditBlogCase status={true} /> : <AdminLogin />} />

          <Route path='/admindashboard/newblogcase' element={adminToken ? <AddBlogCase status={true} /> : <AdminLogin />} />


        </Routes>


      </Suspense>
    </div>

  );
}

export default App;
