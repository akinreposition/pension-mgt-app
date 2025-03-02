export type ContributionType = 'mandatory' | 'voluntary';
export type ContributionStatus = 'approved' | 'pending' | 'rejected';

export interface Contribution {
    id: string;
    date: string;
    amount: number;
    role: 'admin' | 'member';
  type: ContributionType;
  status: ContributionStatus;
}
