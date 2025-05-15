// pages/machine/[id].tsx (remains the same)
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import PartsTable from '../../components/PartsTable';

type Machine = {
  id: string;
  Name: string;
  Location: string;
  Status: string;
};

type Part = {
  id: string;
  Name: string;
  Quantity: number;
  Price: number;
};

export default function MachineDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [machine, setMachine] = useState<Machine | null>(null);
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const [machineRes, partsRes] = await Promise.all([
        fetch(`/api/machines/${id}`),
        fetch('/api/parts')
      ]);
      
      const machineData = await machineRes.json();
      const partsData = await partsRes.json();
      
      setMachine(machineData);
      setParts(partsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [id]);

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!machine) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold text-gray-700">Machine not found</h2>
        <button 
          onClick={() => router.back()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{machine.Name}</h1>
            <div className="mt-2">
              <p className="text-gray-600">
                <span className="font-medium">Location:</span> {machine.Location}
              </p>
              <p className="text-gray-600 mt-1">
                <span className="font-medium">Status:</span> 
                <span className={`inline-block ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                  machine.Status === 'Operational' ? 'bg-green-100 text-green-800' :
                  machine.Status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {machine.Status}
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            ← Back to Machines
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Associated Parts</h2>
          <button 
            onClick={refreshData}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
          >
            Refresh
          </button>
        </div>
        <PartsTable parts={parts} refreshData={refreshData} />
      </div>
    </div>
  );
}