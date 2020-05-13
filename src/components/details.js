import React, { Component } from 'react';
import firebase from '../firebase/firebase.utils';
import { Link } from 'react-router-dom';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      key: '',
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection('posts')
      .doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          post: doc.data(),
          key: doc.id,
          isLoading: false,
        });
      } else {
        console.log('No such document!');
      }
    });
  }

  delete(id) {
    firebase
      .firestore()
      .collection('posts')
      .doc(id)
      .delete()
      .then(() => {
        alert('Document successfully deleted!');
        this.props.history.push('/');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4>
              <Link to="/">Post List</Link>
            </h4>
            <h3 className="panel-title">{this.state.post.title}</h3>
          </div>
          <div className="panel-body">
            <dl>
              <dt>Description:</dt>
              <dd>{this.state.post.description}</dd>
              <dt>Author:</dt>
              <dd>{this.state.post.author}</dd>
            </dl>
            <Link to={`/update/${this.state.key}`} className="btn btn-success">
              Edit
            </Link>
            &nbsp;
            <button
              onClick={this.delete.bind(this, this.state.key)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
