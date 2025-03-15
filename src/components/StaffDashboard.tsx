import React, { useEffect, useState } from 'react';
import { ClipboardList, UserCheck, UserX } from 'lucide-react';
import toast from 'react-hot-toast';

interface QueueItem {
  _id: string;
  patientName: string;
  patientId: string;
  department: string;
  status: string;
  estimatedWaitTime: number;
}

const StaffDashboard = () => {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/queue');
      const data = await response.json();
      setQueueItems(data);
    } catch (error) {
      console.error('Error fetching queue:', error);
      toast.error('Failed to fetch queue');
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/queue/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast.success(`Patient ${status}`);
        fetchQueue();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error updating status');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <ClipboardList className="h-8 w-8 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Staff Dashboard</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {queueItems.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.patientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.patientId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${item.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'in-progress' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateStatus(item._id, 'in-progress')}
                      className="text-green-600 hover:text-green-900"
                    >
                      <UserCheck className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => updateStatus(item._id, 'completed')}
                      className="text-red-600 hover:text-red-900"
                    >
                      <UserX className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffDashboard;