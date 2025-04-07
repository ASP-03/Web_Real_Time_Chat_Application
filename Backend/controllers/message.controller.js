import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
			status: 'sent'
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		await Promise.all([conversation.save(), newMessage.save()]);

		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// Update message status to delivered when receiver is online
			newMessage.status = 'delivered';
			await newMessage.save();
			
			io.to(receiverSocketId).emit("newMessage", newMessage);
			// Notify sender that message was delivered
			io.to(req.socket.id).emit("messageDelivered", { messageId: newMessage._id });
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const markMessageAsRead = async (req, res) => {
	try {
		const { messageId } = req.params;
		const userId = req.user._id;

		const message = await Message.findById(messageId);
		if (!message) {
			return res.status(404).json({ error: "Message not found" });
		}

		// Only the receiver can mark messages as read
		if (message.receiverId.toString() !== userId.toString()) {
			return res.status(403).json({ error: "Unauthorized" });
		}

		message.status = 'read';
		await message.save();

		// Notify sender that message was read
		const senderSocketId = getReceiverSocketId(message.senderId);
		if (senderSocketId) {
			io.to(senderSocketId).emit("messageRead", { messageId: message._id });
		}

		res.status(200).json({ message: "Message marked as read" });
	} catch (error) {
		console.log("Error in markMessageAsRead controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		// Ensure we're only getting messages from the specific conversation
		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
			$and: [
				{ participants: { $size: 2 } } // Ensure it's a one-on-one conversation
			]
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		// Filter messages to ensure they're only between these two users
		const messages = conversation.messages.filter(msg => 
			(msg.senderId.toString() === senderId.toString() && msg.receiverId.toString() === userToChatId.toString()) ||
			(msg.senderId.toString() === userToChatId.toString() && msg.receiverId.toString() === senderId.toString())
		);

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};