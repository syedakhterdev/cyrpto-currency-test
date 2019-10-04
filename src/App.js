import React , {Component} from 'react';
import './App.css';
import {HashRouter,Switch,Route} from 'react-router-dom';
import Home from './components/container/home';
import SingleCurrency from './components/container/singleCurrency'
class App extends Component {

  render(){

    return (
      <HashRouter>
      <div className="App">
      


      <div>
     
        <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/currency_detail/:id" component={SingleCurrency} />
        </Switch>
      </div>
   
      </div>
      </HashRouter>
    );
  }
 
}

export default App;
