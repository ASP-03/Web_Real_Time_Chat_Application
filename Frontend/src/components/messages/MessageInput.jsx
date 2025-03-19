import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { FaSmile } from "react-icons/fa";
import useSendMessage from "../../hooks/useSendMessage";
import Picker from "@emoji-mart/react";
import emojiData from "@emoji-mart/data";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};

	const handleEmojiSelect = (emoji) => {
		setMessage((prev) => prev + emoji.native);
	};

	return (
		<form className='px-4 my-3 relative' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button
					type='button'
					className='absolute inset-y-0 right-11 flex items-center pl-3'
					onClick={() => setShowEmojiPicker(!showEmojiPicker)}
				>
					<FaSmile className='text-gray-400 hover:text-white' />
				</button>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
			</div>

			{showEmojiPicker && (
				<div className='absolute bottom-12 left-0 z-10'>
					<Picker data={emojiData} onEmojiSelect={handleEmojiSelect} theme="dark" />
				</div>
			)}
		</form>
	);
};

export default MessageInput;
