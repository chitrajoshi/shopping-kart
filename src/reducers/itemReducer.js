import * as types from '../constants/actionTypes';

const initialState = {productsInCart: [
  {
  "p_id": "1",
  "p_img": "../images/T1.jpg",
  "p_name": "cotton tshirt",
  "p_variation": "solid green",
  "p_style": "ms13kt1906",
  "p_selected_color": {
    "name": "blue",
    "hexcode": "#1169BD"
  },
  "p_selected_size": {
    "name": "small",
    "code": "s"
  },
  "p_available_options": {
    "colors": [{
        "name": "green",
        "hexcode": "#A3D2A1"
      },
      {
        "name": "yellow",
        "hexcode": "#F9F8E6"
      },
      {
        "name": "red",
        "hexcode": "#ED99A8"
      }
    ],
    "sizes": [{
        "name": "small",
        "code": "s"
      },
      {
        "name": "medium",
        "code": "m"
      },
      {
        "name": "large",
        "code": "l"
      },
      {
        "name": "extra large",
        "code": "xl"
      }
    ]
  },
  "p_quantity": 1,
  "p_originalprice": 11.0,
  "p_price": 11.0,
  "c_currency": "$"
},
{
  "p_id": "2",
  "p_img": "../images/T2.jpg",
  "p_name": "print girls tee",
  "p_variation": "pink rainbow",
  "p_style": "ms13kt1906",
  "p_selected_color": {
    "name": "pink",
    "hexcode": "#F1DDEF"
  },
  "p_selected_size": {
    "name": "small",
    "code": "s"
  },
  "p_available_options": {
    "colors": [{
        "name": "green",
        "hexcode": "#A3D2A1"
      },
      {
        "name": "yellow",
        "hexcode": "#F9F8E6"
      },
      {
        "name": "pink",
        "hexcode": "#F1DDEF"
      }
    ],
    "sizes": [{
        "name": "small",
        "code": "s"
      },
      {
        "name": "medium",
        "code": "m"
      },
      {
        "name": "large",
        "code": "l"
      },
      {
        "name": "extra large",
        "code": "xl"
      }
    ]
  },
  "p_quantity": 1,
  "p_originalprice": 17.0,
  "p_price": 17.0,
  "c_currency": "$"
},
{
  "p_id": "3",
  "p_img": "../images/T3.jpg",
  "p_name": "flower pattern shirt",
  "p_variation": "blue",
  "p_style": "ms13kt1906",
  "p_selected_color": {
    "name": "blue",
    "hexcode": "#1169BD"
  },
  "p_selected_size": {
    "name": "small",
    "code": "s"
  },
  "p_available_options": {
    "colors": [{
        "name": "green",
        "hexcode": "#A3D2A1"
      },
      {
        "name": "blue",
        "hexcode": "#1169BD"
      },
      {
        "name": "red",
        "hexcode": "#ED99A8"
      }
    ],
    "sizes": [{
        "name": "small",
        "code": "s"
      },
      {
        "name": "medium",
        "code": "m"
      },
      {
        "name": "large",
        "code": "l"
      },
      {
        "name": "extra large",
        "code": "xl"
      }
    ]
  },
  "p_quantity": 1,
  "p_originalprice": 21.0,
  "p_price": 9.0,
  "c_currency": "$"
},
{
  "p_id": "4",
  "p_img": "../images/T4.jpg",
  "p_name": "check pattern tshirt",
  "p_variation": "mens red",
  "p_style": "ms13kt1906",
  "p_selected_color": {
    "name": "red",
    "hexcode": ""
  },
  "p_selected_size": {
    "name": "small",
    "code": "s"
  },
  "p_available_options": {
    "colors": [{
        "name": "green",
        "hexcode": "#A3D2A1"
      },
      {
        "name": "yellow",
        "hexcode": "#F9F8E6"
      },
      {
        "name": "red",
        "hexcode": "#ED99A8"
      }
    ],
    "sizes": [{
        "name": "small",
        "code": "s"
      },
      {
        "name": "medium",
        "code": "m"
      },
      {
        "name": "large",
        "code": "l"
      },
      {
        "name": "extra large",
        "code": "xl"
      }
    ]
  },
  "p_quantity": 1,
  "p_originalprice": 22.0,
  "p_price": 22.0,
  "c_currency": "$"
}
]};

const ItemListReducer = (state = initialState, actions) => {
  switch(actions.type){
    case types.GET_ALL_ITEMS_SUCCESS: {
      return state;
    }

    case types.EDIT_ITEM: {
      const id = Number(actions.data.dataid);
      const newState = Object.assign({}, state);

      let newProducts = [...newState.productsInCart];
      const index = newProducts.findIndex(item=> item.p_id == id);

      const changedItem = Object.assign({}, newProducts[index]);

      if(actions.data.size){
        let temp = Object.assign({}, changedItem.p_selected_size);
        temp.code = actions.data.size;
        changedItem.p_selected_size = temp;
      }

      if(actions.data.qty){
        changedItem.p_quantity = actions.data.qty;
      }

      if(actions.data.color){
        let temp = Object.assign({}, changedItem.p_selected_color);
        temp.name = actions.data.color;
        changedItem.p_selected_color = temp;
      }

      newProducts = [...newProducts.slice(0,index), changedItem, ...newProducts.slice(index+1)];
      newState.productsInCart = newProducts;
      return newState;
    }

    case types.REMOVE_ITEM: {
      const newState = Object.assign({}, state);
      const id = Number(actions.data);
      let newItems = [...newState.productsInCart];
      const index = newItems.findIndex(item=> item.p_id === actions.data);

      newItems = [...newItems.slice(0,index), ...newItems.slice(index+1)];
      newState.productsInCart = newItems;
      return newState;
    }

    default: {
      return state
    }
  }
}

export default ItemListReducer;
