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
   return <Link to={{pathname: '/', search: '?month=All&weekday='+this.props.weekday }} >
     <p style={this.state.style}>{this.props.weekday}</p>
    </Link>
 }
}

export default WeekdayTabsRouter;