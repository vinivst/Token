const { expectRevert } = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
require("dotenv").config({path:"../.env"});
const TokenSale = artifacts.require("MyTokenSale");
const Token = artifacts.require("MyToken");
const KycContract = artifacts.require("KycContract");

const toBN = web3.utils.toBN;

contract("TokenSale Test", async accounts => {
    const [ initialHolder, recipient, anotherAccount ] = accounts;
    let instance, totalSupply, balance;

    beforeEach(async () => {
        tokenInstance = await Token.deployed();
        tokenSaleInstance = await TokenSale.deployed();
        totalSupply = await tokenInstance.totalSupply();
        deployerBalance = await tokenInstance.balanceOf.call(initialHolder);
        tokenSaleBalance = await tokenInstance.balanceOf(TokenSale.address);
        recipientBalance = await tokenInstance.balanceOf.call(recipient);
    });

    it("Should not have tokens in deployer account", async () => {
        assert.equal(deployerBalance.toNumber(), 0, "Supply is still in the owner account");
    });

    it("All tokens should be in the Token Sale Smart Contract", async () => {
        assert.equal(tokenSaleBalance.toNumber(), totalSupply, "Supply isn't in the Token Sale Smart Contract yet");
    });

    it("Should be possible to buy tokens", async () => {
        let kycInstance = await KycContract.deployed();
        await kycInstance.setKycCompleted(recipient);
        await tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")});
        recipientBalanceAfter = await tokenInstance.balanceOf.call(recipient);
        assert.equal(recipientBalanceAfter.toNumber(), recipientBalance.toNumber() + 1, "Could not buy tokens");
    });
    
});