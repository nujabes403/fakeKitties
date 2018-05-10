const Web3 = require('web3')

const gethProvider = new Web3.providers.HttpProvider('http://172.31.21.128:22000')

const KittyBirthJson = require('../build/contracts/KittyBirth')

const web3 = new Web3(gethProvider)

module.exports = (callback) => {
  let accounts
  web3.eth.getAccounts((err, res) => {
    accounts = res

    const KittyBirthInstance = new web3.eth.Contract(KittyBirthJson.abi, '0x23191de7811ed85fe6ae015e87efda1dbf7efcf4')
    KittyBirthInstance.methods.generateKitty().send({
      from: '0x8f3dbf61ddc365b07ab05a7b66224de93bf881ac',
      gas: 150000,
      gasPrice: '0'
    }).then((res) => {
      console.log(res)
    })
    //
    // KittyBirthInstance.generateKitty.sendTransaction({
    //   from: accounts[0],
    //   gas: 150000,
    //   gasPrice: '300000000000',
    // })
    //
    // // KittyBirthInstance.kitties.call((err, res) => console.log(res))
    // KittyBirthInstance.ownerToKitty.call(accounts[0], (err, res) => console.log((web3.utils.hexToNumber(res))))

    // const AuthenticationContract = web3.eth.contract(AuthenticationJSON.abi, accounts[0])
    // const AuthenticationContractInstance = AuthenticationContract.at('0x2b5eff1024f236bb504e1e20260391a8e24fb57e')
    // web3.eth.sendTransaction({
    //   from: '0xf1ee475d5b066b128e2b50ab36088df1fe566e91',
    //   to: '0xde908E9D14395D254Ae33d7ca67e2cA2153F2d1F',
    //   value: web3.utils.toWei('10', 'ether'),
    // })
    // AuthenticationContractInstance.signup.sendTransaction('hoonil', {
    //   from: '0x047b5293222e994eed3fca8c6ef10d5b94acd59c',
    //   gas: 1500000,
    //   gasPrice: '300000000000',
    // })
    // const user = AuthenticationContractInstance.users.call('0xb79cf68b569bb7c2780d3e357f2a3fb503b53382')
    // console.log(web3.toAscii(user))
  })
}
