import React from 'react';
import { Link } from 'react-router-dom';
//import Budget from '../Components/Budget';
//import BudgetInput from '../Components/BudgetInput'

function Menu() {

  function refreshPage() {
    window.location.reload(false);
  }
  return (
<nav>
        <ul>

            <nav>


            <li><Link itemProp= "url" to ="/" rel='external no follow'> Home </Link></li>
            <li><Link itemProp="url" to ="/SignUp">Sign Up</Link></li>
            <li><Link itemProp="url" to="/login">Login</Link></li>
            <div>
      <button onClick={refreshPage}>Click Me After You Enter Budget!!!!!</button>
    </div>
            </nav>
        </ul>
    </nav>
  );
}

export default Menu;