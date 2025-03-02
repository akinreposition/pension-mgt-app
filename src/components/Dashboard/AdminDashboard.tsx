import { useState, ChangeEvent } from 'react';
import { 
    ResponsiveContainer, 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    Tooltip, 
    Legend, 
    CartesianGrid 
} from 'recharts';

interface ContributionData {
    date: string;
    totalMandatory: number;
    totalVoluntary: number;
}

const dummyAdminData: ContributionData[] = [
    { date: '2025-01', totalMandatory: 5000, totalVoluntary: 1200 },
    { date: '2025-02', totalMandatory: 5200, totalVoluntary: 1500 },
    { date: '2025-03', totalMandatory: 4800, totalVoluntary: 1000 },
    { date: '2025-04', totalMandatory: 5100, totalVoluntary: 1300 },
    { date: '2025-05', totalMandatory: 5300, totalVoluntary: 1600 },
];

const AdminDashboard: React.FC = () => {
    const [search, setSearch] = useState<string>('');

    // Filter overall contributions by date
    const filteredData = dummyAdminData.filter((item) =>
        item.date.includes(search)
    );

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

            {/* Overall Contribution Summary */}
            <div className="bg-white p-4 rounded shadow mb-6">
                <h2 className="text-xl font-semibold mb-2">Overall Contribution Summary</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dummyAdminData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalMandatory" fill="#8884d8" name="Total Mandatory" />
                        <Bar dataKey="totalVoluntary" fill="#82ca9d" name="Total Voluntary" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Detailed Contributions with Search/Filter */}
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-2">Detailed Contributions</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by month (e.g. 2025-01)"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left">Date</th>
                            <th className="px-6 py-3 text-left">Total Mandatory</th>
                            <th className="px-6 py-3 text-left">Total Voluntary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index} className="bg-white">
                                <td className="px-6 py-4">{item.date}</td>
                                <td className="px-6 py-4">${item.totalMandatory}</td>
                                <td className="px-6 py-4">${item.totalVoluntary}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
