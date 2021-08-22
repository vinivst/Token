var MyToken = artifacts.require('MyToken.sol');
var MyTokenSales = artifacts.require('MyTokenSale.sol');
var KycContract = artifacts.require('KycContract.sol');
require('dotenv').config({ path: '../.env' });

module.exports = async function (deployer) {
  let addr = await web3.eth.getAccounts();
  let tokenInstance = await deployer.deploy(
    MyToken,
    process.env.INITIAL_TOKENS,
    process.env.TOKEN_NAME,
    process.env.TOKEN_SYMBOL
  );
  await deployer.deploy(KycContract);
  await deployer.deploy(
    MyTokenSales,
    process.env.TOKEN_PRICE_IN_WEI,
    addr[0],
    MyToken.address,
    KycContract.address
  );
  await tokenInstance.transfer(
    MyTokenSales.address,
    process.env.INITIAL_TOKENS
  );
};
