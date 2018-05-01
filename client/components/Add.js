//client/components/Add.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';

var querystring = require('querystring');

class Add extends React.Component {
constructor() {
      super();
this.state = {
        description: '',
        status: '',
        month: '',
        weekday: '',
        messageFromServer: '',
        modalIsOpen: false
      }
this.handleSelectChange = this.handleSelectChange.bind(this);
      this.onClick = this.onClick.bind(this);
      this.handleTextChange = this.handleTextChange.bind(this);
      this.insertNewImplantacion = this.insertNewImplantacion.bind(this);
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }
openModal() {
      this.setState({
        modalIsOpen: true
      });
    }
closeModal() {
      this.setState({
        modalIsOpen: false,
        description: '',
        status: '',
        month: '',
        weekday: '',
        messageFromServer: ''
      });
    }
componentDidMount() {
    if(this.props.selectedMonth == 'All'){
      this.setState({
        month: 'Jan'
      });
    }else{
      this.setState({
        month: this.props.selectedMonth
      });
    }

this.setState({
        weekday: this.props.selectedWeekday
      });
    }
componentWillReceiveProps(nextProps){
      if(this.props.selectedMonth == 'All'){
        this.setState({
          month: 'Jan'
        });
      }else{
        this.setState({
          month: this.props.selectedMonth
        });
      }

this.setState({
        weekday:nextProps.selectedWeekday
      })
    }
handleSelectChange(e) {
      if (e.target.name == 'month') {
        this.setState({
          month: e.target.value
        });
      }
      if (e.target.name == 'weekday') {
        this.setState({
          weekday: e.target.value
        });
      }
      if (e.target.name == 'status') {
        this.setState({
          status: e.target.value
        });
      }
    }
onClick(e) {
      this.insertNewImplantacion(this);
    }
insertNewImplantacion(e) {
      axios.post('/insert',
        querystring.stringify({
          desc: e.state.description,
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

handleTextChange(e) {
      if (e.target.name == "description") {
        this.setState({
          description: e.target.value
        });
      }
    }
render() {
   if(this.state.messageFromServer == ''){
      return (
        <div>
          <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
              <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                contentLabel="Add Implantacion"
                className="Modal"
              >
                <Link to={{pathname: '/', search: '?weekday='+this.state.weekday }} style={{ textDecoration: 'none' }}>
                 <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
                </Link><br/>

                <fieldset>
                     <label for="description">Description:</label><input type="text" id="description" name="description" value={this.state.description} onChange={this.handleTextChange}></input>
                     <label for="status">Status:</label><select id="status" name="status" value={this.state.status} onChange={this.handleSelectChange}>
                          <option value="Planificada" id="Planificada">Planificada</option>
                          <option value="En vuelo" id="En vuelo">En vuelo</option>
                          <option value="En pruebas" id="En pruebas">En pruebas</option>
                          <option value="Realizada OK" id="Realizada OK">Realizada OK</option>
                          <option value="CANCELADA" id="CANCELADA">CANCELADA</option>
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
                  <Button bsStyle="success" bsSize="small" onClick={this.onClick}>Add New Implantacion</Button>
                </div>
              </Modal>
        </div>
      )
   }
   else{
    return (
     <div>
       <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
       <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Add Implantacion"
        className="Modal">
        <div className='button-center'>
            <h3>{this.state.messageFromServer}</h3>
            <Link to={{pathname: '/', search: 'weekday='+this.state.weekday }} style={{ textDecoration: 'none' }}>
            <Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>Close the Dialog</Button>
            </Link>
        </div>
      </Modal>
    </div>
     )
    }
   }
}
export default Add;