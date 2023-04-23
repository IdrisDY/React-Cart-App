import React from 'react';
import { ChevronDown, ChevronUp } from '../../icons';
import { removeItem ,toggleChange} from '../features/slice';
import { useDispatch } from 'react-redux';
const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch()
  const obj = 
  { 
    inc:{
       id,
        type:'increase'},
      dec:{
          id,
           type:'decrease'}
   
  }

  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        {/* remove button */}
        <button  onClick={() => {
        dispatch(removeItem(id));
      }} className='remove-btn'>remove</button>
      </div>
      <div>
        {/* increase amount */}
        <button className='amount-btn' onClick={()=>{amount >= 0 && dispatch(toggleChange(obj.inc))}} >
          <ChevronUp />
        </button>
        {/* amount */}
        <p className='amount'>{amount}</p>
        {/* decrease amount */}
        <button className='amount-btn' onClick={()=>{amount >= 1 && dispatch(toggleChange(obj.dec))}} >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;