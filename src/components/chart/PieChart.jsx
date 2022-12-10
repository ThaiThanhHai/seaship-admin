import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({ stats }) {
  const data = {
    labels: ["thành công", "thất bại", "đang giao"],
    datasets: [
      {
        label: "Đơn hàng",
        data: stats,
        backgroundColor: [
          "rgba(55, 152, 219, 1)",
          "rgba(231, 76, 60, 1)",
          "rgba(103, 255, 125, 1)",
        ],
        borderColor: [
          "rgba(55, 152, 219, 1)",
          "rgba(231, 76, 60, 1)",
          "rgba(103, 255, 125, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
}
