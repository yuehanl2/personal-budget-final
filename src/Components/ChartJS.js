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
