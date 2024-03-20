export const validateEmail = (data)=>{
    let error = ""
    if(data.length === 0 ){
        error="field should not be empty"
    }
    else if(data.length <=4 ){
        error="characters size too small"
    }
    else if(!data.match(/^\w+([\.-]?w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        error="email is not valid"
    }
    else{
        error = ""
    }
    return error
}

export const validateText = (data)=>{
    
    let error = ""
    if(data.length === 0 ){
        error="field should not be empty"
        return error
    }
    else if(data.length <= 2 ){
        error="character too small"
        return error
    }
     
    else if(!data.match(/[a-zA-Z]/g)){
        error="text is not valid"
        return error
    }
    else{
        error = ""
        return error
    }
    
}
export const validatePhoneNumber = (data)=>{
    let error = ""
    if(data.length === 0 ){
        error="field should not be empty"
    }
    else if(data.length <= 2 ){
        error="characters size too small"
    }
    else if(!data.match(/[0-9]/g)){
        error="number is not valid"
    }
    else{
        error = ""
    }
    return error
}




export const validatePassword = (data)=>{
    
    let error = ""
    if(data.length === 0 ){
        error="field should not be empty"
        return error
    }
    else if(data.length < 7 ){
        error="password should be 7 digit"
        return error
    }
     else if(data.length > 7 ){
        error="password should be 7 digit"
        return error
    }
   
    else{
        error = ""
        return error
    }
    
}

export const addTrailingSpaces = (stringToFormat)=>{
    let newString = stringToFormat.split('')
    let str = []
    for(let i =0;i< newString.length;i++){
        if(i == 3 || i === 7 || i == 11){
            str.push(newString[i])
            str.push(" ")
        }else{
            str.push(newString[i])
        }
    }
    return str.join("")


}

