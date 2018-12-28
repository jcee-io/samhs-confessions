import React, { Component } from 'react';
import './style/AdminPage.css';

class AdminPage extends Component {
  constructor() {
    super();

    this.state = {
      confessions: [],
    };
  };

  componentDidMount() {
    fetch('/api/confessions')
      .then(res => res.json())
      .then(confessions => {
        if(!confessions.error) {
          this.setState({ confessions });
        }
      });
  };

  renderConfessions = () => {
    return this.state.confessions.map(confession => (
      <div className="confession" key={confession._id}>
        <h2>Commenting Allowed? {confession.allowComments ? 'Yes' : 'No'}</h2>
        <h2>Read Trigger Warning? {confession.readTW ? 'Yes' : 'No'}</h2>
        <h2>Submission:</h2>
        <textarea rows="25" cols="125" value={`TW/CW: ${confession.allTW}\nSeeking: ${confession.intent}\n\n${confession.submission}`} readOnly />
      </div>
    ));
  };
  render() {
    return (
      <div className="admin-page">
        <div className="placeholder-box"/>
        <div className="entry-container">
          <h1>Admin Confessions View</h1>
          {this.renderConfessions()}
        </div>
        <div className="placeholder-box"/>
      </div>
    );
  }
}

export default AdminPage;
