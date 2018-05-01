//client/components/Delete.js

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Delete extends React.Component {

constructor(){
  super();
  this.state={id:'', month: '', weekday:''};
  this.onClick = this.onClick.bind(this);
  this.delete = this.delete.bind(this);
}

componentDidMount() {
    this.setState({
      id: this.props.implantacion._id,
      month: this.props.implantacion.month,
      weekday: this.props.implantacion.weekday
    })
  }
componentWillReceiveProps(nextProps){
  this.setState({
    id: nextProps.implantacion._id,
    month:nextProps.implantacion.month,
    weekday:nextProps.implantacion.weekday
  })
  }
onClick(e){
     this.delete(this);
    }
    
delete(e){
    axios.get('/delete?id='+e.state.id)
      .then(function(response) {
          
    });
}

render(){
    return (
        <Button bsStyle="danger" bsSize="small" onClick={this.onClick}>
         <Link to={{pathname: '/', search: '?weekday='+this.state.weekday}} style={{ textDecoration: 'none' }}>
                      <span className="glyphicon glyphicon-remove"></span>
             </Link>
        </Button>
    )
  }
}
export default Delete;