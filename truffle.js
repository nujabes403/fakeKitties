module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      from: '0xf1ee475d5b066b128e2b50ab36088df1fe566e91',
      network_id: "*",
    },
    geth: {
      host: "127.0.0.1",
      port: 8545,
      from: '0xbcc17ce75da0ac26b1fcd4f178349db1b907a4b1',
      network_id: "1114",
      gas: 5000000 // It should be less than gasLimit defined on genesis.json
    },
    groundx: {
      host: "172.31.21.128",
      port: 22000,
      from: '0xd816b11b6b695f4933365e1cc3317b517caa7320',
      network_id: "2017",
      gas: 20000000,
      gasPrice: 0,
    },
  }
}
