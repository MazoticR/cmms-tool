import { useState, useEffect } from 'react';
import PartsTable from '../components/PartsTable';
import MachineView from '../components/MachineView';

type Part = {
  id: string;
  Name: string;
  Quantity: number;
  Price: number;
  Supplier?: string;
};

type Machine = {
  id: string;
  Name: string;
  Location: string;
  Status: string;
};

export default function Home() {
  const [parts, setParts] = useState<Part[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [partsRes, machinesRes] = await Promise.all([
          fetch('/api/parts'),
          fetch('/api/machines')
        ]);
        
        const partsData = await partsRes.json();
        const machinesData = await machinesRes.json();
        
        setParts(partsData);
        setMachines(machinesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">CMMS Dashboard</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Machines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {machines.map(machine => (
            <MachineView key={machine.id} machine={machine} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Parts Inventory</h2>
        <PartsTable parts={parts} />
      </section>
    </div>
  );
}