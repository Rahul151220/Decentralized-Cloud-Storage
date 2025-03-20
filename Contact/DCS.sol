// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedCloudStorage {
    struct File {
        uint id;
        string fileHash;
        address owner;
        uint256 timestamp;
    }
    
    mapping(uint => File) public files;
    uint public fileCount;
    
    event FileUploaded(uint id, string fileHash, address owner, uint256 timestamp);
    event PaymentMade(address from, address to, uint256 amount);
    
    function uploadFile(string memory _fileHash) public {
        fileCount++;
        files[fileCount] = File(fileCount, _fileHash, msg.sender, block.timestamp);
        emit FileUploaded(fileCount, _fileHash, msg.sender, block.timestamp);
    }
    
    function makePayment(address payable _recipient) public payable {
        require(msg.value > 0, "Payment must be greater than 0");
        _recipient.transfer(msg.value);
        emit PaymentMade(msg.sender, _recipient, msg.value);
    }
}
