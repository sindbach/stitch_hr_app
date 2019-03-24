import React, { Component } from "react";
import { render } from "react-dom";
import FormContainer from "./containers/FormContainer";
import PrimarySearchAppBar from "./components/SimpleAppBar";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

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
      <div>
          <PrimarySearchAppBar/>
          <div className="float_center">
          <br/><br/>
          <Typography variant="h2" gutterBottom>Employe Directory Application</Typography> 
          <br/>
          <Typography variant="h5" gutterBottom><p> This is a <a href="https://www.mongodb.com/cloud/stitch">MongoDB Stitch</a> example application to demonstrate how to utilise <a href="https://docs.mongodb.com/stitch/mongodb/advanced-mode-rules/index.html">Stitch Rules</a>. An Employee Directory application example built using synthesized employees data that resides in a MongoDB database called "hr" and a collection called "employee". </p>
            
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
          <Table className="table_rules">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                <Typography variant="h5" gutterBottom>Name</Typography>
                </TableCell>
                <TableCell align="left">                
                <Typography variant="h5" gutterBottom>Roles/Rules</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow key="hr">
                  <TableCell align="center"><Typography variant="h5" gutterBottom>HR</Typography></TableCell>
                  <TableCell align="left"><Typography variant="h5" gutterBottom><code> {this.state.role_hr} </code></Typography></TableCell>
                </TableRow>
                <TableRow key="reportee">
                  <TableCell align="center"><Typography variant="h5" gutterBottom>Reportee</Typography></TableCell>
                  <TableCell align="left"><Typography variant="h5" gutterBottom><code> {this.state.role_reportee} </code></Typography></TableCell>
                </TableRow>
                <TableRow key="owndata">
                  <TableCell align="center"><Typography variant="h5" gutterBottom>OwnData</Typography></TableCell>
                  <TableCell align="left"><Typography variant="h5" gutterBottom><code> {this.state.role_owndata} </code></Typography></TableCell>
                </TableRow>
                <TableRow key="everyone">
                  <TableCell align="center"><Typography variant="h5" gutterBottom>Everyone</Typography></TableCell>
                  <TableCell align="left"><Typography variant="h5" gutterBottom><code> {this.state.role_everyone} </code></Typography></TableCell>
                </TableRow>
            </TableBody>
          </Table>
          The "%%" symbol indicates a special variable expansion, see <a href="https://docs.mongodb.com/stitch/reference/expansions/">Stitch Expansions</a> for more information.
          <br/>
          You can simulate different user access by clicking the buttons below:
          <br/><br/><br/>
          <FormContainer />
          <br/>
          <br/>
          </Typography>
          </div>

      </div>
    )
  }
}

render(<App />, document.getElementById("root"));
