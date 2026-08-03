import React from 'react';

export const SkeletonBox = ({ className = '' }) => (
  <div className={`animate-pulse bg-neutral-200 rounded ${className}`} />
);

export const ProductSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden flex flex-col h-[380px]">
    <SkeletonBox className="h-48 w-full rounded-none" />
    <div className="p-4 flex-grow flex flex-col">
      <SkeletonBox className="h-4 w-1/4 mb-3" />
      <SkeletonBox className="h-5 w-3/4 mb-2" />
      <SkeletonBox className="h-5 w-1/2 mb-4" />
      <div className="mt-auto flex justify-between items-center">
        <SkeletonBox className="h-6 w-1/3" />
        <SkeletonBox className="h-4 w-1/4" />
      </div>
    </div>
  </div>
);

const SkeletonLoader = ({ type = 'box', className = '', count = 1 }) => {
  const items = Array.from({ length: count }, (_, i) => i);
  
  if (type === 'product') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((i) => <ProductSkeleton key={i} />)}
      </div>
    );
  }
  
  return (
    <>
      {items.map((i) => (
        <SkeletonBox key={i} className={className} />
      ))}
    </>
  );
};

export default SkeletonLoader;
