import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import { FaEye, FaEyeSlash } from "react-icons/fa";;

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		userName: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-[#82351a]'>ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder='Enter your name'
							className='w-full input input-bordered h-10'
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>

					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='Enter username'
							className='w-full input input-bordered h-10'
							value={inputs.userName}
							onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}
						/>
					</div>

					<div className='relative'>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type={showPassword ? "text" : "password"}
							placeholder='Enter Password'
							className='w-full input input-bordered h-10 pr-10'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
						<button
							type='button'
							onClick={() => setShowPassword(!showPassword)}
							className='absolute right-3 bottom-1 transform -translate-y-1/2'
						>
							{showPassword ? <FaEye /> : <FaEyeSlash />}
						</button>
					</div>

					<div className='relative'>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type={showConfirmPassword ? "text" : "password"}
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10 pr-10'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
						<button
							type='button'
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							className='absolute right-3 bottom-1 transform -translate-y-1/2'
						>
							{showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
						</button>
					</div>

					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

					<Link
						to={'/login'}
						className='text-sm hover:underline hover:text-[#33170d] mt-2 inline-block'
					>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;