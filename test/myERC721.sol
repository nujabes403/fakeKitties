pragma solidity ^0.4.2;


contract TutoToken {
    mapping (address => uint[]) internal listOfOwnerTokens;
    // Since Solidity has its limitations, and there is no "indexOf()" method for arrays,
    // we have to keep track of a token in the owner array manually.
    mapping (uint => uint) internal tokenIndexInOwnerArray;
    mapping (uint => address) internal tokenIdToOwner;
    mapping (uint => string) internal referencedMetadata;
    
    function transfer (address _to, uint _tokenId) public returns (uint) {
        // wemake sure the token exists
        require(tokenIdToOwner[_tokenId] != address(0));
        // the sender owns the token
        require(tokenIdToOwner[_tokenId] == msg.sender);
        // avoid sending it to a 0x0
        require(_to != address(0));
        
        // we remove the token from last owner list
        uint length = listOfOwnerTokens[msg.sender].length
        uint index = tokenIndexInOwnerArray[_tokenId];
        // last token in array
        uint swapToken = listOfOwnerTokens[msg.sender][length - 1];
        
        // last token pushed to the place of the one that was transferred
        listOfOwnerTokens[msg.sender][index] = swapToken;
        tokenIndexInOwnerArray[swapToken] = index; // update the index of the token we moved
        
        delete listOfOwnerTokens[msg.sender][length - 1];
        listOfOwnerTokens[msg.sender].length--;
        
        // We set the new owner of the token
        tokenIdToOwner[_tokenId] = _to;
        
        // we add the token to the list of the new owner
        listOfOwnerTokens[_to].push(_tokenId);
        tokenIndexInOwnerArray[_tokenId] = listOfOwnerTokens[_to].length - 1;
        
        Transfer(msg.sender, _to, _tokenId);
    }
    
    function mint(address _owner, uint256 _tokenId) public returns (uint256) {
        // We make sure that the token doesn't already exist
        require(tokenIdToOwner[_tokenId] == address(0));
        
        // We assign the token to someone
        tokenIdToOwner[_tokenId] = _owner;
        listOfOwnerTokens[_owner].push(_tokenId);
        tokenIndexInOwnerArray[_tokenId] = listOfOwnerTokens[_owner].length - 1;
        
        totalSupply = totalSupply + 1;
        
        Minted(_owner, _tokenId);
    }
}