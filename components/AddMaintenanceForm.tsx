// components/AddMaintenanceForm.tsx
import { useState } from 'react';
import { Machine } from '../types';
import { Part } from '../types';

export default function AddMaintenanceForm({ 
  machines, 
  parts, 
  onAdd 
}: { 
  machines: Machine[]; 
  parts: Part[]; 
  onAdd: () => void;
}) {
  const [machineId, setMachineId] = useState('');
  const [partId, setPartId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [cost, setCost] = useState(0);
  const [technician, setTechnician] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/maintenance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        Machine: [machineId], 
        PartUsed: [partId], 
        Date: date, 
        Cost: cost, 
        Technician: technician 
      }),
    });
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded">
      <h3 className="font-bold mb-2">Log Maintenance</h3>
      <div className="grid grid-cols-2 gap-4">
        <select
          value={machineId}
          onChange={(e) => setMachineId(e.target.value)}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Machine</option>
          {machines.map(machine => (
            <option key={machine.id} value={machine.id}>{machine.Name}</option>
          ))}
        </select>
        <select
          value={partId}
          onChange={(e) => setPartId(e.target.value)}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Part</option>
          {parts.map(part => (
            <option key={part.id} value={part.id}>{part.Name}</option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Cost"
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
          className="p-2 border rounded"
          step="0.01"
          required
        />
        <input
          type="text"
          placeholder="Technician"
          value={technician}
          onChange={(e) => setTechnician(e.target.value)}
          className="p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Log
      </button>
    </form>
  );
}