import React from 'react';
import { Link } from 'react-router-dom';

import firebase from '../firebase/firebase.utils';

class List extends React.Component {
	constructor(props) {
		super(props);
		this.ref = firebase.firestore().collection('posts');
		this.unsubscribe = null;
		this.state = {
			posts: [],
		};
	}

	onCollectionUpdate = (querySnapshot) => {
		const posts = [];
		querySnapshot.forEach((doc) => {
			const { title, description, author } = doc.data();
			posts.push({
				key: doc.id,
				doc, // DocumentSnapshot
				title,
				description,
				author,
			});
		});
		this.setState({
			posts,
		});
	};

	componentDidMount() {
		this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
	}

	render() {
		return (
			<div className="container">
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Post LIST</h3>
					</div>
					<div className="panel-body">
						<h4>
							<Link to="/create">Add Post</Link>
						</h4>
						<table className="table table-stripe">
							<thead>
								<tr>
									<th>Title</th>
									<th>Description</th>
									<th>Author</th>
								</tr>
							</thead>
							<tbody>
								{this.state.posts.map((post) => (
									<tr>
										<td>
											<Link
												key={post.key}
												to={`/details/${post.key}`}
											>
												{post.title}
											</Link>
										</td>
										<td>{post.description}</td>
										<td>{post.author}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}
export default List;
