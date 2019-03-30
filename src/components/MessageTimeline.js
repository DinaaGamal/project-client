import React from 'react';
import MessagesList from '../containers/MessagesList';
import UserAside from '../components/UserAside';

const MessageTimeline = (props) => {
	return (
		<div className="row">
			<UserAside profileImageUrl={props.profileImageUrl} username={props.username} />
			<MessagesList profileImageUrl={props.profileImageUrl} />
		</div>
	);
};

export default MessageTimeline;
