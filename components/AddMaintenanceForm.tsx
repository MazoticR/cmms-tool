// components/AddMaintenanceForm.tsx
import { useState } from 'react';
import { Machine, Part } from '../types';

interface AddMaintenanceFormProps {
  onAdd: () => void;
}

export default function AddMaintenanceForm({ onAdd }: AddMaintenanceFormProps) {
  const [machineId, setMachineId] = useState<number | ''>('');
  const [partId, setPartId] = useState<number | ''>('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [cost, setCost] = useState(0);
  const [technician, setTechnician] = useState('');
  const [status, setStatus] = useState('Pending');
  const [loadingMachines, setLoadingMachines] = useState(false);
  const [loadingParts, setLoadingParts] = useState(false);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [parts, setParts] = useState<Part[]>([]);

  const fetchMachines = async () => {
    setLoadingMachines(true);
    try {
      const res = await fetch('/api/machines');
      const data = await res.json();
      setMachines(data);
    } catch (error) {
      console.error('Error fetching machines:', error);
    } finally {
      setLoadingMachines(false);
    }
  };

  const fetchParts = async () => {
    setLoadingParts(true);
    try {
      const res = await fetch('/api/parts');
      const data = await res.json();
      setParts(data);
    } catch (error) {
      console.error('Error fetching parts:', error);
    } finally {
      setLoadingParts(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (machineId === '' || partId === '') return;

    await fetch('/api/maintenance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        machine_id: machineId, 
        part_id: partId, 
        date, 
        cost, 
        technician,
        status
      }),
    });
    onAdd();
    // Reset form
    setMachineId('');
    setPartId('');
    setCost(0);
    setTechnician('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Add Maintenance Log</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Machine</label>
          <select
            value={machineId}
            onChange={(e) => setMachineId(e.target.value ? Number(e.target.value) : '')}
            className="w-full p-2 border rounded-md"
            required
            onFocus={fetchMachines}
          >
            <option value="">Select Machine</option>
            {loadingMachines ? (
              <option>Loading machines...</option>
            ) : (
              machines.map(machine => (
                <option key={machine.id} value={machine.id}>
                  {machine.name} ({machine.location})
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Part</label>
          <select
            value={partId}
            onChange={(e) => setPartId(e.target.value ? Number(e.target.value) : '')}
            className="w-full p-2 border rounded-md"
            required
            onFocus={fetchParts}
          >
            <option value="">Select Part</option>
            {loadingParts ? (
              <option>Loading parts...</option>
            ) : (
              parts.map(part => (
                <option key={part.id} value={part.id}>
                  {part.name} (${part.price?.toFixed(2)})
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
          <input
            type="number"
            placeholder="0.00"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            className="w-full p-2 border rounded-md"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Technician</label>
          <input
            type="text"
            placeholder="Technician name"
            value={technician}
            onChange={(e) => setTechnician(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Maintenance Log
      </button>
    </form>
  );
}