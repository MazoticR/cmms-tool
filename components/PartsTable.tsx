import { Part } from '../types';

interface PartsTableProps {
  parts: Part[];
}

export default function PartsTable({ parts }: PartsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Part Name</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Supplier</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <tr key={part.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{part.Name}</td>
              <td className="px-4 py-2 border">{part.Quantity}</td>
              <td className="px-4 py-2 border">${part.Price?.toFixed(2)}</td>
              <td className="px-4 py-2 border">{part.Supplier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}