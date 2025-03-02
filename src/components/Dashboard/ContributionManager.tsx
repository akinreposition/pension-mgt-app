import React, { useState } from 'react';
import { toast } from 'react-toastify';

type ContributionType = 'mandatory' | 'voluntary';
type ContributionStatus = 'approved' | 'pending' | 'rejected';

interface Contribution {
  id: string;
  date: string;
  amount: number;
  type: ContributionType;
  status: ContributionStatus;
}

const ContributionManager: React.FC = () => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [contributionType, setContributionType] = useState<ContributionType>('mandatory');
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate date: must not be in the future.
    const selectedDate = new Date(date);
    const now = new Date();
    if (selectedDate > now) {
      toast.error("Contribution date cannot be in the future.");
      return;
    }

    // Validate that the amount is a positive decimal.
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      toast.error("Please enter a valid contribution amount.");
      return;
    }

    // Validate: Only one mandatory contribution per month.
    if (contributionType === 'mandatory') {
      const selectedMonth = selectedDate.getMonth();
      const selectedYear = selectedDate.getFullYear();
      const mandatoryExists = contributions.some(c => {
        const cDate = new Date(c.date);
        return c.type === 'mandatory' &&
               cDate.getMonth() === selectedMonth &&
               cDate.getFullYear() === selectedYear;
      });
      if (mandatoryExists) {
        toast.error("A mandatory contribution already exists for this month.");
        return;
      }
    }

    // Check for duplicate transactions (same date, amount, and type).
    const duplicate = contributions.some(
      c => c.date === date && c.amount === amountValue && c.type === contributionType
    );
    if (duplicate) {
      toast.error("Duplicate contribution detected.");
      return;
    }

    // Create a new contribution (default status is pending).
    const newContribution: Contribution = {
      id: Math.random().toString(36).substring(2, 9),
      date,
      amount: amountValue,
      type: contributionType,
      status: 'pending',
    };

    setContributions([...contributions, newContribution]);
    toast.success("Contribution added successfully.");
    
    // Reset form fields.
    setDate('');
    setAmount('');
    setContributionType('mandatory');
  };

  // Filter and sort contributions.
  const filteredContributions = contributions
    .filter(c =>
      c.date.includes(filter) || c.type.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sortOrder === 'asc' ? diff : -diff;
    });

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Manage Contributions</h2>
      
      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input 
              type="date" 
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input 
              type="number" 
              step="0.01"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select 
              id="type"
              value={contributionType}
              onChange={(e) => setContributionType(e.target.value as ContributionType)}
              className="mt-1 block w-full border-gray-300 rounded-md"
            >
              <option value="mandatory">Mandatory</option>
              <option value="voluntary">Voluntary</option>
            </select>
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Submit
            </button>
          </div>
        </div>
      </form>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <input 
          type="text"
          placeholder="Filter by date or type..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-2 md:mb-0 border border-gray-300 rounded px-3 py-2"
        />
        <div>
          <label className="mr-2 text-sm">Sort by Date:</label>
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Contribution History Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredContributions.map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-2">{c.date}</td>
                <td className="px-4 py-2">${c.amount.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      c.type === 'mandatory' ? 'bg-blue-500' : 'bg-green-500'
                    }`}
                  >
                    {c.type.charAt(0).toUpperCase() + c.type.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      c.status === 'approved'
                        ? 'bg-green-600'
                        : c.status === 'rejected'
                        ? 'bg-red-600'
                        : 'bg-yellow-500'
                    }`}
                  >
                    {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
            {filteredContributions.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-2 text-center">
                  No contributions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContributionManager;
