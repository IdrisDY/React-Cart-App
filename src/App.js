import Navbar from "./Component/UIComponents/Navbar";
import CartContainer from "./Component/UIComponents/cartContainer";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { calculateTotals,getCartItems } from './Component/features/slice';
import Modal from "./Component/UIComponents/Modal";
function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);
  const { isOpen } = useSelector((state) => state.modal);

useEffect(() => {
  dispatch(getCartItems());
}, [])

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return(
    <main>
    {isOpen && <Modal />}
       <Navbar/>
       <CartContainer/>

    </main>
  )
}
export default App;
