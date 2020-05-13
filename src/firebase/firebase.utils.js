port firebase from 'firebase/app';

// import 'firebase/auth';
import firestore from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDLRdvScuuVw0006AjrXdEPW-H7EEmXD0k',
	authDomain: 'crud-react-firebase-59896.firebaseapp.com',
	databaseURL: 'https://crud-react-firebase-59896.firebaseio.com',
	projectId: 'crud-react-firebase-59896',
	storageBucket: 'crud-react-firebase-59896.appspot.com',
	messagingSenderId: '693985272032',
	appId: '1:693985272032:web:56527d1e35a3a4ea773085',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
