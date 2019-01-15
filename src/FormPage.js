import React, { PureComponent } from 'react';
import horizontalLine from './assets/images/horizontal-line.png';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { animateScroll as scroll } from 'react-scroll';
import { isEmail, isURL } from 'validator';

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
      email: '',
      facebookURL: '',
      isSubmitted: false,
      hasError: false,
      commentsError: false,
      docsError: false,
      triggerError: false,
      intentError: false,
      submissionError: false,
      emailError: false,
      facebookURLError: false,
    };
  };

  onSubmit = (event) => {
    const {
      allowComments,
      readTW,
      allTW,
      intent,
      submission,
      email,
      facebookURL,
    } = this.state;

    event.preventDefault();

    if(
      allowComments === null ||
      readTW === null ||
      !allTW || allTW === '' ||
      !intent || intent === '' ||
      !submission || submission === '' ||
      (email && email !== '' && !isEmail(email)) ||
      (facebookURL && facebookURL !== '' && !isURL(facebookURL))
    ) {
      this.setState({
        hasError: true,
        commentsError: allowComments === null,
        docsError: readTW === null,
        triggerError: !allTW,
        intentError: !intent,
        submissionError: !submission,
        emailError: email && email !== '' && !isEmail(email),
        facebookURLError: facebookURL && facebookURL !== '' && !isURL(facebookURL),
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
        email,
        facebookURL,
        isHidden: false,
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

  handleEmail = event => {
    this.setState({ email: event.target.value, emailError: false });
  };

  handleFacebookURL = event => {
    this.setState({ facebookURL: event.target.value, facebookURLError: false });
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
      submissionError,
      emailError,
      facebookURLError,
    } = this.state;

    const requiredErrors =
      commentsError ||
      docsError ||
      triggerError ||
      intentError ||
      submissionError;

    const optionalErrors = emailError || facebookURLError;

    if(requiredErrors || optionalErrors) {
      return (
        <div className="error-box">
          {requiredErrors && <h2>ERROR: Required fields were not filled out</h2>}
          {commentsError && <p>- Allowing Comments</p>}
          {docsError && <p>- Reading the document on Trigger Warnings</p>}
          {triggerError && <p>- Trigger and content warnings</p>}
          {intentError && <p>- Intent/Looking for/Seeking field</p>}
          {submissionError && <p>- Submission form</p>}
          {optionalErrors && <h2>ERROR: Invalid email/url on optional fields</h2>}
          {emailError && <p>- Invalid email</p>}
          {facebookURLError && <p>- Invalid Facebook URL</p>}
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
            <label>
              <h2>OPTIONAL: Email Address</h2>
            </label>
            <input onChange={this.handleEmail} className="form-control" />
          </div>
          <div className="form-group">
            <label>
              <h2>OPTIONAL: Facebook URL</h2>
            </label>
            <input onChange={this.handleFacebookURL} className="form-control" />
          </div>
          <p>
            **Optional fields are intended for the occasion of interest in being reached out for direct support and assistance.
              Concealing your identity is guaranteed to be secure and of utmost importance.
          </p>
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
