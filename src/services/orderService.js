import axios from "axios";
import { ORDER_API_URL } from './axiosConfig';

export const fetchAllOrders = async () => {

    console.log("Fetching all the orders from the backend...");
    console.log("Token in local storage: " + localStorage.getItem('token'));
    try {
        const response = await axios.get(ORDER_API_URL+"/all", {headers: { "Authorization": "Bearer " + localStorage.getItem('token')  }});
        return response.data;
    } catch (error) {
        console.error('Error occured while fetching the orders', error);
        throw error;
    }
}

export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await axios.patch(
            `${ORDER_API_URL}/status/${orderId}?status=${status}`,
            null,
            {headers: { "Authorization": "Bearer " + localStorage.getItem('token')  }}
        );
        return response.status === 200;
    } catch (error) {
        console.error('Error occured while updating the status', error);
        throw error;
    }
}