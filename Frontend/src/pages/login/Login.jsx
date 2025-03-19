import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import useLogin from "../../hooks/useLogin";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	return (
		<div className="flex flex-col items-center justify-center min-w-96 mx-auto">
			<div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
				<h1 className="text-3xl font-semibold text-center text-gray-300">
					Login
					<span className="text-[#82351a]"> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className="label p-2">
							<span className="text-base label-text">Username</span>
						</label>
						<input
							type="text"
							placeholder="Enter username"
							className="w-full input input-bordered h-10"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div className="relative">
						<label className="label">
							<span className="text-base label-text">Password</span>
						</label>
						<input
							type={showPassword ? "text" : "password"}
							placeholder="Enter Password"
							className="w-full input input-bordered h-10 pr-10"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{/* Eye Icon */}
						<span
							className="absolute right-3 bottom-3 cursor-pointer text-gray-600"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <FaEyeSlash /> : <FaEye />}
						</span>
					</div>

					<Link to="/signup" className="text-sm hover:underline hover:text-[#33170d] mt-2 inline-block">
						{"Don't"} have an account?
					</Link>

					<div>
						<button className="btn btn-block btn-sm mt-2" disabled={loading}>
							{loading ? <span className="loading loading-spinner"></span> : "Login"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
