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
    <div className="space-y-4">
      <AddMaintenanceForm 
        machines={machines} 
        parts={parts} 
        onAdd={refreshData} 
      />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Machine</th>
              <th>Part</th>
              <th>Date</th>
              <th>Cost</th>
              <th>Technician</th>
            </tr>
          </thead>
          <tbody>
            {logs && logs.length > 0 ? (
              logs.map(log => (
                <tr key={log.id}>
                  <td>{log.Machine?.[0] || 'N/A'}</td>
                  <td>{log.PartUsed?.[0] || 'N/A'}</td>
                  <td>{log.Date ? new Date(log.Date).toLocaleDateString() : 'N/A'}</td>
                  <td>{log.Cost ? `$${log.Cost.toFixed(2)}` : 'N/A'}</td>
                  <td>{log.Technician || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-muted-foreground">
                  {logs ? 'No maintenance logs found' : 'Loading logs...'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}