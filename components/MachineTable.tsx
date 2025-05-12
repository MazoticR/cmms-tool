// components/MachinesTable.tsx
import { Machine } from '../types';

interface MachinesTableProps {
  machines: Machine[];
}

export default function MachinesTable({ machines }: MachinesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Machine Name</th>
            <th className="px-4 py-2 border">Location</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {machines.map((machine) => (
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
          ))}
        </tbody>
      </table>

      {machines.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No machines found. Add one to get started.
        </div>
      )}
    </div>
  );
}