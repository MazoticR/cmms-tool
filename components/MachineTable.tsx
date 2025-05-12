import { Machine } from '../types';
import AddMachineForm from './AddMachineForm';

interface MachinesTableProps {
  machines: Machine[] | undefined;
  refreshData: () => void;
}

export default function MachinesTable({ machines, refreshData }: MachinesTableProps) {
  return (
    <div className="overflow-x-auto">
      <AddMachineForm onAdd={refreshData} />
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Machine Name</th>
            <th className="px-4 py-2 border">Location</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {machines && machines.length > 0 ? (
            machines.map((machine) => (
              <tr key={machine.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{machine.Name}</td>
                <td className="px-4 py-2 border">{machine.Location}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs ${
                      machine.Status === 'Operational'
                        ? 'bg-green-100 text-green-800'
                        : machine.Status === 'Maintenance'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {machine.Status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="px-4 py-2 border text-center text-gray-500">
                {machines ? 'No machines found' : 'Loading machines...'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}