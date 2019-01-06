import React, { Component } from 'react';
import './style/AdminPage.css';
import { toWords } from 'number-to-words';
import { words as capitalize } from 'capitalize';
import Clipboard from 'react-clipboard.js';

class AdminPage extends Component {
  constructor() {
    super();

    this.state = {
      confessions: [],
      page: 1,
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
    document.addEventListener('scroll', this.trackScrolling);
  };

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  handleDelete = event => {
    let _id;

    const confessions = [...this.state.confessions].filter(confession => {
      if(confession._id == event.target.value) {
        _id = confession._id;
      }

      return confession._id !== event.target.value;
    });

    this.setState({ confessions }, () => {
      fetch('/confessions', {
        method: 'DELETE',
        body: JSON.stringify({ _id }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
    });
  };
  renderConfessions = () => {
    return this.state.confessions.map((confession, index) => {
      const entry = capitalize(toWords(index + 150));
      const submission = `#SubtleAsianConfession ${entry}\nTW/CW: ${confession.allTW}\nSeeking: ${confession.intent}\n.\n.\n.\n.\n.\n.\n.\n.\n${confession.submission}`;
      return (<div className="confession" key={confession._id}>
        <h2>Entry: {entry}</h2>
        <h2>Commenting Allowed? {confession.allowComments ? 'Yes' : 'No'}</h2>
        <h2>Read Trigger Warning? {confession.readTW ? 'Yes' : 'No'}</h2>
        <h2>Submission:</h2>
        <textarea
          id={confession._id}
          rows="25"
          value={submission}
          readOnly
        />
        <div className="button-row">
          <Clipboard className="clipboard" data-clipboard-text={submission}>
            Copy to Clipboard
          </Clipboard>
          <button value={confession._id} onClick={this.handleDelete} className="delete">
            Delete
          </button>
        </div>
      </div>);
    }).reverse();
  };

  isBottom = (el) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  };

  trackScrolling = () => {
    const wrappedElement = document.querySelector('.entry-container');

    if (this.isBottom(wrappedElement)) {
      this.setState({ page: this.state.page + 1 });
    }
  };
  render() {
    return (
      <div className="admin-page">
        <div className="placeholder-box"/>
        <div className="entry-container">
          <h1>Admin Confessions View</h1>
          {this.renderConfessions().slice(0, 10 * this.state.page)}
        </div>
        <div className="placeholder-box"/>
      </div>
    );
  }
}

export default AdminPage;
