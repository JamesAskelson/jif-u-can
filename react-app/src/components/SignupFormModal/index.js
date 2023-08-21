import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		}

		if(password !== confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			const diffPass = ["Confirm Password field must be the same as the Password field"]
			if (data) {
				setErrors([...data, ...diffPass]);
			} else {
				setErrors([
					"Confirm Password field must be the same as the Password field",
				]);
			}
		}
	};

	return (
		<>
		<div id='signup-modal-container'>
			<div id='signup-title'>
				<h1>Sign Up</h1>
			</div>
			<hr id='login-title-hr'/>
			<form onSubmit={handleSubmit}>
			<div id='errors-container'>
				{errors.map((error, idx) => (
					<span id='signup-error' key={idx}>{error}</span>
				))}
        	</div>
				<div id='signup-info-container'>

						<input
							type="text"
							value={username}
							placeholder="Username"
							onChange={(e) => setUsername(e.target.value)}
							required
						/>

						<input
							type="text"
							value={email}
							placeholder="Email"
							onChange={(e) => setEmail(e.target.value)}
							required
						/>

						<input
							type="password"
							value={password}
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>

						<input
							type="password"
							value={confirmPassword}
							placeholder="Confirm Password"
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
				</div>
				<hr id='login-title-hr'/>
				<div id='signup-submit-button'>
					<button type="submit">Sign Up</button>
				</div>
			</form>
		</div>
		</>
	);
}

export default SignupFormModal;
