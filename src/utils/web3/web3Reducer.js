const initialState = {
  web3Instance: null
}

const web3Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'WEB3_INITIALIZED':
      return {
        ...state,
        web3Instance: action.payload.web3Instance,
        web3WebsocketInstance: action.payload.web3WebsocketInstance,
      }
    case 'WALLET_INITIALIZED':
      return {
        ...state,
        wallet: action.payload.wallet,
      }
    default:
      return state
  }
}

export default web3Reducer
