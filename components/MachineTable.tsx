// components/MachineTable.tsx (remains the same)
import { Machine } from '../types';
import AddMachineForm from './AddMachineForm';

interface MachinesTableProps {
  machines: Machine[] | undefined;
  refreshData: () => void;
}

export default function MachinesTable({ machines, refreshData }: MachinesTableProps) {
  return (
    <div className="space-y-4">
      <AddMachineForm onAdd={refreshData} />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Machine Name</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {machines && machines.length > 0 ? (
              machines.map((machine) => (
                <tr key={machine.id}>
                  <td>{machine.name}</td>
                  <td>{machine.location}</td>
                  <td>
                    <span className={`badge ${
                      machine.status === 'Operational' ? 'badge-operational' :
                      machine.status === 'Maintenance' ? 'badge-maintenance' :
                      'badge-retired'
                    }`}>
                      {machine.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-muted-foreground">
                  {machines ? 'No machines found' : 'Loading machines...'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}