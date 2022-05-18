import React from 'react';

export default function SortButton({ text, sortHandle }) {
  return (
    <button
      onClick={(e) => {
        sortHandle(e);
      }}
      className="button">
      {text}
    </button>
  );
}
