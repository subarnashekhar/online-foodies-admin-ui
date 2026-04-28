import axios from "axios";
import { API_URL } from './axiosConfig';

export const addFood = async (foodData, image) => {
    const formData = new FormData();    
    formData.append('food', JSON.stringify(foodData));
    formData.append('file', image); 

    try {
        await axios.post(API_URL, formData, {headers: { "Content-Type": "multipart/form-data", "Authorization": "Bearer " + localStorage.getItem('token')  }});
    } catch (error) {
        console.log('Error', error);
        throw error;
    }
}

export const getFoodList = async () => {
    try {
        const response = await axios.get(API_URL, {headers: { "Authorization": "Bearer " + localStorage.getItem('token')  }});
        return response.data;
    } catch (error) {
        console.log('Error fetching food list', error);
        throw error;
    }
}

export const deleteFood = async (foodId) => {
    try {
        const response = await axios.delete(API_URL+"/"+foodId, {headers: { "Authorization": "Bearer " + localStorage.getItem('token')  }});
        return response.status === 204;
    } catch (error) {
        console.log('Error while deleting the food.', error);
        throw error;
    }
}