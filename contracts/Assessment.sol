// SPDX-License-Identifier: UNLICENSED
// FEU TECH - Pineda, Joshua Renniel - 202111212 - TokwaNiDahyun
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    string public color;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event colorChanged(string newColor);

    constructor(uint256 initBalance, string memory initColor) payable {
        owner = payable(msg.sender);
        balance = initBalance;
        color = initColor;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function getColor() public view returns (string memory) {
        return color;
    }

    function setColor(string memory newColor) public {
        require(msg.sender == owner, "Only the owner can set the color");
        color = newColor;
        emit colorChanged(newColor);
    }

    function deposit(uint256 _amount) public {
        uint256 previousBalance = balance;
        require(msg.sender == owner, "You are not the owner of this account");
        balance += _amount;
        require(balance == previousBalance + _amount, "Balance mismatch after deposit");
        emit Deposit(_amount);
    }

    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        balance -= _withdrawAmount;
        assert(balance == (_previousBalance - _withdrawAmount));
        emit Withdraw(_withdrawAmount);
    }
}
