import React, { Component } from 'react';
import './style/AdminPage.css';
import { toWords } from 'number-to-words';
import { words as capitalize } from 'capitalize';
import Clipboard from 'react-clipboard.js';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import adminpass from './adminpass';

class AdminPage extends Component {
  constructor() {
    super();
    this.hash = localStorage.getItem('access');
    this.match = false;

    if(this.hash) {
      this.match = compareSync(adminpass, this.hash);

      if(!this.match) {
        localStorage.removeItem('access');
      }
    }




    this.state = {
      confessions: [],
      page: 1,
      access: this.match,
      flipOrder: false,
    };
  };

  componentDidMount() {
    if(this.match) {
      fetch('/api/confessions')
        .then(res => res.json())
        .then(confessions => {
          if(!confessions.error) {
            this.setState({ confessions });
          }
        });
    }

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

    this.setState({ deleteModal: true });
    // this.setState({ confessions }, () => {
    //   // fetch('/confessions', {
    //   //   method: 'DELETE',
    //   //   body: JSON.stringify({ _id }),
    //   //   headers: {
    //   //     'Content-Type': 'application/json'
    //   //   },
    //   // });
    // });
  };

  handleAccess = event => {
    if(event.keyCode !== 13) return;
    const accessInput = document.querySelector('.access-input');
    const rememberBox = accessInput.nextSibling.childNodes[0];

    const isChecked = rememberBox.checked;

    if(accessInput.value === adminpass) {
      this.setState({ access: true }, () => {
        if(isChecked) {
          const salt = genSaltSync(10);
          const hash = hashSync(adminpass, salt);

          localStorage.setItem('access', hash);
        }


        fetch('/api/confessions')
          .then(res => res.json())
          .then(confessions => {
            if(!confessions.error) {
              this.setState({ confessions });
            }
          });
      });
    }
  };

  renderPasswordInput = () => {
    return (
      <div className="confession">
        <h1>RESTRICTED ACCESS: TEAM MEMBERS ONLY</h1>
        <h1>ENTER PASSWORD</h1>
        <input onKeyDown={this.handleAccess} type="password" className="access-input" />
        <div onKeyDown={this.handleAccess} className="remember-row"><input type="checkbox" id="remember" name="remember" /> Remember Me</div>
      </div>
    )
  };

  renderConfessions = () => {
    const { confessions, flipOrder } = this.state;

    if(!confessions || !confessions.length) {
      return [
        <h1>No confessions loaded</h1>
      ];
    }

    const mappedConfessions = confessions.map((confession, index) => {
      const entry = capitalize(toWords(index + 159));
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
    });

    return flipOrder ? mappedConfessions : mappedConfessions.reverse();
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

  handleFlipOrder = () => {
    this.setState({ flipOrder: !this.state.flipOrder });
  };

  render() {
    return (
      <div className="admin-page">
        {this.state.deleteModal && (null)}
        <div className="placeholder-box"/>
        <div className="entry-container">
          {this.state.access && <h1>Admin Confessions View</h1>}
          {this.state.access && (
            <div className="button-row">
              <button onClick={this.handleFlipOrder} className="clipboard">Reverse Order</button>
            </div>
          )}
          {this.state.access && this.renderConfessions().slice(0, 10 * this.state.page)}
          {!this.state.access && this.renderPasswordInput()}
        </div>
        <div className="placeholder-box"/>
      </div>
    );
  }
}

export default AdminPage;
