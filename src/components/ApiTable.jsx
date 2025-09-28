import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ApiTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    fetch("https://api.restful-api.dev/objects")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(`https://api.restful-api.dev/objects/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setData((prev) => prev.filter((item) => item.id !== id));
          Swal.fire('Deleted!', 'Record has been deleted.', 'success');
        } else {
          Swal.fire('Failed!', 'Failed to delete record.', 'error');
        }
      } catch (err) {
        Swal.fire('Error!', 'Error deleting record: ' + err.message, 'error');
      }
    }
  };

  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  if (loading) return <div className="text-blue-400">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">API Data Table</h2>
      <table className="min-w-full bg-gray-800 text-white rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-700">ID</th>
            <th className="py-2 px-4 border-b border-gray-700">Name</th>
            <th className="py-2 px-4 border-b border-gray-700">Data</th>
            <th className="py-2 px-4 border-b border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id} className="border-b border-gray-700">
              <td className="py-2 px-4">{item.id}</td>
              <td className="py-2 px-4">{item.name}</td>
              <td className="py-2 px-4">
                <pre className="whitespace-pre-wrap text-xs bg-gray-900 p-2 rounded">
                  {JSON.stringify(item.data, null, 2)}
                </pre>
              </td>
              <td className="py-2 px-4">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white rounded px-3 py-1 text-xs"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center mt-4 gap-2">
        <button onClick={handlePrev} disabled={page === 1} className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50">Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNext} disabled={page === totalPages} className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}
