import React, { useState, useCallback } from 'react';
import styles from '../../Login.module.css';
import FormInput from '../../../component/common/input';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import SubmitBtn from "../../../component/common/Submit";
import { loginAdmin } from "../../../store/action/userAppStorage";


//importing modals
import LoadingModal from "../../../component/Modal/LoadingModal";




function LoginPage() {

    let [userEmail, setUserEmail] = useState("")
    let [userEmailError, setUserEmailError] = useState("")
    let [userPassword, setUserPassword] = useState("")
    let [userPasswordError, setUserPasswordError] = useState("")

    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')
    let [isLoading, setIsLoading] = useState(false)
    //initialising reduzx
    let dispatch = useDispatch()
    let { color } = useSelector(state => state.userAuth)
    //initialise router
    let navigate = useNavigate()
    //loaders state
    let isFormValid = userEmail && !userEmailError && userPassword && !userPasswordError

    let toLogin =()=>{
        navigate('/adminsignup')
    }

    let setFormDetails = useCallback(e => {
        setIsError(false)
        if (e.formName === "userEmail") {
            let formValue = e.value
            setUserEmail(formValue)
            setUserEmailError(e.error)

        } else if (e.formName === "userPassword") {
            let formValue = e.value
            setUserPassword(formValue)
            setUserPasswordError(e.error)

        }


    }, [])


    const submitHandler = async (e) => {
        e.preventDefault()
        if (!isFormValid) {
            return
        }
        setIsLoading(true)
        let response = await dispatch(loginAdmin({
            email: userEmail,
            password: userPassword
        }))

        if (!response.bool) {
            setIsLoading(false)
            setIsError(true)
            setIsErrorInfo(response.message)
            setTimeout(() => {
                navigate(`${response.url}`)
            }, 3000)


        }else{
            setIsLoading(false)
            setTimeout(() => {
                navigate(`${response.url}`)
            }, 3000)
        }
    }


    return (<>

        <div className={styles.screenContainer}>
            <div className={styles.leftContainer}>
                <h1>ADMIN LOGIN</h1>
            </div>

            <div className={styles.rightContainer}>

                {isLoading && <LoadingModal />}
                <form className={styles.rightformcontainer} onSubmit={submitHandler}>
                    <div className={styles.navigate}>
                        <span className='material-icons' >arrow_backward</span>

                    </div>




                    <div className={styles.inputcontainer}>
                        <h2>SignIn to dashboard</h2>

                        <div className={styles.formCard}>
                            <FormInput
                                icon='edit'
                                label='Email'
                                type='email'
                                types="email"
                                className="formcard"
                                formName="userEmail"
                                placeholder='Enter your email address'
                                setFormDetails={setFormDetails}
                            />

                        </div>

                        <div className={styles.formCard}>
                            <FormInput
                                icon='edit'
                                label='Password'
                                type='number'
                                className="formcard"
                                setFormDetails={setFormDetails}
                                formName="userPassword"
                                placeholder='Enter your password'
                            />

                        </div>

                    </div>





                    <div className={styles.submit}>
                        <SubmitBtn style={{ opacity: isFormValid ? 1 : 0.5, borderRadius: '8px', marginBottom: '20px' }} text="Login" />

                        {isError && <p className={styles.errorText} >{isErrorInfo}</p>}


                    </div>

                    <p className={styles.alternative}> Don't have an account yet ? <span onClick={toLogin}>signup</span></p>

                </form>

            </div>


        </div>
    </>

    );
}

export default LoginPage