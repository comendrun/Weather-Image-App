import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchingData = async () => {
      setIsPending(true);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const json = await res.json();

        setIsPending(false);
        setData(json);
        setError(null);
      } catch (err) {
        console.log(err);
        isPending(false);
        setError("Unfortunately Can't Fetch Data right now");
      }
    };
    fetchingData();
  }, [url]);

  return { data: data, isPending: isPending, error: error };
};
