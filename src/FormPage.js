import React, { Component } from 'react';
import './style/FormPage.css';

class FormPage extends Component {
  render() {
    return (
      <div className="form-page">
        <div className="placeholder-box"/>
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
            <input type="radio" />Yes
            <input type="radio" />No
          </div>
          <div className="tw-docs">
            <h2>
              Have you read the document on Trigger Warnings?
              Link here: https://goo.gl/iLPMCU
            </h2>
            <input type="radio" />Yes
            <input type="radio" />No
          </div>
          <div className="tw-types">
            <h2>What triggers would your submission have? *</h2>
            <input />
          </div>
          <div className="motive-text">
            <h2>What are you looking for? Ex: Advice, Validation, Support, Opinion. *</h2>
            <input />
          </div>
          <div className="submission">
            <h2>Submission *</h2>
            <textarea rows="8">
            </textarea>
          </div>

          <button>Submit</button>
        </div>
        <div className="placeholder-box"/>
      </div>
    );
  }
};

export default FormPage;
