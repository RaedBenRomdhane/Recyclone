import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import Card from "./Card.jsx";


function Interpreter(interpret){

  defaults.maintainAspectRatio = false;
  defaults.responsive = true;

  defaults.plugins.title.display = true;
  defaults.plugins.title.align = "start";
  defaults.plugins.title.font.size = 20;
  defaults.plugins.title.color = "black";

  //console.log(interpret);
  const wasteData=interpret.argument //=JSON.parse(interpret.argument);
  
  const length = wasteData.length;
  
  const colors = [
    'rgba(250, 192, 19, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(199, 199, 199, 0.8)',
    'rgba(83, 102, 255, 0.8)',
    'rgba(255, 205, 86, 0.8)',
    'rgba(255, 180, 76, 0.8)',
    'rgba(75, 100, 200, 0.8)',
    'rgba(235, 162, 54, 0.8)',
    'rgba(102, 255, 204, 0.8)',
    'rgba(192, 75, 192, 0.8)',
  ];
  
  return(<>
    
    <div className="container">
      <div className="area">
      <Doughnut
          data={{
            labels: wasteData.map((data) => data.type),
            datasets: [
              {
                label: "Count",
                data: wasteData.map((data) => data["pourcentage de présence"]),
                backgroundColor: colors.slice(0,length),
                borderColor: colors.slice(0,length),
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Pourcentage de Présence",
              },
            },
          }}
        />
      </div>
      <div className="area">
        <Bar
          data={{
            labels: wasteData.map((data) => data.type),
            datasets: [
              {
                label: "Certitude",
                data: wasteData.map((data) => data["certitude"]),
                backgroundColor: colors.slice(0,length),
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Certitude",
              },
            },
          }}
        />
      </div>
      <div className="area">
        <Bar
          data={{
            labels: wasteData.map((data) => data.type),
            datasets: [
              {
                label: "Taux de Recyclage",
                data: wasteData.map((data) => data["taux de recyclage"]),
                backgroundColor: colors.slice(0,length),
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Taux de Recyclage",
              },
            },
          }}
        />
      </div>
    </div> 
    <div className="cards">
      {wasteData.map((data) => <Card key={data.type}argument={ data}/>)}
    </div>
  </>)
}
export default Interpreter;






