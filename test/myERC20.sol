pragma solidity ^0.4.2;


contract TutoCoin {
    string public name = "Our Tutorial Coin";
    string public symbol = "OTC";
    uint8 public decimals = 2;
    uint256 public totalSupply;
    
    mapping(address => uint256) balances;
    
    function TutoCoin() public {
        // We create 100 tokens (With 2 decimals, in reality it's 1.00 token)
        totalSupply = 100;
        
        // We give all the token to the msg.sender (in this case, it's the creator of the contract)
        balances[msg.sender] = 100;
        
        // With coins, don't forget to keep track of who has how much in the smart contract, or they'll be "lost".
    }
    
    function totalSupply() public constant returns (uint256) {
        return totalSupply;
    }
    
    function balanceOf(address tokenOwner) public constant returns (uint256) {
        return balances[tokenOwner]
    }
    
    function transfer(address _to, uint256 _value) public returns (bool) {
         // avoid sending tokens to the 0x0 address
        require(_to != address(0));
        // make sure the sender has enough tokens
        require(_value <= balances[msg.sender]);
        
        // we subtract the tokens from the sender's balance
        balances[msg.sender] = balances[msg.sender] - _value;
        // then add them to the receiver
        balances[_to] = balances[_to] + _value;
        
        Transfer(msg.sender, _to, _value);
        
        return true;
    }
}