import React from 'react';
import '../styles/modal-window.scss';
import Dropdown from '../common/dropdown/Dropdown';

class ModalWindow extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  resetThenSet = (id, key, dropdownType) => {

    this.setState({dataid: this.props.item.p_id});
    if(dropdownType === 'size'){
      this.setState({dataid: this.props.item.p_id});
      this.setState({size: id});
    }
    if(dropdownType === 'qty'){
      this.setState({dataid: this.props.item.p_id});
      this.setState({qty: id});
    }
  }

  onHandleEdit = () => {
    this.props.onModalEdit(this.state);
  }

  onHandleColorChange = (event) => {
    const selectedColor = event.currentTarget.getAttribute("data-color");
    this.setState({dataid: this.props.item.p_id, color: selectedColor});
  }

  mapColor = (color, index) => {
    return (
      <div data-color={color.name} key={index} onClick={this.onHandleColorChange} className="color-block" style={{backgroundColor: color.hexcode}}></div>
    );
  }

  render(){
    let {item, onClose} = this.props;
    return(
      <div className="modal">
      <div className="modal-container">
          <div className="close-button" onClick={onClose}>X</div>
          <div className="details">
            <img className="mobile-item-img" src={item.p_img} />
            <div className="item-details">
              <div className="name">{item.p_name}</div>
              <div className="price">
                {item.c_currency}  <span>{item.p_price.toFixed(2)}</span>
              </div>
              <div className="variation">{item.p_variation}</div>
              <div className="available-colors">
                {item.p_available_options.colors.map(this.mapColor)}
              </div>
              <div className="available-size">
                <Dropdown
                    title="SIZE"
                    list={item.p_available_options.sizes}
                    resetThenSet={this.resetThenSet}
                    dropdownType="size"
                  />
                <Dropdown
                    title="QTY"
                    list={[{name:'1', code: 1},{name:'2', code: 2},{name:'3', code: 3}]}
                    resetThenSet={this.resetThenSet}
                    dropdownType="qty"
                  />
              </div>

              <div className="edit-button" onClick={this.onHandleEdit}>EDIT</div>
            </div>
            <img className="item-img" src={item.p_img} />
          </div>
      </div>
      </div>
    );
  }
}

export default ModalWindow;
