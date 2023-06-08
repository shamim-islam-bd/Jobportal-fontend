import Home from "@/components/Home";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

async function getData(query) {
  // console.log("query", query);

  const jobType = query?.jobType || "";
  const education = query?.education || "";
  const experience = query?.experience || "";
  const salary = query?.salary || "";

  let min_salary = "";
  let max_salary = "";

  if(query?.salary) {
    const salaryArr = query?.salary.split("-");
    min_salary = salaryArr[0];
    max_salary = salaryArr[1];
  }

  const keyword = query?.keyword || "";
  const location = query?.location || "";
  const page = query?.page || 1;

  const queryStr = `?keyword=${keyword}&location=${location}&page=${page}&jobType=${jobType}&education=${education}&experience=${experience}&salary=${salary}&min_salary=${min_salary}&max_salary=${max_salary}`;

  const res = await fetch(`${process.env.API_URL}/api/jobs/${queryStr}`);
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
