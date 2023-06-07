import Home from "@/components/Home";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

async function getData(query) {
  // console.log("query", query);

  const keyword = query?.keyword || "";
  const location = query?.location || "";

  const queryStr = `?keyword=${keyword}&location=${location}`;

  const res = await fetch(`${process.env.API_URL}/jobs/${queryStr}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function Index() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(query);
        setData(result);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();

  }, [query]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {data && <Home data={data} />}
    </>
  );
}
