import { useAuth } from "../context/Auth/AuthContext";
import { useEffect, useState } from "react";
import axiosInstance from "../service/axiosInstance";

const apiKey = import.meta.env.VITE_REACT_APP_BASE_URL;

function useGetData(endpoint) {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [refetchData, setRefetchData] = useState();
  const { token } = useAuth();

  const fetchData = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      setLoading(true);
      const response = await axiosInstance.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { ...query },
        signal,
      });
      const fetchedData = await response.data;
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);

      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [refetchData, query]);

  return { data, setData, loading, fetchData, setRefetchData, error, setQuery };
}

export default useGetData;
