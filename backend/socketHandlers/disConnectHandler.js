import serverStore from '../store/serverStore';

const disconnectHandler = (socket) => {
  serverStore.removeConnectedUser(socket.id);
};

module.exports = disconnectHandler;
