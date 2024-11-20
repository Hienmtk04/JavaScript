export const ADD = (item) => ({
    type: 'ADD_TO_CART',
    payload:  item
});

export const TOTAL_CART = () => ({
    type: 'TOTAL_CART',
    payload:  ''
});

export const REMOVE_ITEM = (item) => ({
    type: 'REMOVE_ITEM_CART',
    payload:  item
});

export const CLEAR = () => ({
    type: 'CLEAR_CART',
    payload: ''
});
