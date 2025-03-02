import React, { memo } from 'react';
import { FixedSizeList as List } from 'react-window';

interface Contribution {
  id: string;
  date: string;
  amount: number;
  type: 'mandatory' | 'voluntary';
  status: 'approved' | 'pending' | 'rejected';
}

interface VirtualizedContributionListProps {
  contributions: Contribution[];
}

interface RowProps {
  index: number;
  style: React.CSSProperties;
  data: Contribution[];
}

const Row = memo(({ index, style, data }: RowProps) => {
  const contribution = data[index];
  return (
    <div style={style} className="flex justify-between p-2 border-b">
      <div>{contribution.date}</div>
      <div>${contribution.amount.toFixed(2)}</div>
      <div>{contribution.type}</div>
      <div>{contribution.status}</div>
    </div>
  );
});

const VirtualizedContributionList: React.FC<VirtualizedContributionListProps> = ({ contributions }) => {
  return (
    <List
      height={400}
      itemCount={contributions.length}
      itemSize={50}
      width="100%"
      itemData={contributions}
    >
      {Row}
    </List>
  );
};

export default memo(VirtualizedContributionList);
