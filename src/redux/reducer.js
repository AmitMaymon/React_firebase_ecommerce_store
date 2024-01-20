
const storedCart = JSON.parse(localStorage.getItem('cart')) || []
console.log(storedCart);

const initialState = {
    products: [],
    customers: [],
    customer: [],
    product: {},
    isAdmin: true,
    addedToCart: false,
    cart: storedCart,
    purchasesList: [],
    purchases: 0,


}

const globalStates = (state = initialState, action) => {


    switch (action.type) {
        case 'GET-PROD': {

            return { ...state, products: action.payload }
        }
        case 'GET-PROD-ID': {
            const obj = {
                ...action.payload.data, id: action.payload.id
            }


            return { ...state, product: obj }
        }
        case 'GET-CUST-ID': {
            const obj = {
                ...action.payload.data, id: action.payload.id
            }


            return { ...state, customer: obj }
        }

        case 'GET-CUST': {
            console.log(state.customers)
            return { ...state, customers: action.payload }
        }
        case 'UPDATE-PROD': {
            const index = state.products.findIndex(item => item.id == action.payload.id)
            if (index !== -1) {
                const updatedProds = [...state.products]
                updatedProds[index] = action.payload

                return { ...state, products: updatedProds }
            }
            return state

        }
        case 'UPDATE-CUST': {
            const index = state.customers.findIndex(item => item.id == action.payload.id)
            if (index !== -1) {
                const updatedCustomers = [...state.customers]
                updatedCustomers[index] = action.payload

                return { ...state, customers: updatedCustomers }
            }
            return state

        }
        case 'ADD-PROD': {
            const obj = { ...action.payload.data, id: action.payload.id }
            const updatedProds = [...state.products, obj]

            return { ...state, products: updatedProds }



        }

        case 'DELETE-PROD': {
            const index = state.products.findIndex(item => item.id == action.payload)
            if (index !== -1) {
                const updatedProds = [...state.products]
                //REMOVE ITEM
                updatedProds.splice(index, 1)

                return { ...state, products: updatedProds }
            }
            return state

        }
        case 'CART-ITEM': {
            console.log(state);
            return { ...state, addedToCart: action.payload }

        }
        case 'ADD-TO-CART': {

            const updatedCart = [...state.cart, action.payload]
            localStorage['cart'] = JSON.stringify(updatedCart)

            return { ...state, cart: updatedCart }
        }
        case 'DELETE-FROM-CART': {
            const index = state.cart.findIndex(item => item.id == action.payload)
            if (index !== -1) {
                const updatedCart = [...state.cart]
                updatedCart.splice(index, 1)

                localStorage['cart'] = JSON.stringify(updatedCart)
                return { ...state, cart: updatedCart }

            }
            return state

        }

        case "PURCHASE": {

            localStorage['cart'] = JSON.stringify([])
            return { ...state, purchases: state.purchases + 1, cart: [], customers: [...state.customers, action.payload] }


        }
        case "CREATE-PURCHASE": {
            const obj = { ...action.payload.data, id: action.payload.id }

            let updatedPurchases = [...state.purchasesList]
            updatedPurchases.push(obj)
            console.log(updatedPurchases);
            return { ...state, purchasesList: updatedPurchases }


        }


        case 'DELETE-CUSTOMER': {
            const index = state.customers.findIndex(item => item.id == action.payload)
            if (index !== -1) {
                const updatedCustomers = [...state.cart]
                updatedCustomers.splice(index, 1)

                localStorage['cart'] = JSON.stringify(updatedCustomers)
                return { ...state, customers: updatedCustomers }

            }
            return state


        }


        default:

            return state
    }





}

export default globalStates