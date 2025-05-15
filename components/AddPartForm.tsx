// components/AddPartForm.tsx (remains the same)
import { useState } from 'react';

export default function AddPartForm({ onAdd }: { onAdd: () => void }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [supplier, setSupplier] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/parts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Name: name, Quantity: quantity, Price: price, Supplier: supplier }),
    });
    onAdd(); // Refresh data
    setName(''); setQuantity(0); setPrice(0); setSupplier('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded">
      <h3 className="font-bold mb-2">Add New Part</h3>
      <div className="grid grid-cols-4 gap-2">
        <input
          type="text"
          placeholder="Part Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="p-2 border rounded"
          step="0.01"
          required
        />
        <input
          type="text"
          placeholder="Supplier"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Part
      </button>
    </form>
  );
}