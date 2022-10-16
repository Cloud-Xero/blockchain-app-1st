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
}
