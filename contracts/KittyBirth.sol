pragma solidity ^0.4.11;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';

contract KittyBirth is ERC721Token('KITTY', 'KIT') {
  event Birth(uint256 kittyId, uint8 kittyAge, uint8 level);
  
  mapping (uint256 => address) public kittyToOwner;
  mapping (address => uint256[]) public ownerToKitties;
  mapping (uint256 => Kitty) public kittyById;

  struct Kitty {
    uint256 id;
    uint8 level;
    uint8 age;
  }

  Kitty[] public kitties;

  /* mapping (uint256 => address) public kittyToOwner; */
  function generateKitty() public {
    uint256 _id = uint256(keccak256(now));
    uint8 _age = uint8(keccak256(now)) % 255;
    uint8 _level = uint8(keccak256(now)) % 100;

    Kitty memory _kitty = Kitty({
      id: _id,
      level: _level,
      age: _age
    });

    ownerToKitties[msg.sender].push(_id);
    kitties.push(_kitty);
    kittyById[_id] = _kitty;

    emit Birth(_id, _age, _level);
  }

  function getKitties(address ownerAddress) public view returns (uint256[]) {
    return ownerToKitties[ownerAddress];
  }

  function getKittyInfo(uint256 kittyId) public view returns (uint256, uint8, uint8) {
    return (kittyById[kittyId].id, kittyById[kittyId].level, kittyById[kittyId].age);
  }
}
