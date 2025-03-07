import React, { useState, useMemo, useRef } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from 'react-toastify';

interface DataItem {
    date: string;
    amount: number;
}

const ReportGenerator: React.FC = () => {
    // State for date range selection
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // Filter dummy data based on selected date range
    const filteredData = useMemo<DataItem[]>(() => {
        const dummyData: DataItem[] = [
            { date: '2025-01-01', amount: 200 },
            { date: '2025-02-01', amount: 250 },
            { date: '2025-03-01', amount: 300 },
            { date: '2025-04-01', amount: 280 },
            { date: '2025-05-01', amount: 350 },
            { date: '2025-06-01', amount: 400 },
        ];
        return dummyData.filter((item) => {
            const itemDate = new Date(item.date);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;
            return (!start || itemDate >= start) && (!end || itemDate <= end);
        });
    }, [startDate, endDate]);

    // Calculate total contributions within the filtered date range
    const totalContributions = useMemo<number>(() => {
        return filteredData.reduce((acc, item) => acc + item.amount, 0);
    }, [filteredData]);

    // Benefit projection calculator logic (e.g., projected benefit = total contributions * factor)
    const benefitProjection = useMemo<number>(() => {
        // In a real application, you might use a more complex calculation.
        return totalContributions * 1.2;
    }, [totalContributions]);

    // Ref for the report container to export as PDF
    const reportRef = useRef<HTMLDivElement>(null);

    // Handler to download the report as a PDF
    const handleDownloadPDF = async (): Promise<void> => {
        if (!reportRef.current) return;
        try {
            setLoading(true);
            const canvas = await html2canvas(reportRef.current);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('contribution_report.pdf');
            toast.success('PDF downloaded successfully.');
        } catch (error) {
            toast.error('Failed to export PDF.');
        } finally {
            // Delay to prevent immediate re-click
            setTimeout(() => setLoading(false), 30000);
        }
    };

    // Handler to share report via email (opens default email client)
    const handleShareReport = (): void => {
        const subject = encodeURIComponent('My Contribution Report');
        const body = encodeURIComponent('Please find attached my contribution report.');
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    return (
        <div className="mt-4 p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Generate Report</h2>

            {/* Date Range Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Start Date
                    </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        End Date
                    </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
            </div>

            {/* Report Display Area */}
            <div ref={reportRef} className="border p-4 mb-6">
                <h3 className="text-lg font-semibold mb-4">Contribution Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="amount" stroke="#8884d8" name="Contribution Amount" />
                    </LineChart>
                </ResponsiveContainer>

                {/* Report Summary */}
                <div className="mt-4">
                    <p>
                        Total Contributions:{' '}
                        <span className="font-bold">₦{totalContributions.toFixed(2)}</span>
                    </p>
                    <p>
                        Projected Benefit:{' '}
                        <span className="font-bold">₦{benefitProjection.toFixed(2)}</span>
                    </p>
                </div>

                {/* Benefit Projection Details */}
                <div className="mt-4">
                    <h4 className="text-md font-semibold">Benefit Projection Calculator</h4>
                    <p>
                        Based on your contributions, your projected benefit is estimated to be{' '}
                        <span className="font-bold">₦{benefitProjection.toFixed(2)}</span>.
                    </p>
                </div>
            </div>

            {/* Export and Share Options */}
            <div className="flex flex-col md:flex-row gap-4">
                <button
                    onClick={handleDownloadPDF}
                    className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${loading ? 'animate-pulse' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Generating PDF...' : 'Download PDF'}
                </button>
                <button
                    onClick={handleShareReport}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                    Share Report
                </button>
            </div>
        </div>
    );
};

export default ReportGenerator;

// import React, { useState, useMemo, useRef } from 'react';
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
// } from 'recharts';
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';
// import { toast } from 'react-toastify';

// interface DataItem {
//     date: string;
//     amount: number;
// }

// const ReportGenerator: React.FC = () => {
//     // State for date range selection
//     const [startDate, setStartDate] = useState<string>('');
//     const [endDate, setEndDate] = useState<string>('');
//     const [loading, setLoading] = useState<boolean>(false);

//     // Filter dummy data based on selected date range
//     const filteredData = useMemo<DataItem[]>(() => {
//         const dummyData: DataItem[] = [
//             { date: '2025-01-01', amount: 200 },
//             { date: '2025-02-01', amount: 250 },
//             { date: '2025-03-01', amount: 300 },
//             { date: '2025-04-01', amount: 280 },
//             { date: '2025-05-01', amount: 350 },
//             { date: '2025-06-01', amount: 400 },
//         ];
//         return dummyData.filter((item) => {
//             const itemDate = new Date(item.date);
//             const start = startDate ? new Date(startDate) : null;
//             const end = endDate ? new Date(endDate) : null;
//             return (!start || itemDate >= start) && (!end || itemDate <= end);
//         });
//     }, [startDate, endDate]);

//     // Calculate total contributions within the filtered date range
//     const totalContributions = useMemo<number>(() => {
//         return filteredData.reduce((acc, item) => acc + item.amount, 0);
//     }, [filteredData]);

//     // Benefit projection calculator logic (e.g., projected benefit = total contributions * factor)
//     const benefitProjection = useMemo<number>(() => {
//         // In a real application, you might use a more complex calculation.
//         return totalContributions * 1.2;
//     }, [totalContributions]);

//     // Ref for the report container to export as PDF
//     const reportRef = useRef<HTMLDivElement>(null);

//     // Handler to download the report as a PDF
//     const handleDownloadPDF = async (): Promise<void> => {
//         if (!reportRef.current) return;
//         try {
//             setLoading(true);
//             const canvas = await html2canvas(reportRef.current);
//             const imgData = canvas.toDataURL('image/png');
//             const pdf = new jsPDF('p', 'mm', 'a4');
//             const pdfWidth = pdf.internal.pageSize.getWidth();
//             const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//             pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//             pdf.save('contribution_report.pdf');
//             toast.success('PDF downloaded successfully.');
//         } catch (error) {
//             toast.error('Failed to export PDF.');
//         } finally {
//             setTimeout(() => setLoading(false), 30000);
//         }
//     };

//     // Handler to share report via email (opens default email client)
//     const handleShareReport = (): void => {
//         const subject = encodeURIComponent('My Contribution Report');
//         const body = encodeURIComponent('Please find attached my contribution report.');
//         window.location.href = `mailto:?subject=${subject}&body=${body}`;
//     };

//     return (
//         <div className="mt-4 p-4 bg-white rounded shadow">
//             <h2 className="text-xl font-bold mb-4">Generate Report</h2>

//             {/* Date Range Selection */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                         Start Date
//                     </label>
//                     <input
//                         type="date"
//                         value={startDate}
//                         onChange={(e) => setStartDate(e.target.value)}
//                         className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                         End Date
//                     </label>
//                     <input
//                         type="date"
//                         value={endDate}
//                         onChange={(e) => setEndDate(e.target.value)}
//                         className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                     />
//                 </div>
//             </div>

//             {/* Report Display Area */}
//             <div ref={reportRef} className="border p-4 mb-6">
//                 <h3 className="text-lg font-semibold mb-4">Contribution Growth</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                     <LineChart data={filteredData}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="date" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Line type="monotone" dataKey="amount" stroke="#8884d8" name="Contribution Amount" />
//                     </LineChart>
//                 </ResponsiveContainer>

//                 {/* Report Summary */}
//                 <div className="mt-4">
//                     <p>
//                         Total Contributions:{' '}
//                         <span className="font-bold">${totalContributions.toFixed(2)}</span>
//                     </p>
//                     <p>
//                         Projected Benefit:{' '}
//                         <span className="font-bold">${benefitProjection.toFixed(2)}</span>
//                     </p>
//                 </div>

//                 {/* Benefit Projection Details */}
//                 <div className="mt-4">
//                     <h4 className="text-md font-semibold">Benefit Projection Calculator</h4>
//                     <p>
//                         Based on your contributions, your projected benefit is estimated to be{' '}
//                         <span className="font-bold">${benefitProjection.toFixed(2)}</span>.
//                     </p>
//                 </div>
//             </div>

//             {/* Export and Share Options */}
//             <div className="flex flex-col md:flex-row gap-4">
//                 <button
//                     onClick={handleDownloadPDF}
//                     className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${loading ? 'animate-pulse' : ''}`}
//                     disabled={loading}
//                 >
//                     {loading ? 'Generating PDF...' : 'Download PDF'}
//                 </button>
//                 <button
//                     onClick={handleShareReport}
//                     className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//                 >
//                     Share Report
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ReportGenerator;
