const { expectRevert } = require('@openzeppelin/test-helpers');
require("dotenv").config({path:"../.env"});
const Token = artifacts.require("MyToken");

const toBN = web3.utils.toBN;

contract("Token Test", async accounts => {
    const [ initialHolder, recipient, anotherAccount ] = accounts;
    let instance, totalSupply, balance;

    beforeEach(async () => {
        this.myToken = await Token.new(process.env.INITIAL_TOKENS);
        instance = this.myToken;
        totalSupply = await instance.totalSupply();
        balance = await instance.balanceOf.call(initialHolder);
    });

    it("All tokens should be in my account", async () => {
        assert.equal(balance.toNumber(), totalSupply.toNumber(), "Supply is not in the owner account");
    });

    it("Can send tokens from Account 1 to Account 2", async () => {
        const sendTokens = 1;
        await instance.transfer(recipient, sendTokens);
        initialHolderBalance = await instance.balanceOf(initialHolder);
        recipientBalance = await instance.balanceOf(recipient);
        assert.equal(initialHolderBalance.toNumber(), totalSupply.toNumber() - sendTokens);
        assert.equal(recipientBalance.toNumber(), sendTokens);
    });
    
    it("It's not possible to send more tokens than account 1 has", async () => {
    
    await expectRevert(
        instance.transfer(recipient, balance+1),
        'ERC20: transfer amount exceeds balance'
        );
    balanceAfter = await instance.balanceOf.call(initialHolder);
    //check if the balance is still the same
    assert.equal(balance.toNumber(), balanceAfter.toNumber());

    });

    
});