import React, { useState, useCallback } from 'react';
import styles from '../../Login.module.css';
import FormInput from '../../../component/common/input';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import SubmitBtn from "../../../component/common/Submit";


//importing modals
import LoadingModal from "../../../component/Modal/LoadingModal";
import { signupAdmin } from '../../../store/action/userAppStorage';




function SignupPage() {
    let [adminEmail, setAdminEmail] = useState("")
    let [adminEmailError, setAdminEmailError] = useState("")
    let [adminPassword, setAdminPassword] = useState("")
    let [adminPasswordError, setAdminPasswordError] = useState("")
    let [isSecretKey, setIsSecretKey] = useState("")

    let [isSecretKeyError, setIsSecretKeyError] = useState("")

    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')
    let [isLoading, setIsLoading] = useState(false)
    //initialising reduzx
    let dispatch = useDispatch()
    let { color } = useSelector(state => state.userAuth)
    //initialise router
    let navigate = useNavigate()
    //loaders state

    let isFormValid =  adminPassword && !adminPasswordError && isSecretKey &&!isSecretKeyError && !adminEmailError && adminEmail

    let toLogin = ()=>{
        navigate('/adminlogin')
    }

    let setFormDetails = useCallback(e => {
        if (e.formName === "adminEmail") {
            let formValue = e.value
            setAdminEmail(formValue)
            setAdminEmailError(e.error)
        } else if (e.formName === "adminPassword") {
            let formValue = e.value
            setAdminPassword(formValue)
            setAdminPasswordError(e.error)
        } else if (e.formName === "adminSecretKey") {
            let formValue = e.value
            setIsSecretKey(formValue)
            setIsSecretKeyError(e.error)
        }
    }, [])


    const submitHandler = async (e) => {
        e.preventDefault()
        if (!isFormValid) {
            return
        }
        setIsLoading(true)

        let response = await dispatch(signupAdmin({
            email: adminEmail,
            password: adminPassword,
            secretKey:isSecretKey
        }))

        if (!response.bool) {
            setIsLoading(false)
            setIsError(true)
            setIsErrorInfo(response.message)
            setTimeout(() => {
                navigate(`${response.url}`)
            }, 3000)


        }else{
            setTimeout(() => {
                navigate(`${response.url}`)
            }, 3000)

        }
    }

    return (<>

        <div className={styles.screenContainer}>
            <div className={styles.leftContainer}>
                <h1>Admin Signup</h1>
            </div>

            <div className={styles.rightContainer}>
                {isLoading && <LoadingModal />}

                <form className={styles.rightformcontainer} onSubmit={submitHandler}>
                    <div className={styles.navigate}>
                        <span className='material-icons' >arrow_backward</span>

                    </div>


                    <div className={styles.inputcontainer}>
                        <h2>Create account</h2>

                        <div className={styles.formCard}>
                            <FormInput
                                icon='edit'
                                label='Email'
                                type='email'
                                types="email"
                                className="formcard"
                                formName="adminEmail"
                                placeholder='Enter your email address'
                                setFormDetails={setFormDetails}
                            />

                        </div>


                        <div className={styles.formCard}>
                            <FormInput
                                icon='edit'
                                label='Password'
                                type='number'
                                types='password'
                                className="formcard"
                                setFormDetails={setFormDetails}
                                formName="adminPassword"
                                placeholder='Enter your password'
                            />

                        </div>



                        <div className={styles.formCard}>
                            <FormInput
                                icon='edit'
                                label='Secret Key'
                                type='text'
                                types='text'
                                className="formcard"
                                setFormDetails={setFormDetails}
                                formName="adminSecretKey"
                                placeholder='Enter Secret Key'
                            />

                        </div>

                    </div>







                    <div className={styles.submit}>
                        <SubmitBtn style={{ opacity: isFormValid ? 1 : 0.5, borderRadius: '8px' }} text="Create your account" />

                        {isError && <p className={styles.errorText} >{isErrorInfo}</p>}


                    </div>


                    <p className={styles.terms}>By signing up you agree to our <span>terms</span> and <span>conditions</span></p>




                    <p className={styles.alternative}> Already have account ? <span onClick={toLogin}>Login</span></p>

                </form>

            </div>


        </div>
    </>

    );
}

export default SignupPage