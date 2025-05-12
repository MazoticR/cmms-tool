import { Machine } from '../types';

interface MachineViewProps {
  machine: Machine;
}

export default function MachineView({ machine }: MachineViewProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-2">{machine.Name}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Location:</p>
          <p>{machine.Location}</p>
        </div>
        <div>
          <p className="font-semibold">Status:</p>
          <p className={`inline-block px-2 py-1 rounded ${
            machine.Status === 'Operational' ? 'bg-green-100 text-green-800' :
            machine.Status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {machine.Status}
          </p>
        </div>
      </div>
    </div>
  );
}