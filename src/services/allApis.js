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

//add category
export const addCategoryApi=async(data)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_Url}/add-category`,'POST',data,header)
}

//add subcategory
export const addSubCategoryApi=async(data)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_Url}/add-subcategory`,'POST',data,header)
}

//add product
export const addProductApi=async(data)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_Url}/add-products`,'POST',data,header)
}