export const SIGNUP_USER = "SIGNUP_USER";
export const LOGIN_ADMIN = "LOGIN_ADMIN";
export const LOG_ADMIN_IN = 'LOG_ADMIN_IN'
export const LOGOUT = 'LOGOUT'
export const GET_THEME = 'GET_THEME'
export const FETCH_CASE = 'FETCH_CASE'
export const UPDATE = 'UPDATE'
export const DELETE = 'DELETE'
export const FETCH_ATTORNEY = 'FETCH_ATTORNEY'
export const DELETE_ATTORNEY = 'DELETE_ATTORNEY'
export const UPDATE_ATTORNEY = 'UPDATE_ATTORNEY'
export const CREATE_ATTORNEY = 'CREATE_ATTORNEY'
export const FETCH_BLOGS = 'FETCH_BLOGS'
export const DELETE_BLOG = 'DELETE_BLOG'

export const CREATE_BLOG = 'CREATE_BLOG'

export const UPDATE_BLOG = 'UPDATE_BLOG'

export const FETCH_BLOGCASES = 'FETCH_BLOGCASES'

export const DELETE_BLOGCASE = 'DELETE_BLOGCASE'

export const CREATE_BLOGCASE = 'CREATE_BLOGCASE'

export const UPDATE_BLOGCASE = 'UPDATE_BLOGCASE'

//pure functions to calculate the time remaining

let calculateRemainingTime = (expiryDate) => {
  //getting current time in milliseconds
  const currentTime = new Date().getMilliseconds()
  //getting expiration time in milliseconds
  const adjustExpirationTime = (expiryDate * 60 * 60 * 1000)
  const timeLeft = adjustExpirationTime - currentTime
  return timeLeft
}

/* admin section */
let retrievedAdminStoredToken = () => {
  let tokenFromStorage = localStorage.getItem('admin_token')
  let expiryDate = localStorage.getItem('admin_expiry')
  const timeLeft = calculateRemainingTime(expiryDate)

  if (timeLeft <= 3600) {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_expiry')
    localStorage.removeItem('admin')

    return {
      adminToken: "",
      adminExpiresIn: ""

    }
  }

  return {
    adminToken: tokenFromStorage,
    adminExpiresIn: timeLeft
  }
}

export const checkIfAdminIsLoggedIn = () => {
  return async (dispatch, getState) => {
    try {
      let response
      //check if token is expired
      let { adminToken, adminExpiresIn } = retrievedAdminStoredToken()

      if (!adminToken) {
        return
      }
      //convert expiresIN backt to hours
      adminExpiresIn = adminExpiresIn / (60 * 60 * 1000)

      localStorage.setItem('admin_token', adminToken)
      localStorage.setItem('admin_expiry', adminExpiresIn)

      let admin = JSON.parse(localStorage.getItem('admin'))

      if (!admin) {
        return
      }
    //https://legal-admin-backend-n8c8.onrender.com
    

    //http://localhlost:9090
      response = await fetch(`https://legal-admin-backend-n8c8.onrender.com/adminbytoken`, {
        method: "GET",
        headers:{
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })

      if (response.status == 200) {
        let data = await response.json()
        data.response.token = adminToken
        dispatch({ type: LOG_ADMIN_IN, payload: data.response })
      }

    } catch (err) {

    }
  }
}

export const loginAdmin = (data) => {
  let dataObj = data
  return async (dispatch, getState) => {
    try {
      let response = await fetch('https://legal-admin-backend-n8c8.onrender.com/adminlogin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: '/adminsignup'
        }
      }

      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: '/adminlogin'
        }
      }


      if (response.status === 200) {
        let data = await response.json()
        //saving credentials to local storage

        localStorage.setItem("admin", JSON.stringify(data.response.admin))

        localStorage.setItem("admin_token", JSON.stringify(data.response.token))

        localStorage.setItem("admin_expiry", JSON.stringify(data.response.expiresIn))
        //dispatch login events
        dispatch({ type: LOGIN_ADMIN, payload: data.response })

        return {
          bool: true,
          message: data.response,
          url: `/admindashboard/cases`
        }
      }
    }
    catch (err) {
      return {
        bool: false,
        message: err.message,
        url: `/adminlogin`
      }
    }
  }

}

