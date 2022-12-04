// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract LiriaToken is ERC20,AccessControl{
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    constructor() ERC20("LiriaToken", "LRA"){
        _setupRole(ADMIN_ROLE, msg.sender);
    }

    function setupMinter(address minter, bool enabled) external onlyRole(ADMIN_ROLE) {
        require(minter != address(0), "!minter");
        if (enabled) _setupRole(MINTER_ROLE, minter);
        else _revokeRole(MINTER_ROLE, minter);   
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }
     
}