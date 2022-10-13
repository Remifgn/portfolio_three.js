// import { Chart, registerables } from 'chart.js';

// export default class RadarChart
// {
//     constructor(){

//         this.setupChart()
//     }

//     setupChart()
//     {
//         var marksCanvas = document.getElementById("marksChart");
//         Chart.defaults.font.family = "Lato";
//         Chart.defaults.font.size = 22;
//         Chart.defaults.color = "black";
//         var marksData = {
//             labels: ["English", "Maths", "Physics", "Chemistry", "Biology", "History"],
//             datasets: [
//               {
//                 label: "Martha",
//                 backgroundColor: "#FFF17644",
//                 borderColor: "black",
//                 borderWidth: 1,
//                 data: [65, 75, 70, 80, 60, 80]
//               },
//               {
//                 label: "Steven",
//                 backgroundColor: "#8E24AA44",
//                 borderColor: "black",
//                 borderWidth: 1,
//                 data: [54, 65, 60, 70, 90, 75]
//               }
//             ]
//           };

//           var chartOptions = {
//             plugins: {
//               title: {
//                 display: true,
//                 align: "start",
//                 text: "Comparing Student Performance"
//               },
//               legend: {
//                 align: "start"
//               }
//             },
//             scales: {
//               r: {
//                 pointLabels: {
//                   font: {
//                     size: 20
//                   }
//                 }
//               }
//             }
//           };

//           var radarChart = new Chart(marksCanvas, {
//             type: "radar",
//             data: marksData,
//             options: chartOptions
//           });

//     }
// }
