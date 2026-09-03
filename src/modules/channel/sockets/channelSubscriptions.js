export const subscribeToChannelEvents = (socket, dispatcher) => {
  if (!socket || !dispatcher) return () => {};

  socket.on('channel.created', dispatcher.handleChannelCreated);
  socket.on('channel.updated', dispatcher.handleChannelUpdated);
  socket.on('channel.archived', dispatcher.handleChannelArchived);
  socket.on('channel.unarchived', dispatcher.handleChannelUnarchived);

  // Return an unsubscribe function
  return () => {
    socket.off('channel.created', dispatcher.handleChannelCreated);
    socket.off('channel.updated', dispatcher.handleChannelUpdated);
    socket.off('channel.archived', dispatcher.handleChannelArchived);
    socket.off('channel.unarchived', dispatcher.handleChannelUnarchived);
  };
};

