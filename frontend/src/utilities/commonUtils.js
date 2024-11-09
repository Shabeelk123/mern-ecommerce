import axios from "axios";
import { setAllProducts } from "../store/productSlice";

export const createProduct = async (product) => {
    try {
        const createdProduct = await axios.post('/api/products', product, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const response = await createdProduct.data;
        console.log('Created product:', response);
        return response;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const getProducts = async (dispatch) => {
    try {
        const createdProduct = await axios.get('/api/products');
        console.log('hello', createdProduct);

        const response = await createdProduct.data;
        console.log('Created product:', response);
        dispatch(setAllProducts(response.data));
        return response;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const deleteProduct = async (productId, dispatch) => {
    try {
        await axios.delete(`/api/products/${productId}`);
        
        // Refetch products after deletion to update the list
        const updatedProducts = await axios.get('/api/products');
        dispatch(setAllProducts(updatedProducts.data.data));
        
        console.log('Product deleted successfully');
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

export const updateProduct = async (productId, updatedData) => {
    try {
      const response = await axios.put(`/api/products/${productId}`, updatedData);
      return response.data; // Return updated product data
    } catch (error) {
      console.error('Error updating product:', error);
      throw error; // Re-throw the error for error handling in the component
    }
  };
