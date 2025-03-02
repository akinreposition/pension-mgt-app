// src/components/ContributionListSkeleton.tsx

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ContributionListSkeleton: React.FC = () => {
  return (
    <div className="space-y-2">
      {[...Array(5)].map((_, idx) => (
        <Skeleton key={idx} height={30} />
      ))}
    </div>
  );
};

export default ContributionListSkeleton;
