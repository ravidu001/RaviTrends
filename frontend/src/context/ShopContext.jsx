import { createContext, useEffect, useState } from "react";

import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const [search,setSearch] = useState('');    
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
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
    
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount, updateQunatity,
        getCartAmount, navigate,
    }
    
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;