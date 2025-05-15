// components/MaintenanceLogsTable.tsx
import { MaintenanceLog } from '../types';
import AddMaintenanceForm from './AddMaintenanceForm';

interface MaintenanceLogsTableProps {
  logs: MaintenanceLog[];
  refreshData: () => void;
}

export default function MaintenanceLogsTable({ 
  logs, 
  refreshData 
}: MaintenanceLogsTableProps) {
  return (
    <div className="space-y-4">
      <AddMaintenanceForm onAdd={refreshData} />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Machine</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technician</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logs && logs.length > 0 ? (
              logs.map(log => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.machine?.name || 'N/A'}
                    {log.machine?.location && (
                      <div className="text-sm text-gray-500">{log.machine.location}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.part?.name || 'N/A'}
                    {log.part?.price && (
                      <div className="text-sm text-gray-500">${log.part.price.toFixed(2)}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(log.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${log.cost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.technician}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      log.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      log.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No maintenance logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}