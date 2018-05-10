import KittyBirthJSON from 'contracts/KittyBirth.json'

let web3Instance = {
  rpc: null,
  websocket: null,
}

const contractInfo = {
  KittyBirth: {
    name: 'KittyBirth',
    address: '0xc4288020187eb244ae9575adb5de2d7e34e2ff9e',
    abi: KittyBirthJSON.abi,
  },
}

export const setWeb3Instances = (rpcInstance, websocketInstance) => {
  web3Instance = {
    rpc: rpcInstance,
    websocket: websocketInstance,
  }
}

export const getContract = ((memo = {}) => (contractName, provider = 'rpc') => {
  if (memo[contractName, provider]) return memo[contractName, provider]

  const contractInstance = new web3Instance[provider].eth.Contract(
    contractInfo[contractName].abi,
    contractInfo[contractName].address
  )

  memo[contractName, provider] = contractInstance

  return contractInstance
})()
