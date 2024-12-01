# Metamask Interaction Smart Contract

This project demonstrates a simple smart contract. The contract allows users to deposit and withdraw funds, change a stored color value, and check their balance. The project includes front-end interaction with a React application that interacts with the Ethereum blockchain through MetaMask.

## Description

The contract is designed to manage the following functionalities:
- **Get Balance**: Retrieve the current balance stored in the contract.
- **Get Color**: Retrieve the current color stored in the contract.
- **Set Color**: The contract owner can change the stored color.
- **Deposit**: The contract owner can deposit funds to increase the balance.
- **Withdraw**: The contract owner can withdraw funds from the balance, ensuring sufficient balance is available.

## Features
- **Deposit**: Add funds to the contract balance.
- **Withdraw**: Withdraw funds from the balance (only if sufficient funds are available).
- **Change Color**: The contract owner can set a new color, which is stored on the blockchain.
- **Balance Check**: The contract allows users to check their balance at any time.

## Getting Started

### Installing

1. Clone the repository to your local machine.
2. Navigate to the project directory, in the terminal type::
   ```bash
   npm i
   ```
3. Open two additional terminals in your VS code
4. In the second terminal type:
   ```bash
   npx hardhat node
   ```
5. In the third terminal, type:
   ```bash
   npx hardhat run --network localhost scripts/deploy.js
   ```
6. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

### Authors
Metacrafter Joshua Pineda
