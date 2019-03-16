import MessageModel from '../models/message.model';


const MessageController = {
  sendNewMessage(req, res) {
    if (!req.body.subject) {
      return res.status(400).json({ message: 'Please provide a subject' });
    }
    if (!req.body.message) {
      return res.status(400).json({ message: 'Please provide message body' });
    }
    const createdMessage = MessageModel.createNewMessage(req.body);
    return res.status(201).json({
      status: res.statusCode,
      message: 'Message created successfully',
      createdMessage
    });
  },
  getAllMessages(req, res) {
    const allMessages = MessageModel.fetchAllMessages();
    if (allMessages.length === 0) {
      return res.status(400).json({ message: 'There are no messages' });
    }
    return res.status(200).json({
      status: res.statusCode,
      message: 'Fetched All Messages successfully',
      allMessages
    });
  },
  getSpecificMessage(req, res) {
    const specificMessage = MessageModel.fetchSpecificMessage(Number(req.params.id));
    if (!specificMessage) {
      return res.status(404).json({ message: 'Sorry, message not found' });
    }
    return res.status(200).send({
      status: res.statusCode,
      message: 'Fetched Message successfully',
      specificMessage
    });
  },
  getUnreadMessages(req, res) {
    const unreadMessage = MessageModel.fetchUnreadMessages(req.body.status === 'unread')
    if (unreadMessage.length === 0) {
      return res.status(404).json({ message: 'Sorry, there are no unread messages' });
    }
    return res.json({
      status: res.statusCode,
      message: 'Fetched all unread Messages successfully',
      unreadMessage
    });
  },
  getSentMessages(req, res) {
    const sentMessage = MessageModel.fetchSentMessages(req.body.status === 'sent')
    if (sentMessage.length === 0) {
      return res.status(404).json({ message: 'Sorry, there are no sent messages' });
    }
    return res.json({
      status: res.statusCode,
      message: 'Fetched all sent Messages successfully',
      sentMessage
    });
  },

  deleteSpecificMessage(req, res) {
    const message = MessageModel.fetchSpecificMessage(req.params.id);
    if (!message) {
      res.status(404).json({ message: 'Message is not found' });
    }
    const deletedmessage = MessageModel.deleteOneMessage(req.params.id);
    res.status(204).json({
      status: res.statusCode,
      deletedmessage
    });
  }
};

export default MessageController;
