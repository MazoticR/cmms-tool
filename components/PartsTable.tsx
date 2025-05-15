// components/PartsTable.tsx
import { Part } from '../types';
import AddPartForm from './AddPartForm';

interface PartsTableProps {
  parts: Part[];
  refreshData: () => void;
}

export default function PartsTable({ parts, refreshData }: PartsTableProps) {
  return (
    <div className="space-y-4">
      <AddPartForm onAdd={refreshData} />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {parts && parts.length > 0 ? (
              parts.map(part => (
                <tr key={part.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{part.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{part.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${part.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{part.supplier || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No parts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}