import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export function useApiObjects(pageSize = 5) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://api.restful-api.dev/objects");
      setData(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deleteObject = async (id) => {
    await axios.delete(`https://api.restful-api.dev/objects/${id}`);
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return {
    data: paginatedData,
    loading,
    error,
    page,
    totalPages,
    handlePrev,
    handleNext,
    deleteObject,
    refetch: fetchData,
  };
}
