// components/MaintenanceLogsTable.tsx
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
  // Helper function to get machine name by ID
  const getMachineName = (machineId: string) => {
    const machine = machines.find(m => m.id === machineId);
    return machine ? machine.Name : 'N/A';
  };

  // Helper function to get part name by ID
  const getPartName = (partId: string) => {
    const part = parts.find(p => p.id === partId);
    return part ? part.Name : 'N/A';
  };

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
              logs.map(log => {
                const machineId = Array.isArray(log.Machine) ? log.Machine[0] : log.Machine;
                const partId = Array.isArray(log.PartUsed) ? log.PartUsed[0] : log.PartUsed;
                
                return (
                  <tr key={log.id}>
                    <td>{machineId ? getMachineName(machineId) : 'N/A'}</td>
                    <td>{partId ? getPartName(partId) : 'N/A'}</td>
                    <td>{log.Date ? new Date(log.Date).toLocaleDateString() : 'N/A'}</td>
                    <td>{log.Cost ? `$${log.Cost.toFixed(2)}` : 'N/A'}</td>
                    <td>{log.Technician || 'N/A'}</td>
                  </tr>
                );
              })
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