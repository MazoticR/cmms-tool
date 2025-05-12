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
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Part Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Supplier</th>
            </tr>
          </thead>
          <tbody>
            {parts && parts.length > 0 ? (
              parts.map(part => (
                <tr key={part.id}>
                  <td>{part.Name}</td>
                  <td>{part.Quantity}</td>
                  <td>${part.Price?.toFixed(2)}</td>
                  <td>{part.Supplier || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-muted-foreground">
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