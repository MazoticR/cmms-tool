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

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const machineRes = await fetch(`/api/machines/${id}`);
        const partsRes = await fetch('/api/parts');
        
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

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!machine) {
    return <div className="p-4">Machine not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{machine.Name}</h1>
      <div className="mb-6">
        <p><span className="font-semibold">Location:</span> {machine.Location}</p>
        <p><span className="font-semibold">Status:</span> 
          <span className={`inline-block ml-2 px-2 py-1 rounded ${
            machine.Status === 'Operational' ? 'bg-green-100 text-green-800' :
            machine.Status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {machine.Status}
          </span>
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-4">Associated Parts</h2>
      <PartsTable parts={parts} />
    </div>
  );
}