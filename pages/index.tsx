import { useState, useEffect } from 'react';
import PartsTable from '../components/PartsTable';
import MachinesTable from '../components/MachineTable';
import MaintenanceLogsTable from '../components/MaintenanceLogsTable';
import { Part, Machine, MaintenanceLog } from '../types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'parts' | 'machines' | 'logs'>('logs');
  const [parts, setParts] = useState<Part[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [logs, setLogs] = useState<MaintenanceLog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [partsRes, machinesRes, logsRes] = await Promise.all([
        fetch('/api/parts'),
        fetch('/api/machines'),
        fetch('/api/maintenance')
      ]);
      setParts(await partsRes.json());
      setMachines(await machinesRes.json());
      setLogs(await logsRes.json());
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">CMMS Dashboard</h1>
      
      {/* Navigation Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('parts')}
          className={`px-4 py-2 ${activeTab === 'parts' ? 'border-b-2 border-blue-500' : ''}`}
        >
          Parts
        </button>
        <button
          onClick={() => setActiveTab('machines')}
          className={`px-4 py-2 ${activeTab === 'machines' ? 'border-b-2 border-blue-500' : ''}`}
        >
          Machines
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2 ${activeTab === 'logs' ? 'border-b-2 border-blue-500' : ''}`}
        >
          Maintenance Logs
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'parts' && <PartsTable parts={parts} />}
      {activeTab === 'machines' && <MachinesTable machines={machines} />}
      {activeTab === 'logs' && <MaintenanceLogsTable logs={logs} />}
    </div>
  );
}