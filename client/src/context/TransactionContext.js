import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";
import { contractABI, contractAddress } from "../utils/connect";
import React from "react";

export const TransactionContext = createContext();

const { ethereum } = window;

// スマートコントラクトを取得
const getSmartContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  // Transactions.solで実際に作成したスマートコントラクト（JSON形式の実行ファイルに変換されている）
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  console.log(provider, signer, transactionContract);

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [inputFormData, setInputFormData] = useState({
    addressTo: "",
    amount: "",
  });

  const handleChange = (e, name) => {
    setInputFormData((prevInputFormData) => ({
      ...prevInputFormData,
      [name]: e.target.value,
    }));
  };

  // メタマスクウォレットと連携しているかを確認する
  const checkMetaMaskWalletConnected = async () => {
    if (!ethereum) return alert("MetaMaskをインストールしてください");

    // MetaMaskのアカウントIDを取得
    const accounts = await ethereum.request({ method: "eth_accounts" });

    console.log(accounts);

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("アカウントが見つかりませんでした");
    }
  };

  // MetaMaskウォレットと連携する
  const connectWallet = async () => {
    if (!ethereum) return alert("MetaMaskをインストールしてください");

    // MetaMaskのアカウントがある場合は、接続を開始する
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    console.log(accounts);

    setCurrentAccount(accounts[0]);
  };

  // 実際に通貨のやり取りを行う
  const sendTransaction = async () => {
    if (!ethereum) return alert("MetaMaskをインストールしてください");
    console.log("sendTransaction");
    const { addressTo, amount } = inputFormData;

    const transactionContract = getSmartContract();
    const parseAmount = ethers.utils.parseEther(amount);

    const transactionParameters = {
      gas: "0x5208", // 16進数で表されている
      to: addressTo,
      from: currentAccount,
      value: parseAmount._hex,
    };

    await ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });

    const transactionHash = await transactionContract.addToBlockChain(
      addressTo,
      parseAmount
    );
    console.log(`ロード中・・・${transactionHash.hash}`);
    await transactionHash.wait();
    console.log(`送金に成功！${transactionHash.hash}`);
  };

  useEffect(() => {
    checkMetaMaskWalletConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ connectWallet, sendTransaction, handleChange, inputFormData }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
