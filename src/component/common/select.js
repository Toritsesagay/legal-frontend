import React, {useCallback,useEffect } from "react"
import styles from './select.module.css'


const SelectInput = (props) => {
   useEffect(()=>{
        props.setFormDetails({
            value: props.option_1,
            formName: props.formName
        })
    },[props])
    

    let selectFunction = useCallback((e) => {
        props.setFormDetails({
            value: e.target.value,
            formName: props.formName
        })
    },[props])


    return <div className={styles.form_selectcontainer} >

        <div className={styles.categoryhead}>
            <span className="material-icons">
                {props.icon}
            </span>
            <h3>{props.label}</h3>

        </div>


        <div className={styles.categorybody}>
            <select className={styles.selectInput} onChange={selectFunction}  >
                <option selected>
                    {props.option_1}
                </option>
                <option>
                    {props.option_2}
                </option>
                <option>
                    {props.option_3}
                </option>
                <option>
                    {props.option_4}
                </option>
                <option>
                    {props.option_5}
                </option>
                <option>
                    {props.option_6}
                </option>
                <option>
                    {props.option_7}
                </option>
                <option>
                    {props.option_8}
                </option>
                <option>
                    {props.option_9}
                </option>
                <option>
                    {props.option_10}
                </option>
                <option>
                    {props.option_11}
                </option>
                <option>
                    {props.option_12}
                </option>
                <option>
                    {props.option_13}
                </option>
                <option>
                    {props.option_14}
                </option>
                <option>
                    {props.option_15}
                </option>
                <option>
                    {props.option_16}
                </option>
                <option>
                    {props.option_17}
                </option>
                <option>
                    {props.option_18}
                </option>
                <option>
                    {props.option_19}
                </option>
                <option>
                    {props.option_20}
                </option>
                <option>
                    {props.option_21}
                </option>
                <option>
                    {props.option_22}
                </option>
               
            </select>
        </div>

    </div>

}

export default React.memo(SelectInput)