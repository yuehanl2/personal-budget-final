import React from 'react';
import axios from 'axios';

export default class Budget extends React.Component{
    state = {
        budgetList:[],
        //bTitle:[]
    };

componentDidMount(){
    axios.get('http://localhost:3000/budget')
      .then(res =>{
          console.log(res);
          this.setState({budgetList: res.data});

      });

}
render(){
    return(
        <ul>
            {this.state.budgetList.map(budgetList => <li key = {budgetList.budget}>{budgetList.title}</li>)}
        </ul>
    )
}

}