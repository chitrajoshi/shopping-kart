import React from 'react';

const Item = ({item, onClickEditItem, onClickRemoveItem}) => {
  return(
    <>
      <div className="shopping-bag-cart-items-details">
        <img className="item-image" src={item.p_img} />
        <div className="item-details">
          <div className="items">
            <div className="item-name">{item.p_variation} <br/> {item.p_name}</div>
            <div className="item-style">Style #: <span>{item.p_style}</span></div>
            <div className="item-color">Color : <span>{item.p_selected_color.name}</span></div>
          </div>
          <div className="size"><span className="size-title">SIZE :</span> {item.p_selected_size.code}</div>
          <div className="quantity"><span className="qty-title">QTY :</span> <span className="qty-value">{item.p_quantity}</span></div>
          <div className="price">{item.c_currency} <span>{item.p_price.toFixed(2)}</span></div>
        </div>
      </div>
        <div className="item-actions-container">
          <div dataid={item.p_id} onClick={onClickEditItem}>EDIT</div>
          <div data-id={item.p_id} onClick={onClickRemoveItem}>REMOVE</div>
          <div>SAVE FOR LATER</div>
        </div>
    </>
  );
}

export default Item;
