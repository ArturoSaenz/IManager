//client/components/App.js

//import '../css/App.css';

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
import { Tab, Tabs } from 'react-bootstrap';
import WeekdayTabsRouter from './tabs/weekdayTabsRouter';

export default class App extends React.Component {

constructor() {
    super();
  this.state = {selectedMonth:'All', selectedWeekday: 'Lunes', data: [], activeTab:'Lunes'};
    this.getData = this.getData.bind(this);
  }


componentWillReceiveProps(nextProps) {
    if(nextProps.history.location.search){
    var search = nextProps.history.location.search;
    search = search.substring(1);
    var searchObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    this.setState({activeTab: searchObj.weekday});
    this.setState({selectedWeekday: searchObj.weekday});
    this.setState({selectedMonth: searchObj.month});
this.getData(this, searchObj.weekday, searchObj.month);
  }else{
      this.getData(this, 'Lunes', 'All');
    }
  }

componentDidMount(){
    this.getData(this, 'Lunes', 'All');
  }
handleSelect(selectedTab) {
     this.setState({
       activeTab: selectedTab,
       selectedWeekday: selectedTab
     });
  }

getData(ev, weekday, month){
    axios.get('/getAll?month='+month+'&weekday='+weekday)
      .then(function(response) {
        ev.setState({data: response.data});
        ev.setState({selectedWeekday: weekday});
        ev.setState({selectedMonth: month});
      });
}

render() {
    return (
      <div>
        
        <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
          <Tab eventKey={40} title={<WeekdayTabsRouter weekday='Lunes' />}></Tab>
          <Tab eventKey={41} title={<WeekdayTabsRouter weekday='Martes' />}></Tab>
          <Tab eventKey={42} title={<WeekdayTabsRouter weekday='Miercoles'/>}></Tab>
          <Tab eventKey={43} title={<WeekdayTabsRouter weekday='Jueves'/>}></Tab>
          <Tab eventKey={44} title={<WeekdayTabsRouter weekday='Viernes'/>}></Tab>
          <Tab eventKey={45} title={<WeekdayTabsRouter weekday='Sabado'/>}></Tab>
          <Tab eventKey={46} title={<WeekdayTabsRouter weekday='Domingo'/>}></Tab>
        </Tabs>
        
        <Add selectedMonth={this.state.selectedMonth} selectedWeekday={this.state.selectedWeekday} />
        
        <table>
          <thead>
            <tr><th></th>
                <th className='desc-col'>Description</th>
                <th className='button-col'>Status</th>
                <th className='button-col'>Month</th>
                <th className='button-col'>Weekday</th>
                <th className='button-col'>Update</th>
                <th className='button-col'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map(function(exp){
                return  <tr><td className='counterCell'></td>
                            <td className='desc-col'>{exp.description}</td>
                            <td className='button-col'>{exp.statu}</td>
                            <td className='button-col'>{exp.month}</td>
                            <td className='button-col'>{exp.weekday}</td>
                            <td className='button-col'><Update implantacion={exp} /></td>
                            <td className='button-col'><Delete id={exp._id} implantacion={exp} /></td>
                        </tr>
              })
            }
            </tbody>
        </table>
      </div>
    );
  }
}