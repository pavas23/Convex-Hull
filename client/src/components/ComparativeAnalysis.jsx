import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "../css/Introduction.css";
import "../css/ComparativeAnalysis.css";

const ComparativeAnalysis = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const xValues = [10, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const yValues1 = [
    0.10000002384185791, 0.5, 0.3999999761581421, 0.7999999523162842,
    0.800000011920929, 0.699999988079071, 0.699999988079071, 2,
    0.699999988079071, 1.300000011920929,
  ];
  const yValues2 = [
    2.199999988079071, 4.400000035762787, 5.400000035762787, 7.400407038762787,
    10.800000011920929, 13.599999964237213, 15.699999988079071,
    14.700000047683716, 17.69999998807907, 17.899999976158142,
  ];

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: xValues.map((value, index) => `${value}`),
            datasets: [
              {
                label: "Jarvis March",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgb(255, 99, 132)",
                data: yValues2,
                fill: true,
              },
              {
                label: "K.P.S",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgb(54, 162, 235)",
                data: yValues1,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Comparing time taken by Jarvis March and K.P.S Algorithm",
                font: {
                  size: 18,
                },
              },
            },
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: "N (Input Size)",
                  font: {
                    size: 14,
                  },
                },
                ticks: {
                  font: {
                    size: 12,
                  },
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: "Time taken for execution (ms)",
                  font: {
                    size: 14,
                  },
                },
                ticks: {
                  font: {
                    size: 12,
                  },
                },
              },
            },
          },
        });
      }
    }
  }, [xValues, yValues1, yValues2]);

  return (
    <div className="comparative-analysis-container">
      <h1 className="comparative-analysis-title">Comparative Analysis</h1>
      <div className="chart-container">
        <canvas
          ref={chartRef}
          style={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 25px 50px -10px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
            zIndex: 2,
          }}
        ></canvas>
      </div>
    </div>
  );
};

export default ComparativeAnalysis;
