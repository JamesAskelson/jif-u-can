import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import AddPostModal from '../AddPostModal';
import OpenModalButton from '../OpenModalButton';
import './Navigation.css';



function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	const goToTop = () => {
        window.scrollTo({
            top: 0
        });
    }

	return (
		<div id='nav-container'>
			<div id='nav-links-container'>
				<div id='nav-links-left'>
					<NavLink onClick={goToTop} id='home-img-container' exact to="/">
						<img
						className='home-img'
						src='https://aws-starter-bucket123.s3.amazonaws.com/jif-u-can-home-icon.png'
						/>
					</NavLink>
					{sessionUser && (
						<div id='post-modal-button-container'>
							<OpenModalButton
								className="post-modal-button"
								buttonText="+ New Post"
								modalComponent={<AddPostModal user={sessionUser} />}
							/>
						</div>
					)}
				</div>
				<div id='nav-links-middle'>
				
				</div>
				<div id='nav-links-right'>
					{sessionUser && (
						<span>{sessionUser.username}</span>
					)}
					{isLoaded && (
						<div id='profile-button'>
							<ProfileButton user={sessionUser} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Navigation;
