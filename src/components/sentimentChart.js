"use client";
"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SentimentChart = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/sentimentCounts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        console.log("client data: ", jsonData);
        setData(jsonData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error fetching data: {error.message}</div>;
  if (data.length === 0) return <div>Loading...</div>;

  const labels = data.map((item) => item._id);
  const values = data.map((item) => item.value);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Sentiment Counts",
        data: values,
        backgroundColor: "rgba(195, 12, 2, 0.8)",
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "",
      },
    },
  };

  return (
    <div>
      <h1 className="text-5xl font-bold mx-auto h-fit text-center">
        Sentiment Data Analysis
      </h1>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default SentimentChart;
