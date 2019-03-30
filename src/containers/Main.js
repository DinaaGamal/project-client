import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import Authenticate from '../hocs/withAuth';
import MessageForm from '../containers/MessageForm';

const Main = (props) => {
	const { authUser, errors, removeError, currentUser } = props;
	return (
		<div className="container">
			<Switch>
				<Route exact path="/" render={(props) => <Homepage currentUser={currentUser} {...props} />} />
				<Route
					exact
					path="/signin"
					render={(props) => {
						return (
							<AuthForm
								removeError={removeError}
								errors={errors}
								onAuth={authUser}
								buttonText="Login"
								heading="welcome back"
								{...props}
							/>
						);
					}}
				/>

				<Route
					exact
					path="/signup"
					render={(props) => {
						return (
							<AuthForm
								removeError={removeError}
								errors={errors}
								signUp
								onAuth={authUser}
								buttonText="Sign Up here"
								heading="Join Warbler Today "
								{...props}
							/>
						);
					}}
				/>

				<Route path="/users/:id/messages/new" component={Authenticate(MessageForm)} />
			</Switch>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser,
		errors: state.errors
	};
};
export default connect(mapStateToProps, { authUser, removeError })(Main);
