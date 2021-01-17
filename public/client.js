const socket=io();
        let name=prompt('naam bta bharosewale');
        socket.emit('name',name);