import React, { Component } from "react";
import { render } from "react-dom";
import FormContainer from "./containers/FormContainer";
import PrimarySearchAppBar from "./components/SimpleAppBar";

class App extends Component {
  constructor() {
    super(); 
    this.state = {
      filter_desc : '"filters": [{"name": "active_only","query": {"employmentStatus": "active"}, "apply_when": {"%%true": true}}',
      role_hr: '{"%%user.id": {"%in": ["5c922b377255ff913d33d5cc"]}}',
      role_reportee: '{"%%root.managerid": {"%eq": "%%user.id"}}',
      role_owndata: '{"userid": "%%user.id"}',
      role_everyone: '{"%%true": true}',
    }
  }
  render() {
    return (
      <div className="col-lg-8">
        <PrimarySearchAppBar/>
        <h3> Employe Directory Application </h3>
        <br/>
        <p> This is a <a href="https://www.mongodb.com/cloud/stitch">MongoDB Stitch</a> example application to demonstrate how to utilise <a href="https://docs.mongodb.com/stitch/mongodb/advanced-mode-rules/index.html">Stitch Rules</a>. An Employee Directory application example built using synthesized employees data that resides in a MongoDB database called "hr" and a collection called "employee". </p>
          
        <p>Similar to any Example Directory applications, there are some sensitive information that should not be revealed to everyone within an organisation. There are two requirements: </p>
          
        <ul>
          <li><b>Show only employees that are currently being employed</b>.</li>
          <li><b>Show only sensitive information of an employee to: Member of Human Resource department, A manager of an employee and the employee themselves</b>.</li>
        </ul>

        <p>We'll use <a href="https://docs.mongodb.com/stitch/mongodb/filter-incoming-queries/">Stitch Filters</a> to filter only employees where their employment status is "active". This will be applied to all queries from this Stitch application: </p>
        <code>
        {this.state.filter_desc }
        </code>
        <br/><br/>
        <p>We'll use four <a href="https://docs.mongodb.com/stitch/mongodb/define-roles-and-permissions/">Stitch Roles and Field-Level Rules</a> to handle the display of sensitive information. Listed in order of evaluation:</p>
        <ul>
          <li>HR      : <code> {this.state.role_hr} </code></li>
          <li>Reportee: <code> {this.state.role_reportee} </code></li>
          <li>OwnData : <code> {this.state.role_owndata} </code></li>
          <li>Everyone: <code> {this.state.role_everyone} </code></li>
        </ul>
        The "%%" symbol indicates a special variable expansion, see <a href="https://docs.mongodb.com/stitch/reference/expansions/">Stitch Expansions</a> for more information.
        <br/>
        You can simulate different user access by clicking the buttons below:
        <br/><br/><br/>

        <FormContainer />
        <br/>
        <br/>
      </div>
    )
  }
}

render(<App />, document.getElementById("root"));
