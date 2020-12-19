import React from 'react';
import axios from 'axios';

export default class BudgetInput extends React.Component{
    state = {
        BudgetTitle:'',

    };
    handleChange = event => {
        this.setState({ BudgetTitle: event.target.value });
      }


    handleSubmit = event => {
        event.preventDefault();
    
        const user = {
            BudgetTitle: this.state.BudgetTitle
        };
    
        axios.post(`http://localhost:3000/budget`, { user })
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
      }


    render() {
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Title:
                <input type="text" BudgetTitle="name" onChange={this.handleChange} />
              </label>
            </form>
          </div>
        )
      }
}


