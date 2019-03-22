import React, { Component } from "react";
import ReactDOM from 'react-dom';
import GreenButton from "../components/GreenButton";
import CustomizedTable from "../components/Table";
import LinearProgress from '@material-ui/core/LinearProgress';

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showResults: false,
      showProgress: false,
      results: null, 
      client: null,
      mongodb: null,
      p: "sydneydemo1"
    };
    this.handleManagerForm = this.handleManagerForm.bind(this);
    this.handleHRForm = this.handleHRForm.bind(this);
    this.handleIndividualForm = this.handleIndividualForm.bind(this);
  }

  renderData(credential){
    if (this.client == null){
      const client = stitch.Stitch.initializeDefaultAppClient("dotlocal-skxzi");
      const mongodb = client.getServiceClient(
        stitch.RemoteMongoClient.factory,
        "mongodb-atlas"
      );
      this.client = client; 
      this.mongodb = mongodb;
    }
    this.client.auth.loginWithCredential(credential)        
          .then(authedUser => {
            ReactDOM.unmountComponentAtNode(document.getElementById("greeting"));
            document.getElementById("greeting").innerHTML = `<div>Logged in as: ${authedUser.profile.data.email}</div>`;
            const collection = this.mongodb.db("hr").collection("employee");
            collection.find({}, {limit:8, sort: {"_id":1}})
                      .asArray()
                      .then(docs =>{
                        this.state.showResults = true;
                        this.state.results = docs;
                        this.state.showProgress = false;
                        this.setState(this.state);
                        console.log(docs);
                      });
          });
  }
  progressBar(container) {
    this.state.showProgress = true;
    ReactDOM.render(<LinearProgress color="secondary"/>, container);
    this.setState(this.state);
  }

  handleHRForm(e) {
    e.preventDefault();
    let credential = new stitch.UserPasswordCredential("bernice.herrera@examplecompany.org", 
    this.state.p);
    this.progressBar(document.getElementById("greeting"));
    this.renderHRDescription();
    this.renderData(credential);
  }
  renderHRDescription() {
    ReactDOM.render( <div><p>As a member of Human Resource department <b>'Bernice'</b> triggers the first role. As Stitch expands '%%user.id' to user's id, her user id matches with the id listed in the role. She is able to view all users documents.</p></div>, 
    document.getElementById("description"));
  }

  handleManagerForm(e) {
    e.preventDefault();
    let credential = new stitch.UserPasswordCredential("edward.watsons@examplecompany.org", 
    this.state.p);
    this.progressBar(document.getElementById("greeting"));
    this.renderManagerDescription();
    this.renderData(credential);
  }
  renderManagerDescription() {
    ReactDOM.render( <div><p>As a manager <b>'Edward'</b> does not trigger the first role (HR). It triggers the second Role, as Stitch expands '%%user.id' to user's id for every documents where the user reports to him. He is able to view his own matching user id document, and all of his reportee documents.</p> <p>For other documents only 'Everyone' role is evaluated, and only non-sensitive information is returned.</p> </div>, 
    document.getElementById("description"));
  }

  handleIndividualForm(e) {
    e.preventDefault();
    let credential = new stitch.UserPasswordCredential("samantha.waters@examplecompany.org", 
    this.state.p);
    this.progressBar(document.getElementById("greeting"));
    this.renderIndividualDescription();
    this.renderData(credential);
  }
  renderIndividualDescription() {
    ReactDOM.render( <div><p>As an individual <b>'Samantha'</b> does not trigger the first two roles (HR and Reportee). It triggers the third Role, as Stitch expands '%%user.id' to user's id. She is able to view her own matching user id document.</p> <p>For other documents only 'Everyone' role is evaluated, and only non-sensitive information is returned.</p> </div>, 
    document.getElementById("description"));
  }
  render() {
    return (
      <div id="rootRules">
      <form className="container-fluid">
        <GreenButton
          onClick={this.handleIndividualForm}
          title={"Samantha Waters (Individual)"}
        />{"  "}
        <GreenButton
          onClick={this.handleManagerForm}
          title={"Edward Watsons (Manager)"}
        />{"  "}
        <GreenButton
          onClick={this.handleHRForm}
          title={"Bernice Herrera (HR)"}
        />{"  "}
      </form>
      <br/><br/>
      <div id="greeting"></div>
      <br/><br/>
      <div id="description"></div>
      <br/>
      { this.state.showProgress ? <LinearProgress color="secondary"/> : null}
      { this.state.showResults ? <CustomizedTable data={this.state.results}/> : null }
      </div>
    );
  }
}

export default FormContainer;

