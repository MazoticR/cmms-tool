import { MaintenanceLog, Machine, Part } from '../types';
import AddMaintenanceForm from './AddMaintenanceForm';

interface MaintenanceLogsTableProps {
  logs: MaintenanceLog[] | undefined;
  machines: Machine[];
  parts: Part[];
  refreshData: () => void;
}

export default function MaintenanceLogsTable({ 
  logs, 
  machines, 
  parts, 
  refreshData 
}: MaintenanceLogsTableProps) {
  return (
    <div className="overflow-x-auto">
      <AddMaintenanceForm 
        machines={machines} 
        parts={parts} 
        onAdd={refreshData} 
      />
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Machine</th>
            <th className="px-4 py-2 border">Part</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Cost</th>
            <th className="px-4 py-2 border">Technician</th>
          </tr>
        </thead>
        <tbody>
          {logs && logs.length > 0 ? (
            logs.map(log => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{log.Machine?.[0] || 'N/A'}</td>
                <td className="px-4 py-2 border">{log.PartUsed?.[0] || 'N/A'}</td>
                <td className="px-4 py-2 border">
                  {log.Date ? new Date(log.Date).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-4 py-2 border">
                  {log.Cost ? `$${log.Cost.toFixed(2)}` : 'N/A'}
                </td>
                <td className="px-4 py-2 border">{log.Technician || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-4 py-2 border text-center text-gray-500">
                {logs ? 'No maintenance logs found' : 'Loading logs...'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}