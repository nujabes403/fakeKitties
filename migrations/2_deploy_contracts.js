var KittyBirth = artifacts.require("./KittyBirth.sol");

module.exports = function(deployer) {
  deployer.deploy(KittyBirth);
};
