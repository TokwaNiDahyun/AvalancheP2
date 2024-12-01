// FEU TECH - Pineda, Joshua Renniel - 202111212 - TokwaNiDahyun
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import p2_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [p2, setProject] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [color, setColor] = useState("#FFFFFF");
  const [newColor, setNewColor] = useState("#FFFFFF");
  const [amount, setAmount] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const p2ABI = p2_abi.p2ABI;

  const initWallet = async () => {
    if (window.ethereum) {
      const wallet = window.ethereum;
      setEthWallet(wallet);
      const accounts = await wallet.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      getP2Contract(wallet);
    } else {
      alert("Please install MetaMask to use this application.");
    }
  };

  const getP2Contract = (wallet) => {
    const provider = new ethers.providers.Web3Provider(wallet);
    const signer = provider.getSigner();
    const p2Contract = new ethers.Contract(contractAddress, p2ABI, signer);
    setProject(p2Contract);
  };

  const getBalance = async () => {
    if (p2) {
      const balance = await p2.getBalance();
      setBalance(balance.toString());
    }
  };

  const getColor = async () => {
    if (p2) {
      const currentColor = await p2.getColor();
      setColor(currentColor);
      setNewColor(currentColor);
    }
  };

  const changeColor = async () => {
    if (p2) {
      const tx = await p2.setColor(newColor);
      await tx.wait();
      getColor();
    }
  };

  const deposit = async () => {
    if (p2 && isChecked) {
      let tx = await p2.deposit(amount);
      await tx.wait();
      getBalance();
    } else {
      alert("Please check the checkbox to confirm.");
    }
  };

  const withdraw = async () => {
    if (p2 && isChecked) {
      if (amount > parseInt(balance)) {
        alert("Error: Insufficient balance.");
        return;
      }
      
      let tx = await p2.withdraw(amount);
      await tx.wait();
      getBalance();
    } else {
      alert("Please check the checkbox to confirm.");
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use this application.</p>;
    }

    if (!account) {
      return <button onClick={initWallet}>Please connect your MetaMask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Contract Balance: {balance}</p>

        <input
          type="color"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
        />
        <button onClick={changeColor}>Change Color</button>

        <br />
        <select onChange={(e) => setAmount(Number(e.target.value))}>
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <button onClick={deposit}>Deposit</button>
        <button onClick={withdraw}>Withdraw</button>
        <br />
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <label>Confirm Action</label>
      </div>
    );
  };

  useEffect(() => {
    initWallet();
  }, []);

  useEffect(() => {
    if (p2) {
      getBalance();
      getColor();
    }
  }, [p2]);

  return (
    <main className="container">
      <header>
        <h1 style={{ color }}><b>WELCOME TO JOSHUA'S CONTRACT</b></h1>
      </header>

      {initUser()}

      <style jsx>{`
        .container {
          text-align: center;
        }
      `}</style>
    </main>
  );
}
