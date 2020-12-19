import React, { Component } from "react";
import { Radar, Pie,Bar,Polar } from "react-chartjs-2";

class BudgetPage extends Component {
 /*Radar not work well*/ 

  render() {
    return (
      <div>
        <Bar data={this.props.chartData} />
        <Pie data={this.props.chartData} />
        <Radar data={this.props.chartData}/>
        <Polar data={this.props.chartData}/>

      </div>
       
    );
  }
}

export default BudgetPage;
