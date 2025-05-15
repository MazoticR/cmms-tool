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
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    try {
      setLoading(true);
      const [partsRes, machinesRes, logsRes] = await Promise.all([
        fetch('/api/parts'),
        fetch('/api/machines'),
        fetch('/api/maintenance')
      ]);
      setParts(await partsRes.json());
      setMachines(await machinesRes.json());
      setLogs(await logsRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">CMMS Dashboard</h1>
      
      {/* Navigation Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('parts')}
          className={`px-4 py-2 ${activeTab === 'parts' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-600'}`}
        >
          Parts
        </button>
        <button
          onClick={() => setActiveTab('machines')}
          className={`px-4 py-2 ${activeTab === 'machines' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-600'}`}
        >
          Machines
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2 ${activeTab === 'logs' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-600'}`}
        >
          Maintenance Logs
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Tab Content */}
      {!loading && (
        <>
          {activeTab === 'parts' && (
            <PartsTable 
              parts={parts} 
              refreshData={refreshData} 
            />
          )}
          
          {activeTab === 'machines' && (
            <MachinesTable 
              machines={machines} 
              refreshData={refreshData} 
            />
          )}
          
            {activeTab === 'logs' && (
              <MaintenanceLogsTable 
                logs={logs} 
                refreshData={refreshData} 
              />
            )}
        </>
      )}
    </div>
  );
}