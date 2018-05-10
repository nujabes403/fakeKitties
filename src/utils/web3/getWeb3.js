// @flow

import store from '../../store'
import Web3 from 'web3'
import { setWeb3Instances } from 'utils/contract'

window.store = store

export const WEB3_INITIALIZED = 'WEB3_INITIALIZED'
export const WALLET_INITIALIZED = 'WALLET_INITIALIZED'
function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results
  }
}

const walletInitialized = (wallet: string) => ({
  type: WALLET_INITIALIZED,
  payload: {
    wallet,
  }
})

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function(dispatch) {
    var results
    var web3 = window.web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider)
      const web3Websocket = new Web3(new Web3.providers.WebsocketProvider('ws://172.31.21.128:8546'))

      results = {
        web3Instance: web3,
        web3WebsocketInstance: web3Websocket,
      }

      console.log('Injected web3 detected.');

      web3.eth.getAccounts((err, accounts) => {
        const wallet = accounts[0]
        resolve(store.dispatch(walletInitialized(wallet)))
      })

      setWeb3Instances(web3, web3Websocket)
      resolve(store.dispatch(web3Initialized(results)))
    } else {

      // Fallback to localhost if no web3 injection. We've configured this to
      // use the development console's port by default.
      var provider = new Web3.providers.HttpProvider('http://localhost:8545')

      web3 = new Web3(provider)

      results = {
        web3Instance: web3
      }

      console.log('No web3 instance injected, using Local web3.');

      resolve(store.dispatch(web3Initialized(results)))
    }
  })
})

export default getWeb3
