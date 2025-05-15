// components/AddPartForm.tsx
import { useState } from 'react';

export default function AddPartForm({ onAdd }: { onAdd: () => void }) {
  // Initialize all form states with proper types
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [supplier, setSupplier] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/parts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          quantity: Number(quantity), 
          price: Number(price), 
          supplier 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add part');
      }

      const data = await response.json();
      console.log('Success:', data);
      
      // Reset form
      setName('');
      setQuantity(0);
      setPrice(0);
      setSupplier('');
      onAdd();
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded">
      <h3 className="font-bold mb-2">Add New Part</h3>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}

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
          min="0"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="p-2 border rounded"
          step="0.01"
          min="0"
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
        disabled={isSubmitting}
        className={`mt-2 px-4 py-2 rounded ${
          isSubmitting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {isSubmitting ? 'Adding...' : 'Add Part'}
      </button>
    </form>
  );
}