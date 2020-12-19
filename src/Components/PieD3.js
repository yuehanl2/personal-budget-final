import React from 'react';
import * as d3 from "d3";

const data = [
  {
    "title": "Eat out",
    "budget": 70
  },
  {
    "title": "Rent",
    "budget": 375
  },
  {
    "title": "Groceries",
    "budget": 110
  },
  {
    "title": "Electricity",
    "budget": 70
  },
  {
    "title": "Outdoor sports",
    "budget": 100
  },
  {
    "title": "Shopping",
    "budget": 100
  },
  {
    "title": "Water",
    "budget": 60
  }
];
var label=[];

      

        for(var i = 0; i <7; i++){
           label[i]=data[i].budget;
           //dataSource.datasets[0].backgroundColor[i]=res.data.myBudget[i].color;
       }

  //var data = dataSource.datasets[0].data;
 // var labels = dataSource.labels;
  //var colors = dataSource.datasets[0].backgroundColor;
 // console.log(colors);
 


   




const PieChart = ()=> {
  const height = 400;
  const width = 400;
  let pie = d3.pie()(label);

  const Slice = props =>{
      let {pie} = props;
      let arc = d3.arc()
        .innerRadius(0)
        .outerRadius(100);
  let interpolate = d3.interpolateRgb("#3498DB","#76D7C4");

  return pie.map((slice,index)=>{
      let sliceColor = interpolate(index/(pie.length-1));
      return<path d={arc(slice)} fill={sliceColor}/>;
  });


  }

  return(
      <svg height={height} width={width}>
          <g transform={`translate(${200} ,${200})`}>
              <Slice pie={pie}/>
          </g>


      </svg>


  )

}

export default PieChart;