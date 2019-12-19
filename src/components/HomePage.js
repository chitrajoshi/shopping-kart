import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from "../actions/itemsAction";
import '../styles/home-page.scss';
import Item from './Item';
import ModalWindow from './ModalWindow';

class HomePage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isOpenModal: false,
      currentId: ''
    }
  }

  componentDidMount(){
    this.props.actions.get_all_items();
  }

  onClickEditItem = (event) => {
    const id = event.currentTarget.getAttribute("dataid");
    const index = this.props.items.findIndex((item) => item.p_id === id);
    this.setState({isOpenModal: true, currentId: index});
  }

  onClickRemoveItem = (event) => {
    const id = event.currentTarget.getAttribute("data-id");
    this.props.actions.remove_item(id);
  }

  onCloseModal = (event) => {
    this.setState({isOpenModal: false});
  }

  onModalEdit = (event) => {
    this.setState({isOpenModal: false});
    this.props.actions.edit_item(event);
  }

  mapCartItems = (item, index) => {
    return(
      <li key={item.p_id}>
        <Item
          item={item}
          onClickEditItem = {this.onClickEditItem}
          onClickRemoveItem = {this.onClickRemoveItem}
         />
      </li>
    );
  }

  calculateDiscount(discPerc, subTotal) {
    return ((discPerc/100)*subTotal);
  }

  render(){
    let subTotal = 0, estimatedQty = 0, estimatedTotal = 0, estimatedDiscount = 0;
    let promotionCode = 'JF';

    this.props.items.forEach((item)=>{
      subTotal += item.p_price * item.p_quantity;
      estimatedQty += item.p_quantity;
    });

    if(estimatedQty === 3 ){
      promotionCode += '5';
      estimatedDiscount = this.calculateDiscount(5, subTotal);
      estimatedTotal = subTotal - estimatedDiscount;
    } else if (estimatedQty > 3 && estimatedQty < 11){
      promotionCode += '10';
      estimatedDiscount = this.calculateDiscount(10, subTotal);
      estimatedTotal = subTotal - estimatedDiscount;
    } else if (estimatedQty > 11){
      promotionCode += '25';
      estimatedDiscount = this.calculateDiscount(25, subTotal);
      estimatedTotal = subTotal - estimatedDiscount;
    } else {
      estimatedTotal = subTotal - estimatedDiscount;
    }

    return (
      <>
       <div className="shopping-bag-container">
        <div className="heading-container">
          <h1>YOUR SHOPPING BAG</h1>
          <span className="mobile-items">{estimatedQty} items</span>
        </div>

        <div className="shopping-bag-cart-title">
          <div className="items-title">{estimatedQty} items</div>
          <div className="size-title">SIZE</div>
          <div className="quantity-title">QTY</div>
          <div className="price-title">PRICE</div>
        </div>
        <div className="shopping-bag-cart-items">
          <ul>
            {this.props.items.map(this.mapCartItems)}
          </ul>
        </div>
        <div className="price-estimation-conatiner">
          <div className="sub-total-section">
            <div className="title">SUBTOTAL</div>
            <div className="value">$ {subTotal.toFixed(2)}</div>
          </div>
          <div className="estimated-shipping-section">
            <div className="title">ESTIMATED SHIPPING</div>
            {/* As no fare price and logic provided for less than $50 shopping, assuming free shipping for all items. */}
            <div className="value">FREE</div>
          </div>
          <div className="promotion-code-section">
            <div className="title">PROMOTION CODE <span>{promotionCode}</span> APPLIED</div>
            <div className="value"> - $ {estimatedDiscount.toFixed(2)}</div>
          </div>
          <div className="estimated-total-section">
            <div className="title">ESTIMATED TOTAL</div>
            <div className="value">$ {estimatedTotal.toFixed(2)}</div>
          </div>
          <div className="checkout-button">CHECKOUT</div>
        </div>
      </div>
      {this.state.isOpenModal
      && <ModalWindow
          item={this.props.items[this.state.currentId]}
          onClose={this.onCloseModal}
          onModalEdit={this.onModalEdit} />}
      </>
    );
  }
};

HomePage.propTypes = {
  items: PropTypes.array,
  actions: PropTypes.object
}

function mapStateToProps(state) {
  return {
    items: state.itemReducer.productsInCart
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

