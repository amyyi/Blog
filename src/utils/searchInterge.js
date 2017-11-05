import React from 'react';
export function validateInterge(value) {
  const operation = /^[><=]?\d+$|^[><=][><=]?\d+$/; // 符合運算符號＋數字 或是 運算符號運算符號＋數字 或是 數字
  if (value.match(operation) === null) {
    return false;
  }
  return true;
}
