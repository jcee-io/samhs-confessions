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

  formatInputsWithCheckBox = (checklist, field) => {
    const checklistItems = [];

    checklist.childNodes.forEach(node => {
      const textNode = node.querySelector('h5');

      if(textNode.previousSibling.checked) {
        !textNode.textContent.includes('Others') && checklistItems.push(textNode.textContent);
      }
    });

    let checklistString = checklistItems.join(',');

    if(field !== null && field !== '') {
      checklistString += checklistItems.length ? ', ' + field : field;
    }

    return checklistString;
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

    const twListString = this.formatInputsWithCheckBox(this.refs.TWChecklist, allTW);
    const supportListString = this.formatInputsWithCheckBox(this.refs.supportChecklist, intent);

    if(
      allowComments === null ||
      readTW === null ||
      !twListString || twListString === '' ||
      !supportListString || supportListString === '' ||
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
        allTW: twListString,
        intent: supportListString,
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
    this.setState({ readTW: event.target.checked, docsError: false });
  };

  handleAllowCommenting = event => {
    event.preventDefault();

    const allowComments = event.target.textContent === 'Yes';
    this.setState({ allowComments, commentsError: false });
  }

  handleTriggers = event => {

    if(event.target.value === '' || event.target.value === null) {
      this.refs.TWChecklistOthers.checked = false;
    } else {
      this.refs.TWChecklistOthers.checked = true;
    }

    this.setState({ allTW: event.target.value, triggerError: false });
  };

  handleIntent = event => {
    if(event.target.value === '' || event.target.value === null) {
      this.refs.supportChecklistOthers.checked = false;
    } else {
      this.refs.supportChecklistOthers.checked = true;
    }

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
          {requiredErrors && <h3>ERROR: Required fields were not filled out</h3>}
          {commentsError && <p>- Allowing Comments</p>}
          {docsError && <p>- Reading the document on Trigger Warnings</p>}
          {triggerError && <p>- Trigger and content warnings</p>}
          {intentError && <p>- Intent/Looking for/Seeking field</p>}
          {submissionError && <p>- Submission form</p>}
          {optionalErrors && <h3>ERROR: Invalid email/url on optional fields</h3>}
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
      allowComments,
    } = this.state;

    if(isSubmitted) {
      return (
        <div className="form-container submitted">
          <h1>Sad Asian Confessions Anonymous</h1>
          <h2>Thank you for your submission!</h2>
          <h2 style={{ cursor: 'pointer', color: '#337ab7' }}onClick={this.returnToHome} >Return to Home</h2>
        </div>
      );
    }

    return (
      <div className="form-container">
        <div className = "title-container text-center">
            <h1 className="page-heading">Sad Asian Confessions</h1>
            <h2 className="other">Anonymous Submission Form</h2>
        </div>
        {hasError && this.renderErrorDiv()}
      <form>
        <h3 className="section-heading">Guidelines</h3>
        <h4 className="body-copy-light">Please read these before typing up your submission.</h4>
        <ol className="body-copy guidelines-body">
          <h5>
            <li>Submit whatever is on your mind.</li>
            <li>No hateful language allowed.</li>
            <li>Please seek help, we have information for hotlines and the like in the Facebook group.</li>
            <li>Submissions will be reviewed and posted if approved.</li>
            <li>Please include Content Warnings or Trigger Warnings if applicable. For more information, please check out our guide here. (<a target="_blank" href="https://goo.gl/iLPMCU">link</a>)</li>
          </h5>
        </ol>
          <h3 className="section-heading">Submission</h3>
          <h4 className="body-copy-light">Please fill out all fields.</h4>
          <div onChange={this.handleTWDocs} className={`tw-docs form-group`}>
              <h4 className="questions">
                  Please read the document on Content Warnings and Trigger Warnings
                  (<a target="_blank" href={`https://goo.gl/iLPMCU`}>link</a>)
                  and understand that you must include them if necessary
              </h4>
              <div className={`row twdocs-row`}>
                  <div>
                      <label className="checkbox-inline">
                          <input className="form-check-input checkbox" type="checkbox" />
                          <h5 className="labeltext body-copy">
                            I have read and understood the use of content and trigger warnings
                          </h5>
                      </label>
                  </div>
              </div>
          </div>
          <div className={`tw-types form-group`}>
            <label htmlFor="questions twTypesInput">
                <h4>Do you have any content or trigger warnings you’d like to include?</h4>
            </label>
            <div ref="TWChecklist" className="checklist">
              <div className="checklist-entry"><input type="checkbox" /><h5 className="labeltext body-copy"> Anxiety</h5></div>
              <div className="checklist-entry"><input type="checkbox" /><h5 className="labeltext body-copy"> Depression</h5></div>
              <div className="checklist-entry"><input type="checkbox" /><h5 className="labeltext body-copy"> Dysfunctional Family</h5></div>
              <div className="checklist-entry"><input type="checkbox" /><h5 className="labeltext body-copy"> Eating Disorders</h5></div>
              <div className="checklist-entry"><input type="checkbox" /><h5 className="labeltext body-copy"> Suicide</h5></div>
              <div className="checklist-entry"><input ref="TWChecklistOthers" type="checkbox" /><h5 className="labeltext body-copy"> Others (please write below)</h5></div>
            </div>
            <input placeholder="e.g. racism, self-harm" onChange={this.handleTriggers} className="form-control" id="twTypesInput"/>
          </div>
          <div className="form-group">
            <label htmlFor="questions submissionInput">
                <h4>Your Submission</h4>
            </label>
            <textarea placeholder="Share your story" onChange={this.handleSubmission} className="form-control" id="submissionInput" rows="15"></textarea>
          </div>
          <div className={ `motive-text form-group` }>
            <label htmlFor="questions motiveInput">
                <h4>Are you looking for any particular type of support?</h4>
            </label>
              <div ref="supportChecklist" className="checklist">
              <div className="checklist-entry"><input type="checkbox" /><h5 className="labeltext body-copy"> Advice</h5></div>
              <div className="checklist-entry"><input type="checkbox" /><h5 className="labeltext body-copy"> Opinions</h5></div>
              <div className="checklist-entry"><input type="checkbox" /><h5 className="labeltext body-copy"> Support</h5></div>
              <div className="checklist-entry"><input type="checkbox" /><h5 className="labeltext body-copy"> Tips</h5></div>
              <div className="checklist-entry"><input type="checkbox" /><h5 className="labeltext body-copy"> Validation</h5></div>
              <div className="checklist-entry"><input ref="supportChecklistOthers" type="checkbox" /><h5 className="labeltext body-copy"> Others (please write below)</h5></div>
            </div>
            <input placeholder="e.g. stories, friendship" onChange={this.handleIntent} className="form-control" id="motiveInput"/>
          </div>
          <div className={`questions allow-comments radio form-group`}>
            <h4>Would you like commenting to be allowed?</h4>
            <div onClick={this.handleAllowCommenting} className={`row row-buttons text-center`}>
              <button value="yes" className={`btn allow-comments-button allow-comments-button-yes ${!!allowComments ? 'allow-comments-button-selected' : ''}`}><h4>Yes</h4></button>
              <button value="no" className={`btn allow-comments-button allow-comments-button-no ${!allowComments && allowComments !== null? 'allow-comments-button-selected' : ''}`}><h4>No</h4></button>
            </div>
          </div>
          <h3 className="section-heading">Contact Information (Optional)</h3>
          <h4 className="body-copy-light">
            Optional fields are intended for the occasion of interest in being reached out for direct support and assistance.
            Concealing your identity is guaranteed to be secure and of utmost importance.
          </h4>
          <div className="form-group">
            <label className="questions">
              <h4>Email Address</h4>
            </label>
            <input placeholder="hisamhs@example.com" onChange={this.handleEmail} className="form-control" />
          </div>
          <div className="form-group">
            <label className="questions">
              <h4>Facebook URL</h4>
            </label>
            <input placeholder="https://www.facebook.com/samhs33449" onChange={this.handleFacebookURL} className="form-control" />
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
