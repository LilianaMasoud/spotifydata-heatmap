import React from "react";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "./Heatmap-styles.css";

const Heatmap = ({ data }) => {
  const getAllDaysInMonth = (year, month) => {
    const days = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      days.push(new Date(date).toISOString().split("T")[0]); 
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  
  const groupByMonth = (data) => {
    const months = Array(12)
      .fill(null)
      .map((_, month) => {
        const year = 2024; 
        const daysInMonth = getAllDaysInMonth(year, month);
        return daysInMonth.map((date) => {
          const dayData = data.find((d) => d.date === date);
          return (
            dayData || {
              date: date,
              totalSongs: 0,
              mostPlayed: "No data",
            }
          );
        });
      });
    return months;
  };

  const monthsData = groupByMonth(data);

  const tooltipData = (value) => {
    if (!value || !value.date) return "No data available";
    return value.totalSongs === 0
      ? `<strong>Date:</strong> ${value.date}<br/>No data`
      : `<strong>Date:</strong> ${value.date}<br/>
         <strong>Total Songs:</strong> ${value.totalSongs}<br/>
         <strong>Most Played:</strong> ${value.mostPlayed}`;
  };

  return (
    <div className="heatmap-container">
      <h2>Liliana's Spotify Heatmap for 2024</h2>
      <div className="heatmap-months">
        {monthsData.map((days, index) => (
          <div key={index} className="heatmap-month">
            <h3>
              {new Date(2024, index).toLocaleString("default", { month: "long" })}
            </h3>
            <div className="heatmap-grid">
              {days.map((day) => (
                <div
                  key={day.date}
                  className={`heatmap-cell ${
                    day.totalSongs === 0 ? "color-empty" : `color-scale-${Math.min(day.totalSongs, 4)}`
                  }`}
                  data-tooltip-id="heatmap-tooltip"
                  data-tooltip-html={tooltipData(day)}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <ReactTooltip id="heatmap-tooltip" />
    </div>
  );
};

export default Heatmap;







