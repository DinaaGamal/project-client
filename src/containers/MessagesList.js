import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages, removeMessage } from '../store/actions/messages';
import MessageItem from '../components/MessageItem';

class MessagesList extends Component {
	componentDidMount() {
		this.props.fetchMessages();
	}

	render() {
		const { messages, removeMessage, currentUser } = this.props;
		let messagesList = messages.map((m) => {
			return (
				<MessageItem
					key={m._id}
					text={m.text}
					date={m.createAt}
					username={m.user.username}
					profileImageUrl={m.user.profileImageUrl}
					removeMessage={removeMessage.bind(this, m.user._id, m._id)}
					isCorrectUser={currentUser === m.user._id}
				/>
			);
		});
		return (
			<div className="row col-sm-8">
				<div className="offset-1 col-sm-10">
					<ul className="list-group" id="messages">
						{messagesList}
					</ul>
				</div>
			</div>
		);
	}
}

export const mapStateToProps = (state) => {
	return {
		messages: state.messages,
		currentUser: state.currentUser.user.id
	};
};

export default connect(mapStateToProps, { fetchMessages, removeMessage })(MessagesList);
