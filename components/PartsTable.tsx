import { Part } from '../types';

export default function PartsTable({ parts }: { parts: Part[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Part Name</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Supplier</th>
          </tr>
        </thead>
        <tbody>
          {parts && parts.length > 0 ? (
            parts.map(part => (
              <tr key={part.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{part.Name}</td>
                <td className="px-4 py-2 border">{part.Quantity}</td>
                <td className="px-4 py-2 border">${part.Price?.toFixed(2)}</td>
                <td className="px-4 py-2 border">{part.Supplier || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-4 py-2 border text-center text-gray-500">
                No parts found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

