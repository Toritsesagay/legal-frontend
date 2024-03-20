import React from 'react';
import styles from './submit.module.css';
import { useSelector} from "react-redux";


let data = [
    { buttonText: '1' },
    { buttonText: '2' }
    , { buttonText: '3' }
    , { buttonText: '4'}
    , { buttonText: '5' },
    { buttonText: '6' },
    { buttonText: '7' },
    { buttonText: '8' },
    { buttonText: '9 '},
    { buttonText: '.' },
    { buttonText: '0' },]



export const Submit = ({buttonClick,deleteHandler, continueHandler,point}) => {

    let { color } = useSelector(state => state.userAuth)

    return (
        <div className={styles.submitSession}>
            <div className={styles.buttonOuterContainer}>
                <div className={styles.buttonContainer}>
                    {data.map(data => <button key={data.buttonText} onClick={()=>{
                        if(data.buttonText === '.'){
                            return point()
                        }
                        buttonClick(data.buttonText)
                    
                    }} style={{color:color.importantText}}>{data.buttonText}</button>)}
                    <button onClick={deleteHandler}>
                        <span className='material-icons' style={{color:color.importantText}}>
                            arrow_back
                        </span>
                    </button>

                </div>

            </div>

            <div className={styles.submitCon}>
                <button onClick={ continueHandler} >Continue</button>
            </div>


        </div>
    )
}
