import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './style/FormPage.css';

class FormPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      allowComments: null,
      readTW: null,
      allTW: '',
      intent: '',
      submission: '',
      isSubmitted: false,
    };
  }

  onSubmit = () => {
    const {
      allowComments,
      readTW,
      allTW,
      intent,
      submission,
    } = this.state;

    fetch('/confessions', {
      method: 'POST',
      body: JSON.stringify({
        allowComments,
        readTW,
        allTW,
        intent,
        submission,
      }),
      headers:{
        'Content-Type': 'application/json'
      },
    });
    // this.setState({ isSubmitted: true });
  };

  handleTWDocs = event => {
    const readTW = event.target.value === 'yes';
    this.setState({ readTW });
  };

  handleAllowCommenting = event => {
    const allowComments = event.target.value === 'yes';
    this.setState({ allowComments });
  }

  handleTriggers = event => {
    this.setState({ allTW: event.target.value });
  };

  handleIntent = event => {
    this.setState({ intent: event.target.value });
  };
  handleSubmission = event => {
    this.setState({ submission: event.target.value });
  };

  returnToHome = () => {
    this.setState({ isSubmitted: false });
  };

  renderContent = () => {
    if(this.state.isSubmitted) {
      return (
        <div className="form-container submitted">
          <h1>Sad Asian Confessions Anonymous</h1>
          <h2>Thank you for your submission!</h2>
          <h2 style={{ cursor: 'pointer', color: 'blue' }}onClick={this.returnToHome} >Return to Home</h2>
        </div>
      );
    }



    return (
      <div className="form-container">
        <h1>Sad Asian Confessions Anonymous</h1>
        <h2>Submission Guidelines</h2>
        <p>
        1. Submit whatever is on your mind.
        <br />
        2. No hateful language allowed. This is a safe and nonjudgmental space for anonymity
        <br />
        3. Please seek help, we have information for hotlines and the like in the Facebook group.
        <br />
        4. Submissions will be reviewed and posted if approved.
        <br />
        5. Trigger Warnings/Content Warnings will be appreciated if your posts can be triggering. For more information, please check here: https://goo.gl/iLPMCU
        </p>
        <div className="allow-comments">
          <h2>Would you like commenting to be allowed?</h2>
          <div onChange={this.handleAllowCommenting} className="radio-button-container">
            <span><input value="yes" type="radio" name="comments" /> Yes</span>
            <span><input value="no" type="radio" name="comments" /> No</span>
          </div>
        </div>
        <div className="tw-docs">
          <h2>
            Have you read the document on Trigger Warnings?
          </h2>
          <a href="https://goo.gl/iLPMCU" target="_blank">Link to document on trigger warnings</a>
          <div onChange={this.handleTWDocs} className="radio-button-container">
            <span><input value="yes" type="radio" name="read-tw" /> Yes</span>
            <span><input value="no" type="radio" name="read-tw" /> No</span>
          </div>
        </div>
        <div className="tw-types">
          <h2>What kind of trigger/content warnings would your submission have? *</h2>
          <input onChange={this.handleTriggers} className="text-input" />
        </div>
        <div className="motive-text">
          <h2>What are you looking for? Ex: Advice, Validation, Support, Opinion. *</h2>
          <input onChange={this.handleIntent} className="text-input" />
        </div>
        <div className="submission">
          <h2>Submission *</h2>
          <textarea onChange={this.handleSubmission} rows="15">
          </textarea>
        </div>

        <button onClick={this.onSubmit}>Submit</button>
      </div>
    );
  };
  render() {

    return (
      <div className="form-page">
        <div className="placeholder-box"/>
          {this.renderContent()}
        <div className="placeholder-box"/>
      </div>
    );
  }
};

export default FormPage;
