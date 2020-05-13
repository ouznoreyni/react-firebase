import React from 'react';
import firebase from '../firebase/firebase.utils';
import { Link } from 'react-router-dom';

class Update extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			key: '',
			title: '',
			description: '',
			author: '',
		};
	}

	componentDidMount() {
		const ref = firebase
			.firestore()
			.collection('posts')
			.doc(this.props.match.params.id);
		ref.get().then((doc) => {
			if (doc.exists) {
				const post = doc.data();
				this.setState({
					key: doc.id,
					title: post.title,
					description: post.description,
					author: post.author,
				});
			} else {
				console.log('No such document!');
			}
		});
	}

	onChange = (e) => {
		const state = this.state;
		state[e.target.name] = e.target.value;
		this.setState({ post: state });
	};

	onSubmit = (e) => {
		e.preventDefault();

		const { title, description, author } = this.state;

		const updateRef = firebase
			.firestore()
			.collection('posts')
			.doc(this.state.key);
		updateRef
			.set({
				title,
				description,
				author,
			})
			.then((docRef) => {
				this.setState({
					key: '',
					title: '',
					description: '',
					author: '',
				});
				this.props.history.push(
					'/details/' + this.props.match.params.id
				);
			})
			.catch((error) => {
				console.error('Error adding document: ', error);
			});
	};

	render() {
		return (
			<div className="container">
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">EDIT Post</h3>
					</div>
					<div className="panel-body">
						<h4>
							<Link
								to={`/details/${this.state.key}`}
								className="btn btn-primary"
							>
								Post List
							</Link>
						</h4>
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<label htmlFor="title">Title:</label>
								<input
									type="text"
									className="form-control"
									name="title"
									value={this.state.title}
									onChange={this.onChange}
									placeholder="Title"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="description">
									Description:
								</label>
								<input
									type="text"
									className="form-control"
									name="description"
									value={this.state.description}
									onChange={this.onChange}
									placeholder="Description"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="author">Author:</label>
								<input
									type="text"
									className="form-control"
									name="author"
									value={this.state.author}
									onChange={this.onChange}
									placeholder="Author"
								/>
							</div>
							<button type="submit" className="btn btn-success">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Update;
