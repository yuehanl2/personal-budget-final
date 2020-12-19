import React, { Component } from "react";
import axios from "axios";
import Charts from "../BudgetPage/BudgetPage";

/*

var dataSource = {
  datasets: [
    {
        data: [],
        backgroundColor: [
            '#ffcd56',
            '#ff6384',
            '#36a2eb',
            '#fd6b19',
            '#04B45F',
            '#2E3B0B',
            '#FE2EF7',

        ],
     
    }
],
labels: [],
};

function getBudget(){
  axios.get('http://localhost:4001/budget')
    .then(function (res){
        for(var i = 0; i <7; i++){
            dataSource.datasets[0].data[i]=res.data.myBudget[i].budget;
            dataSource.labels[i]=res.data.myBudget[i].title
            dataSource.datasets[0].backgroundColor[i]=res.data.myBudget[i].color;
        }

  var data = dataSource.datasets[0].data;
  var labels = dataSource.labels;
  var colors = dataSource.datasets[0].backgroundColor;
  console.log(colors);

  function createChart(){
      var ctx = document.getElementById("myChart");
      var myPieChart = new Chart(ctx,{
          type: 'pie',
          data: dataSource
      });
  }
  function randomData(){
      return labels.map( function(label,i){
      return {label: label, value:data[i]}
    
      });
  }
  createChart();
  createColors(randomData());
  drawChart(randomData());
  createSvg();
    });
}

getBudget();


var colors;
var svg;

function createColors(data){
  console.log(dataSource);
  colors = d3.scaleOrdinal()
  .domain(data.map(d =>d.budget))
  .range(dataSource.datasets[0].backgroundColor);
}

function createSvg(){
  svg=d3.select("d3Pie")
  .append("svg")
  .attr("width",450)
  .attr("height",450)
  .append("g")
  .attr(
      "transform",
      "translate(" + 200 + ","+ 200 +")");
}

function drawChart(data) {

 const pie = d3.pie().value((d)=> Number(d.value));

  svg
  .selectAll('pieces')
  .data(pie(data))
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(120)
  )
  .attr('fill', (d, i) => (this.colors(i)))
  .attr("stroke", "#121926")
  .style("stroke-width", "1px");

  // Add labels
  const labelLocation = d3.arc()
  .innerRadius(100)
  .outerRadius(120);

  svg
  .selectAll('pieces')
  .data(pie(data))
  .enter()
  .append('text')
  .text(d => d.data.title)
 // .text(d => d.data.budget)
  .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
  .style("text-anchor", "central")
  .style("font-size", 12);



} 

*/

class MyBudget extends Component {
  state = {
  title: "",
  value: "",
  data: {
      labels: [],
      datasets: [
        {
          label: [],
          data: [],
          backgroundColor: [],
        },
      ],
    },
  };


    /*
    function getBudget(){
  axios.get('http://localhost:4001/budget')
    .then(function (res){
        for(var i = 0; i <7; i++){
           
        }

  var data = dataSource.datasets[0].data;
  var labels = dataSource.labels;
  var colors = dataSource.datasets[0].backgroundColor;
  console.log(colors);
    */
  async componentDidMount() {
    let token = localStorage.getItem("jwt");
     axios.get("http://localhost:4001/budget/"+localStorage.getItem("userId"), {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then((res) => {

        /* 
  var data = dataSource.datasets[0].data;
  var labels = dataSource.labels;
  var colors = dataSource.datasets[0].backgroundColor;
  console.log(colors);
  
   dataSource.datasets[0].data[i]=res.data.myBudget[i].budget;
   dataSource.labels[i]=res.data.myBudget[i].title
   dataSource.datasets[0].backgroundColor[i]=res.data.myBudget[i].color;*/
      let dataSource = this.state.data;
      for (let i = 0; i < res.data.length; i++) {
        dataSource.datasets[0].data[i] = res.data[i].value;
        dataSource.labels[i] = res.data[i].title;
        dataSource.datasets[0].backgroundColor[i] = res.data[i].color;
      }
  
      this.setState({
        data: Object.assign({}, this.state.data, {
          data: dataSource,
        }),
      });
    })
    
  }

  handleTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  handleValue = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    console.log(this.state.title);
    console.log(this.state.value);
    let token = localStorage.getItem("jwt");
    let color =
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    axios
      .post("http://localhost:4001/addBudget", {
        title: this.state.title,
        value: this.state.value,
        color: color,
        userId: localStorage.getItem("userId")
      },
      { headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res);
        let tempData = this.state.data;

        tempData.datasets[0].data.push(res.data[0].value);
        tempData.labels.push(res.data[0].title);
        tempData.datasets[0].backgroundColor[0] = res.data[0].color;
        this.setState({ data: tempData });
        console.log(this.state.data);
      })
      .catch((err) => {
        console.log(err);
      });

    event.preventDefault();
  };

  restartGame(event) {
    this.setState({ games: [] });
  }


  render() {
    return (
      <div>
        <h1> ↑↑↑ Click the button after input budget information</h1>
        <h1>This is a secret page, only Login user can see this</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="budget">
          <div className="title">
            <label htmlFor="title">Your budget is: </label>
            <input
              type="text"
              value={this.state.title}
              onChange={this.handleTitle}
            />
          </div>

          <div className="value">
            <label htmlFor="value">This budget value is: </label>
            <input
              type="number"
              value={this.state.value}
              onChange={this.handleValue}
            />
          </div>

          <div className="submit">
            <input type="submit" value="Submit Budget Information" />
            

          </div>
          </div>
        </form>
        <Charts chartData={this.state.data} />
      </div>
    );
  }
}
export default MyBudget;
