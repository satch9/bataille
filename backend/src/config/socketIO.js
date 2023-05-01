const http = require('http')

function configureSocketIo(server) {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE']
        }
    });
    /* io.on('connection', (socket) => {
        console.log(`Socket ${socket.id} connected`);
        socket.on('disconnect', () => {
            console.log(`Socket ${socket.id} disconnected`);
        });
    }); */
    return io;
}

module.exports = (application) => {
    const server = http.createServer(application);
    const io = configureSocketIo(server);

    return {
        server,
        io
    }
}



