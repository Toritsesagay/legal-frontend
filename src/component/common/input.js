import React, {  useState } from "react"
import styles from './input.module.css'

//import validationfunctions from validation file
import { validatePhoneNumber, validateEmail, validateText,validatePassword } from '../../utils/validation'

const FormInput = React.memo((props) => {
    let [error, setError] = useState('')
    
    let changeText = (e) => {
        let validateFunction
        if (props.type === 'email') {
            validateFunction = validateEmail
            if (!validateFunction(e.target.value)) {
                setError(validateFunction(e.target.value))
                props.setFormDetails({
                    value: e.target.value,
                    formName: props.formName,
                    error:false
                })
                setError("")
            } else {
                let error = validateFunction(e.target.value)
    
                setError(error)
                props.setFormDetails({
                    value: e.target.value,
                    formName: props.formName,
                    error:true
                })
    
            }
        } 
        else if(props.types === 'password'){
          
            validateFunction = validateText
            if (!validatePassword(e.target.value)) {
                setError(validatePassword(e.target.value))
                
                
                props.setFormDetails({
                    value: e.target.value,
                    formName: props.formName,
                    error:false
                })
               
    
            } else {
                let error = validatePassword(e.target.value)
    
                setError(error)
                props.setFormDetails({
                    value: e.target.value,
                    formName: props.formName,
                    error:true
                })
            }
        }
        
        else if (props.type === 'number' && !props.types) {
            validateFunction = validatePhoneNumber
            if (!validateFunction(e.target.value)) {
                setError(validateFunction(e.target.value))
                props.setFormDetails({
                    value: e.target.value,
                    formName: props.formName,
                    error:false
                })
    
            } else {
                let error = validateFunction(e.target.value)
                setError(error)
                props.setFormDetails({
                    value: e.target.value,
                    formName: props.formName,
                    error:true
                })
            }

        }else if(props.type === 'text'){
            validateFunction = validateText
            if (!validateFunction(e.target.value)) {
                setError(validateFunction(e.target.value))
                
                props.setFormDetails({
                    value: e.target.value,
                    formName: props.formName,
                    error:false
                })
               
    
            } else {
                let error = validateFunction(e.target.value)
                setError(error)
                props.setFormDetails({
                    value: e.target.value,
                    formName: props.formName,
                    error:true
                })
            }
        }
        else if(props.type === 'file'){
            validateFunction = validateText
           
                props.setFormDetails({
                    value: e.target.files[0],
                    formName: props.formName,
                    
                })
             
        }
        
    }

    return <div className={styles.form_inputcontainer} >
        <div className={styles.categoryhead}>
            <h3>{props.label}</h3>
        </div>

        <div className={styles.categorybody}>
            <input style={{ height: props.height }}
                type={props.type}
                className={`${styles.input} ${props.class}`}
                onChange={changeText}
                value = {props.value}
                placeholder = {props.placeholder}
                required={true}
            />
        </div>
        {error ? <p className={styles.error}>{error}</p> : ""}
    </div>

})

export default FormInput  