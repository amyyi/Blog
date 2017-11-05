import React from 'react';
export function validateTitle(value) {
  if (value.length === 15) {
    return (
      <span className="error-msg">Please enter no more than 15 characters.</span>
    );
  }
}
