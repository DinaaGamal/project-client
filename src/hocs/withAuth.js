import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../history';

//higherorder component hna da 3obara 3n function bta5od child component tdelo shwi functionability w trg3o tany
export default (ComponentToBeRendered) => {
	class Authenticate extends Component {
		componentDidMount = () => {
			if (this.props.isAuthenticated === false) {
				history.push('/signin');
			}
		};
		componentDidUpdate = () => {
			if (this.props.isAuthenticated === false) {
				history.push('/signin');
			}
		};
		render() {
			return <ComponentToBeRendered {...this.props} />;
		}
	}

	const mapStateToProps = (state) => {
		return {
			isAuthenticated: state.currentUser.isAuthenticated
		};
	};

	return connect(mapStateToProps)(Authenticate);
};
