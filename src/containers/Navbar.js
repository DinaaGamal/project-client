import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../images/logo.png';
import { logout } from '../store/actions/auth';

class Navbar extends Component {
	logout = (e) => {
		e.preventDefault();
		this.props.logout();
	};
	render() {
		return (
			<nav className="navbar navbar-expand-lg">
				<div className="container-fluid">
					<Link to="/" className="navbar-brand">
						<img src={Logo} alt="warbler Home" />
					</Link>
					{this.props.currentUser.isAuthenticated ? (
						<ul className="nav navbar-nav navbar-right">
							<li>
								<Link to={`/users/${this.props.currentUser.user.id}/messages/new`}>New Message</Link>
							</li>
							<li>
								<a onClick={this.logout}>Log out</a>
							</li>
						</ul>
					) : (
						<ul className="nav navbar-nav navbar-right">
							<li>
								<Link to="/Signup">Sign up</Link>
							</li>
							<li>
								<Link to="/Signin">Log in</Link>
							</li>
						</ul>
					)}
				</div>
			</nav>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser
	};
};

export default connect(mapStateToProps, { logout })(Navbar);
