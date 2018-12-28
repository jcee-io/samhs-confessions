import React, { PureComponent } from 'react';
import horizontalLine from './assets/images/horizontal-line.png';
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
        };
    }

    onSubmit = () => {
        console.log(this.state);
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
    render() {
        return (
            <main className="container">
                <div className="placeholder-box"/>
                <div className="form-container">
                    <div className = "title-container text-center">
                        <h1>Sad Asian Confessions <br/>Anonymous</h1>
                        <img className={`img-responsive`} src = {horizontalLine} alt={`horizontal title underline`}/>
                    </div>
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
                        <div className={`row text-center`}>
                            <div className={`col-md-6`}>
                                <label className="radio-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                           id="yesRadio" value="yes"/> Yes
                                </label>
                            </div>
                            <div className={`col-mmd-6`}>
                                <label className="radio-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                           id="noRadio" value="no"/> No
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className={`tw-docs form-group`}>
                        <h2>
                            Have you read the document on Trigger Warnings?
                            <a href={`https://goo.gl/iLPMCU`}> Link here</a>
                        </h2>
                        <div className={`row text-center`}>
                            <div className={`col-md-6`}>
                                <label className="radio-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                           id="yesRadio" value="yes"/> Yes
                                </label>
                            </div>
                            <div className={`col-mmd-6`}>
                                <label className="radio-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                           id="noRadio" value="no"/> No
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className={`tw-types form-group`}>
                        <label for="twTypesInput">
                            <h2>What triggers would your submission have? *</h2>
                        </label>
                        <input onChange={this.handleTriggers} className="form-control" id="twTypesInput"/>
                    </div>

                    <div className={ `motive-text` }>
                        <label for="motiveInput">
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
                <div className="placeholder-box"/>
            </main>
        );
    }
};

export default FormPage;
