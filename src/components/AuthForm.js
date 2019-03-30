import React, { Component } from 'react';

export default class AuthForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			profileImageUrl: ''
		};
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handelSubmit = (e) => {
		e.preventDefault();
		const authType = this.props.signUp ? 'signUp' : 'signIn';
		this.props
			.onAuth(authType, this.state)
			.then(() => {
				this.props.history.push('/');
			})
			.catch(() => {
				return;
			});
	};

	render() {
		const { username, email, profileImageUrl } = this.state;
		const { heading, buttonText, signUp, errors, history, removeError } = this.props;
		history.listen(() => {
			removeError();
		});
		return (
			<div>
				<div className="row justify-content-md-center text-center">
					<div className="col-md-6">
						<form onSubmit={this.handelSubmit}>
							<h2>{heading}</h2>
							{errors.message && <div className="alert alert-danger">{errors.message}</div>}
							<div className="form-group">
								<label htmlFor="email">Email:</label>
								<input
									className="form-control"
									id="email"
									name="email"
									onChange={this.handleChange}
									value={email}
									type="text"
								/>
							</div>

							<div className="form-group">
								<label htmlFor="password">Password:</label>

								<input
									className="form-control"
									id="password"
									name="password"
									onChange={this.handleChange}
									type="password"
								/>
							</div>

							{signUp ? (
								<React.Fragment>
									<div className="form-group">
										<label htmlFor="username">Username:</label>

										<input
											className="form-control"
											id="username"
											name="username"
											onChange={this.handleChange}
											type="text"
											value={username}
										/>
									</div>
									<div className="form-group">
										<label htmlFor="image-url">Image Url:</label>

										<input
											className="form-control"
											id="image-url"
											name="profileImageUrl"
											onChange={this.handleChange}
											type="text"
											value={profileImageUrl}
										/>
									</div>
								</React.Fragment>
							) : null}
							<button type="submit" className="btn btn-primary btn-block btn-lg">
								{buttonText}
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
