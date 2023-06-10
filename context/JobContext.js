import axios from "axios";
import { createContext, useState } from "react";
import { errorToast, successToast } from "./Toast";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [created, setCreated] = useState(null);
  const [updated, setUpdated] = useState(null);
  const [deleted, setDeleted] = useState(null);
  const [applied, setApplied] = useState(false);
  const [stats, setStats] = useState(false);

  // Create a new job
  const newJob = async (data, access_token) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.API_URL}/api/jobs/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (res.data) {
        setLoading(false);
        setCreated(true);
      }
    } catch (error) {
      setLoading(false);
      errorToast(error?.response?.data?.message);
    }
  };

  // Update job
  const updateJob = async (id, data, access_token) => {
    // console.log(data);

    try {
      setLoading(true);

      const res = await axios.put(
        `${process.env.API_URL}/api/jobs/${id}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (res.data) {
        setLoading(false);
        setUpdated(true);
      }
    } catch (error) {
      setLoading(false);
       errorToast(error?.response?.data?.message);
    }
  };

  // Apply to Job
  const applyToJob = async (id, access_token) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.API_URL}/api/jobs/${id}/apply/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

    //   console.log(res.data);

      if (res.data.applied === true) {
        setLoading(false);
        setApplied(true);
      }
    } catch (error) {
      setLoading(false);
      errorToast(error?.response?.data?.message);
    }
  };

  // Check job applied
  const checkJobApplied = async (id, access_token) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${process.env.API_URL}/api/jobs/${id}/check/`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      setLoading(false);
      setApplied(res.data);
      
    } catch (error) {
      setLoading(false);
      errorToast(error?.response?.data?.message);
    }
  };

  // Get topic stats
  const getTopicStats = async (topic) => {
    try {
      setLoading(true);

      const res = await axios.get(`${process.env.API_URL}/api/stats/${topic}/`);

      console.log(res.data);

      setLoading(false);
      setStats(res.data);

    } catch (error) {
      setLoading(false);
      errorToast(error?.response?.data?.message);
    }
  };

  // Delete job
  const deleteJob = async (id, access_token) => {
    try {
      setLoading(true);

      const res = await axios.delete(
        `${process.env.API_URL}/api/jobs/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log(res);

      setLoading(false);
      setDeleted(true);
      successToast("Job deleted successfully");
    } catch (error) {
      setLoading(false);
      errorToast(error?.response?.data?.message);
    }
  };

  // Clear Errors
  const clearErrors = () => {
    setError(null);
  };

  return (
    <JobContext.Provider
      value={{
        loading,
        error,
        created,
        updated,
        deleted,
        applied,
        stats,
        newJob,
        updateJob,
        deleteJob,
        getTopicStats,
        applyToJob,
        setUpdated,
        checkJobApplied,
        setCreated,
        setDeleted,
        clearErrors,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobContext;