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

//get all product subcategory
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

//add product category
export const addCategoryApi=async(data)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_Url}/add-category`,'POST',data,header)
}

//add product subcategory
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

//update  product
export const updateProductApi=async(id,reqBody)=>{
     const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_Url}/product/${id}`,'PUT',reqBody,header)
}

//add wishlist
export const addWishlistApi=async(reqBody)=>{
     const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_Url}/add-wishlist`,'POST',reqBody,header)
}

//get wishlist
export const getWishlistApi=async(userId)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_Url}/wishlist/${userId}`,'GET',"",header)
}

//remove wishlist
export const removeWishlistApi=async(id)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_Url}/wishlist/${id}`,'DELETE',"",header)
}