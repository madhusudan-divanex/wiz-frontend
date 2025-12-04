import { getApiData, getSecureApiData } from "../services/api";

// utils/handleChange.js
export const handleChange = (setState) => (event) => {
  const { name, value, type, checked } = event.target;
  setState(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value
  }));
};
export const categoryData = async() => {
  try {
    const result=await getSecureApiData('get-category')
    if(result.status){
      return result.categoryData
    }
  } catch (error) {
    return []
  }
};

export const contactData= async() => {
  try {
    const result=await getApiData('cms/contact')   
    if(result.success){
      return result.data
    } 
  } catch (error) {
    return []
  }
};

