import commonApi from "./commonApi";
import base_Url from "./base_Url";

// signup api request
export const signupApi=async(data)=>{
    return await commonApi(`${base_Url}/signup`,'POST',data,'')
}

//signin api 
export const signinApi=async(data)=>{
    return await commonApi(`${base_Url}/signin`,'POST',data,'')
}