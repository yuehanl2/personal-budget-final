import React from 'react';
import './App.scss';
//import ChartJS from './Components/ChartJS'



import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";

import Menu from './Menu/Menu';
//import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
//import LoginPage from './LoginPage/LoginPage';  <LoginPage></LoginPage>
//import Footer from './Footer/Footer';
//import AboutPage from './BudgetPage/BudgetPage';
import LoginPage from './LoginPage/LoginPage';
import SignUpPage from './SignUp/SignUp';
import MyBudgetPage from './MyBudget/MyBudget';
import BudgetPage from './BudgetPage/BudgetPage';
//import PieD3 from './Components/PieD3'


function App() {
  return (
    <Router>
      <a href="#main" class="skip">Skip to content</a>
      <Menu/>
      <div className = "mainContainer">
        <Switch>
          <Route path = "/SignUp">
            <SignUpPage/>
          </Route>

          <Route path = "/login">
            <LoginPage/>
          </Route>

          <Route path = "/MyBudget">
            <MyBudgetPage/>
          </Route>

          <Route path = "/BudgetPage">
            <MyBudgetPage/>
          </Route>

          <Route path = "/">
            <HomePage/>
          </Route>

        </Switch>
        


      </div>

    

    </Router>

    
  );
}

export default App;
