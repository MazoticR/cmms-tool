import { MaintenanceLog } from '../types';

export default function MaintenanceLogsTable({ logs }: { logs: MaintenanceLog[] }) {
  return (
    <div className="overflow-x-auto">
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
          {logs.map(log => (
            <tr key={log.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{log.Machine?.[0] || 'N/A'}</td>
              <td className="px-4 py-2 border">{log.PartUsed?.[0] || 'N/A'}</td>
              <td className="px-4 py-2 border">{new Date(log.Date).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">${log.Cost?.toFixed(2)}</td>
              <td className="px-4 py-2 border">{log.Technician}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}