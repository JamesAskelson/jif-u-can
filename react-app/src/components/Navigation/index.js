import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import AddPostModal from '../AddPostModal';
import OpenModalButton from '../OpenModalButton';
import './Navigation.css';



function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div id='nav-container'>
			<div id='nav-links-container'>
				<div id='nav-links-left'>
					<NavLink exact to="/">Home</NavLink>
					{sessionUser && (
						<OpenModalButton
							className="post-modal-button"
							buttonText="New Post"
							modalComponent={<AddPostModal user={sessionUser} />}
						/>
					)}
				</div>
				<div id='nav-links-middle'>
					Search Bar
				</div>
				<div id='nav-links-right'>
					{sessionUser && (
						<p>{sessionUser.username}</p>
					)}
					{isLoaded && (
						<ProfileButton user={sessionUser} />
					)}
				</div>
			</div>
		</div>
	);
}

export default Navigation;
