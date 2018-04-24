//client/components/Update.js
import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

var querystring = require('querystring');

class Update extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      description: '',
      status: '',
      month: '',
      weekday: '',
      messageFromServer: '',
      modalIsOpen: false
    }
this.update = this.update.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
}
componentDidMount() {
    this.setState({
      id: this.props.implantacion._id,
      description: this.props.implantacion.description,
      status: this.props.implantacion.status,
      month: this.props.implantacion.month,
      weekday: this.props.implantacion.weekday,
    });
  }
openModal() {
    this.setState({
      modalIsOpen: true
    });
  }
closeModal() {
    this.setState({
      modalIsOpen: false,
      messageFromServer: ''
    });
  }
handleSelectChange(e) {
    if (e.target.name == "month") {
      this.setState({
        month: e.target.value
      });
    }
    if (e.target.name == "weekday") {
      this.setState({
        weekday: e.target.value
      });
    }
  }
handleTextChange(e) {
    if (e.target.name == "description") {
      this.setState({
        description: e.target.value
      });
    }
if (e.target.name == "status") {
      this.setState({
        status: e.target.value
      });
    }
  }
onClick(e) {
    this.update(this);
  }
update(e) {
    axios.post('/update',
      querystring.stringify({
        _id: e.state.id,
        description: e.state.description,
        status: e.state.status,
        month: e.state.month,
        weekday: e.state.weekday
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function(response) {
      e.setState({
        messageFromServer: response.data
      });
});
  }
render() {
    if(this.state.messageFromServer == ''){
      return (
        <div>
          <Button bsStyle="warning" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-edit"></span></Button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Add implantacion"
            className="Modal">
          <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
            <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
          </Link><br/>
          <fieldset>
            <label for="description">Description:</label><input type="text" id="description" name="description" value={this.state.description} onChange={this.handleTextChange}></input>
            <label for="status">status:</label><select id="status" name="status" value={this.state.status} onChange={this.handleSelectChange}>
                        <option value="Planificada" id="30">Planificada</option>
                        <option value="En vuelo" id="31">En vuelo</option>
                        <option value="En pruebas" id="32">En pruebas</option>
                        <option value="Realizada OK" id="33">Realizada OK</option>
                        <option value="CANCELADA" id="34">CANCELADA</option>
                  </select>
            <label for="month">Month:</label><select id="month" name="month" value={this.state.month} onChange={this.handleSelectChange}>
                      <option value="Jan" id="Jan">January</option>
                      <option value="Feb" id="Feb">Febrary</option>
                      <option value="Mar" id="Mar">March</option>
                      <option value="Apr" id="Apr">April</option>
                      <option value="May" id="May">May</option>
                      <option value="Jun" id="Jun">June</option>
                      <option value="Jul" id="Jul">July</option>
                      <option value="Aug" id="Aug">August</option>
                      <option value="Sep" id="Sep">September</option>
                      <option value="Oct" id="Oct">October</option>
                      <option value="Nov" id="Nov">November</option>
                      <option value="Dec" id="Dec">December</option>
                </select>
            <label for="weekday">Weekday:</label><select id="weekday" name="weekday" value={this.state.weekday} onChange={this.handleSelectChange}>
                    <option value="Lunes" id="40">Lunes</option>
                    <option value="Martes" id="41">Martes</option>
                    <option value="Miercoles" id="42">Miercoles</option>
                    <option value="Jueves" id="43">Jueves</option>
                    <option value="Viernes" id="44">Viernes</option>
                    <option value="Sabado" id="45">Sabado</option>
                    <option value="Domingo" id="46">Domingo</option>
                </select>
          </fieldset>
          <div className='button-center'>
              <br/>
              <Button bsStyle="warning" bsSize="small" onClick={this.onClick}>Update</Button>
            </div>
          </Modal>
        </div>
      )
    }
    else{
      return (
        <div>
         <Button bsStyle="warning" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-edit"></span></Button>
         <Modal
           isOpen={this.state.modalIsOpen}
           onAfterOpen={this.afterOpenModal}
           onRequestClose={this.closeModal}
           contentLabel="Add implantacion"
           className="Modal">
        <div className='button-center'>
              <h3>{this.state.messageFromServer}</h3>
              <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
                <Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>Close the Dialog</Button>
              </Link>
            </div>
          </Modal>
        </div>
        )
      }
  }
}

export default Update;