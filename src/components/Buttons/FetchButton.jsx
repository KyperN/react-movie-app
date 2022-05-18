import React from 'react';

export default function FetchButton({ text, fetchHandle }) {
  return (
    <button
      className="button"
      onClick={() => {
        fetchHandle();
      }}>
      {text}
    </button>
  );
}
