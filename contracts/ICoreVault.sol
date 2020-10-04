//SPDX-License-Identifier: MIT
pragma solidity ^0.6.8;

interface ICoreVault {
    function addPendingRewards(uint _amount) external;
}