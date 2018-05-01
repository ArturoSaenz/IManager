//client/components/tabs/weekdayTabsRouter.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs } from 'react-bootstrap'
import { Link } from 'react-router-dom';

class WeekdayTabsRouter extends React.Component {

constructor(){
  super();
  this.state={style:{'font-size': '16px'}}
 }

 render(){
 //YearTabsRouter returns a Link that renders the App component (using the route we created earlier) with weekday sent in as a prop in search.
 //Whenever this link will be clicked, App will be rendered and the implantaciones of the weekday sent in search will be loaded.
 //  return <Link to={{pathname: '/', search: '?month=All&weekday='+this.props.weekday }} >
   return <Link to={{pathname: '/', search: '?weekday='+this.props.weekday }} >
     <p style={this.state.style}>{this.props.weekday}</p>
    </Link>
 }
}

export default WeekdayTabsRouter;