export const signupAdmin = (data) => {
  let dataObj = data
  return async (dispatch, getState) => {
    try {
      let response = await fetch(`https://legal-admin-backend-n8c8.onrender.com/adminsignup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })

      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: '/adminsignup'
        }
      }

      if (response.status === 301) {
        let data = await response.json()

        return {
          bool: false,
          message: data.response,
          url: '/adminlogin'
        }
      }
   

      if (response.status === 200) {
        let data = await response.json()

        
        localStorage.setItem("admin", JSON.stringify(data.response.admin))

        localStorage.setItem("admin_token", JSON.stringify(data.response.token))

        localStorage.setItem("admin_expiry", JSON.stringify(data.response.expiresIn))
        //dispatch login events
        dispatch({ type: LOGIN_ADMIN, payload: data.response })


        return {
          bool: true,
          message: data.response,
          url: `/admindashboard/cases`
        }
      }

    }
    catch (err) {
      return {
        bool: false,
        message: err.message,
        url: `/adminsignup`
      }
    }
  }
}

export const fetchCases = ()=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://legal-admin-backend-n8c8.onrender.com/auth/cases`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:FETCH_CASE,payload:data.response.cases})

        return {
          bool: true,
          message: data.response.cases
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}

export const fetchCase = (id)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://legal-admin-backend-n8c8.onrender.com/auth/cases/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()

        
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}
export const updateCase = (data)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://legal-admin-backend-n8c8.onrender.com/auth/case/${data._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
        
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:UPDATE,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }

}

export const deleteCase = (id)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://legal-admin-backend-n8c8.onrender.com/auth/case/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()

        dispatch({type:DELETE,payload:id})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}



//fetch all attorneys
export const fetchAttorneys = ()=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://legal-admin-backend-n8c8.onrender.com/auth/attorneys`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })

      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:FETCH_ATTORNEY,payload:data.response.attorneys })

        return {
          bool: true,
          message: data.response.attorneys
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}

export const  deleteAttorney  = (id)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://legal-admin-backend-n8c8.onrender.com/auth/attorney/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })

      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {

        let data = await response.json()
        dispatch({type:DELETE_ATTORNEY,payload:id})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}

export const updateAttorney = (data)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://legal-admin-backend-n8c8.onrender.com/auth/attorney/${data._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:UPDATE_ATTORNEY,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}

export const createAttorney = (data)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://legal-admin-backend-n8c8.onrender.com/auth/newattorney`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:CREATE_ATTORNEY,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }


}


//blogs API
export const fetchBlogs = ()=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://legal-admin-backend-n8c8.onrender.com/auth/blogs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })

      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()

        dispatch({type:FETCH_BLOGS,payload:data.response })

        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}


export const  deleteBlog  = (id)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://legal-admin-backend-n8c8.onrender.com/auth/blog/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })

      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {

        let data = await response.json()

        dispatch({type:DELETE_BLOG,payload:id})

        return {
          bool: true,
          message: data.response
        }
      }
    }


    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}

export const createBlog = (data)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://legal-admin-backend-n8c8.onrender.com/auth/newblog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:CREATE_BLOG,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }


}

export const updateBlog = (data)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://legal-admin-backend-n8c8.onrender.com/auth/blog/${data._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:UPDATE_BLOG,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}




//case blogs action
export const fetchBlogCases = ()=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://legal-admin-backend-n8c8.onrender.com/auth/blogcases`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })

      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()

        dispatch({type:FETCH_BLOGCASES,payload:data.response })

        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}




export const  deleteBlogCase  = (id)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://legal-admin-backend-n8c8.onrender.com/auth/blogcase/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })

      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {

        let data = await response.json()

        dispatch({type:DELETE_BLOGCASE,payload:id})

        return {
          bool: true,
          message: data.response
        }
      }
    }
    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}

export const createBlogCase = (data)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://legal-admin-backend-n8c8.onrender.com/auth/newblogcase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:CREATE_BLOGCASE,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }


}


export const updateBlogCase = (data)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://legal-admin-backend-n8c8.onrender.com/auth/blogcase/${data._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:UPDATE_BLOGCASE,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}



export const logout = (id)=>{
  return async (dispatch, getState) => {

  }

}



/*

  
   


*/

















