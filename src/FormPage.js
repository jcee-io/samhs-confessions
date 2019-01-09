import React, { PureComponent } from 'react';
import horizontalLine from './assets/images/horizontal-line.png';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { animateScroll as scroll } from 'react-scroll';

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
      hasError: false,
      commentsError: false,
      docsError: false,
      triggerError: false,
      intentError: false,
      submissionError: false,
    };
  };

  onSubmit = (event) => {
    const {
      allowComments,
      readTW,
      allTW,
      intent,
      submission,
    } = this.state;

    event.preventDefault();
    console.log(      allowComments,
          readTW,
          allTW,
          intent,
          submission)
    if(
      allowComments === null ||
      readTW === null ||
      !allTW || allTW === '' ||
      !intent || intent === '' ||
      !submission || submission === ''
    ) {
      this.setState({
        hasError: true,
        commentsError: allowComments === null,
        docsError: readTW === null,
        triggerError: !allTW,
        intentError: !intent,
        submissionError: !submission
      }, () => {
        scroll.scrollToTop();
      });


      return;
    }

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
    this.setState({ isSubmitted: true });
  };

  handleTWDocs = event => {
    const readTW = event.target.value === 'yes';
    this.setState({ readTW, docsError: false });
  };

  handleAllowCommenting = event => {
    const allowComments = event.target.value === 'yes';
    this.setState({ allowComments, commentsError: false });
  }

  handleTriggers = event => {
    this.setState({ allTW: event.target.value, triggerError: false });
  };

  handleIntent = event => {
    this.setState({ intent: event.target.value, intentError: false });
  };
  handleSubmission = event => {
    this.setState({ submission: event.target.value, submissionError: false });
  };

  returnToHome = () => {
    this.setState({ isSubmitted: false });
  };

  renderErrorDiv = () => {
    const {
      commentsError,
      docsError,
      triggerError,
      intentError,
      submissionError
    } = this.state;

    if(
      commentsError ||
      docsError ||
      triggerError ||
      intentError ||
      submissionError
    ) {
      return (
        <div className="error-box">
          <h2>ERROR: One or more required fields were not filled out</h2>
          {commentsError && <p>- Allowing Comments</p>}
          {docsError && <p>- Reading the document on Trigger Warnings</p>}
          {triggerError && <p>- Trigger and content warnings</p>}
          {intentError && <p>- Intent/Looking for/Seeking field</p>}
          {submissionError && <p>- Submission form</p>}
        </div>
      )
    }

    return null;
  };

  renderContent = () => {
    const {
      isSubmitted,
      hasError,
    } = this.state;

    if(isSubmitted) {
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
        <div className = "title-container text-center">
            <h1>Sad Asian Confessions <br/>Anonymous</h1>
            <img className={`img-responsive`} src = {horizontalLine} alt={`horizontal title underline`}/>
        </div>
        {hasError && this.renderErrorDiv()}
        <h2 className={`guideline-title`}>Submission Guidelines</h2>
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
      <form>
        <div className={`allow-comments radio`}>
              <h2>Would you like commenting to be allowed?</h2>
              <div onChange={this.handleAllowCommenting} className={`row text-center`}>
                  <div className={`col-md-6 col-sm-6`}>
                      <label className="radio-inline">
                          <input className="form-check-input" type="radio" name="inlineRadioOptions1"
                                 id="yesRadio" value="yes"/><span className="labeltext">Yes</span>
                      </label>
                  </div>
                  <div className={`col-md-6 col-sm-6`}>
                      <label className="radio-inline">
                          <input className="form-check-input" type="radio" name="inlineRadioOptions1"
                                 id="noRadio" value="no"/><span className="labeltext">No</span>
                      </label>
                  </div>
              </div>
          </div>
          <div onChange={this.handleTWDocs} className={`tw-docs form-group`}>
              <h2>
                  Have you read the document on Trigger Warnings?
                  <a href={`https://goo.gl/iLPMCU`}> Link here</a>
              </h2>
              <div className={`row text-center`}>
                  <div className={`col-md-6 col-sm-6`}>
                      <label className="radio-inline">
                          <input className="form-check-input" type="radio" name="inlineRadioOptions2"
                                 id="yesRadio" value="yes"/><span className="labeltext">Yes</span>
                      </label>
                  </div>
                  <div className={`col-md-6 col-sm-6`}>
                      <label className="radio-inline">
                          <input className="form-check-input" type="radio" name="inlineRadioOptions2"
                                 id="noRadio" value="no"/><span className="labeltext">No</span>
                      </label>
                  </div>
              </div>
          </div>
          <div className={`tw-types form-group`}>
            <label htmlFor="twTypesInput">
                <h2>What triggers would your submission have? *</h2>
            </label>
            <input onChange={this.handleTriggers} className="form-control" id="twTypesInput"/>
          </div>

          <div className={ `motive-text` }>
            <label htmlFor="motiveInput">
                <h2>What are you looking for? Ex: Advice, Validation, Support, Opinion. *</h2>
            </label>
            <input onChange={this.handleIntent} className="form-control" id="motiveInput"/>
          </div>
          <div className="form-group">
            <label htmlFor="submissionInput">
                <h2>Submission *</h2>
            </label>
            <textarea onChange={this.handleSubmission} className="form-control" id="submissionInput" rows="15"></textarea>
          </div>

          <button className={'btn btn-success btn-block'} onClick={this.onSubmit}>Submit</button>
        </form>
      </div>
    );
  };
  render() {

    return (
      <main>
        <div className="placeholder-box"/>
          {this.renderContent()}
        <div className="placeholder-box"/>
      </main>
    );
  }
};

export default FormPage;
