import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewMessage } from '../store/actions/messages';
import { removeError, addError } from '../store/actions/errors';
class MessageForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: ''
		};
	}
	handelNewMessage = (e) => {
		e.preventDefault();
		this.props.postNewMessage(this.state.message);
		this.setState({ message: '' });
	};

	render() {
		const errorClass = this.props.errors.message ? 'alert alert-danger' : '';
		this.props.history.listen(() => this.props.removeError());
		return (
			<form onSubmit={this.handelNewMessage}>
				{this.props.errors ? <div className={errorClass}>{this.props.errors.message}</div> : null}
				<input
					className="form-control"
					value={this.state.message}
					onChange={(e) =>
						this.setState({
							message: e.target.value
						})}
				/>

				<button type="submit" className="btn btn-success ">
					Add my Message
				</button>
			</form>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		errors: state.errors
	};
};

export default connect(mapStateToProps, { postNewMessage, removeError, addError })(MessageForm);
