import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const Main = () => {
  const {
    connectWallet,
    sendTransaction,
    handleChange,
    inputFormData,
  } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount } = inputFormData;
    e.preventDefault();
    if (!addressTo || !amount) return;
    sendTransaction();
  };

  return (
    <div className="mainContainer">
      {/* 左側 */}
      <div className="cryptoContainer">
        <h1 className="title">Crypto Card</h1>

        <button type="button">
          <p className="buttonText" onClick={connectWallet}>
            ウォレット連携
          </p>
        </button>
      </div>
      {/* 右側 */}
      <div className="inputContainer">
        <input
          type="text"
          placeholder="アドレス"
          name="addressTo"
          onChange={(e) => handleChange(e, "addressTo")}
        />
        <input
          type="number"
          placeholder="通貨（ETH）"
          name="amount"
          step="0.0001"
          onChange={(e) => handleChange(e, "amount")}
        />
        <button type="button" onClick={handleSubmit}>
          送信
        </button>
      </div>
    </div>
  );
};

export default Main;
