import { createContext, useEffect, useState } from "react";

import axios from "axios"
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL; 
    const [search,setSearch] = useState('');    
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        
        let cartData = structuredClone(cartItems);

        if (!size) {
            toast.error('Please select a product size');
            return;
        }

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1; // Increment quantity if item already exists
            }
            else {
                cartData[itemId][size] = 1; // Add new size with quantity 1
            }
        }
        else {
            cartData[itemId] = {}; 
            cartData[itemId][size] = 1; // Add new item with size and quantity 1
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', {itemId, size}, { headers:{token} });
                
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0){
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    const updateQunatity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        if (quantity <= 0) {
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId]; // remove item completely if no sizes left
            }
        } else {
            cartData[itemId][size] = quantity;
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, {headers: {token}});
                
            } catch (error) {
                console.log(error);
                toast.error(error.message);
                
            }
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0){
                        const product = products.find(product => product._id === items);
                        if (product) {
                            totalAmount += product.price * cartItems[items][item];
                        }
                    }
                } catch (error) {
                    console.error('Error calculating cart amount:', error);
                }
            }
        }
        return totalAmount;  
    }

    useEffect(() => {
        // console.log('Cart Items Updated:', cartItems);
    }, [cartItems]);

    const getProductsData = async () => {
        try {
            
            const response = await axios.get(backendUrl + '/api/product/list')
            // console.log(response.data);
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers: {token}});
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    
    useEffect(()=> {
        getProductsData();
    },[])

    useEffect(()=> {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    },[])
    
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQunatity,
        getCartAmount, navigate, backendUrl,
        setToken, token, 
    }
    
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;