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

//get all products 
export const getAllProductsApi=async(searchKey,subCategoryId,page)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_Url}/all-products?search=${searchKey}&subcategory=${subCategoryId}&page=${page}`,'GET',{},header)
}

//get all categories
export const getAllCategoriesApi=async()=>{
     const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_Url}/all-category`,'GET',{},header)
}

//get all subcategory
export const getAllSubCategoriesApi=async()=>{
     const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_Url}/all-subcategory`,'GET',{},header)
}

//get single product 
export const getSingleProductApi=async (id)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_Url}/single-product/${id}`,'GET',{},header)
}