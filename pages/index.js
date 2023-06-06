import Home from "@/components/Home";
import { useEffect, useState } from "react";

async function getData() {
  const res = await fetch(`${process.env.API_URL}/jobs/`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function Index() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        setError(error);
      }

  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {data && <Home data={data} />}
    </>
  );
}
