// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title Counter
/// @notice A simple on-chain counter deployable to Base.
/// @dev Demonstrates a minimal Solidity contract following the Base get-started guide.
contract Counter {
    /// @notice Current count value.
    uint256 public count;

    /// @notice Address that deployed this contract.
    address public immutable owner;

    /// @notice Emitted whenever the count changes.
    event CountChanged(uint256 newCount);

    /// @notice Reverts if called by any account other than the owner.
    error NotOwner();

    /// @notice Reverts when decrement would underflow below zero.
    error CountIsZero();

    constructor() {
        owner = msg.sender;
    }

    /// @notice Increment the counter by 1.
    function increment() external {
        count += 1;
        emit CountChanged(count);
    }

    /// @notice Decrement the counter by 1. Reverts if count is already 0.
    function decrement() external {
        if (count == 0) revert CountIsZero();
        count -= 1;
        emit CountChanged(count);
    }

    /// @notice Reset the counter to 0. Only callable by the deployer.
    function reset() external {
        if (msg.sender != owner) revert NotOwner();
        count = 0;
        emit CountChanged(0);
    }
}
