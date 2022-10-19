// スマートコントラクトを実装
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Transactions {
  // 仮想通貨のデータの受け渡しのためのスキーマ（データ構造）
  struct TransferStruct {
    address sender;    // 送信者
    address receiver;  // 受信者
    uint amount;       // どれくらいの金額のやり取りをするか
  }

  TransferStruct[] transactions;

  event Transfer(address from, address receiver, uint amount);

  function addToBlockChain(address payable receiver, uint amount) public {
    transactions.push(TransferStruct(msg.sender, receiver, amount));

    emit Transfer(msg.sender, receiver, amount);
  }
}
