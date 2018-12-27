import React, { Component } from 'react';
import './style/AdminPage.css';

class AdminPage extends Component {
  constructor() {
    super();

    this.state = {
      confessions: [],
    };
  };

  render() {
    return (
      <div className="admin-page">
        <div className="placeholder-box"/>
        <div className="entry-container">
        </div>
        <div className="placeholder-box"/>
      </div>
    );
  }
}

export default AdminPage;
