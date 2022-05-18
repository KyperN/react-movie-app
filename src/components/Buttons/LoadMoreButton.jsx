import React from 'react';

export default function LoadMoreButton({ loadMore }) {
  return (
    <div className="load-more-btn">
      <button onClick={loadMore}>Load More</button>
    </div>
  );
}
