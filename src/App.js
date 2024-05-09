import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer.js";
import { useEffect } from "react";
import { getCartItems } from "./features/cart/cartSlice.js";

import { useDispatch, useSelector } from "react-redux";
import { calculateTotals } from "./features/cart/cartSlice.js";
import Modal from "./components/Modal.js";





function App() {
  const {cartItems,isLoading} = useSelector((store)=>store.cart)
  const {isOpen} = useSelector((store)=>store.modal)
  const dispatch = useDispatch()
useEffect(() => {
dispatch(getCartItems())
  
}, [dispatch])


  useEffect(() => {
    dispatch(calculateTotals())
  
  }, [dispatch,cartItems])
  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }

  
  return <main>
    {isOpen &&
    <Modal/>}
    <Navbar/>
    <CartContainer/>
  </main>;
}
export default App;
