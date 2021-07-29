// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.0;
pragma abicoder v2;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract Contract is Initializable, UUPSUpgradeable {

    uint256 private x;
    
    function initialize() public initializer { }
    
    function setX(uint256 value) external {
        x = value;
    }
    
    function getX() external returns(uint256) {
        return x;
    }

    function _authorizeUpgrade(address) internal override { }
}
