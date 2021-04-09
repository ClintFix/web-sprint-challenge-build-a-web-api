const server = require('./api/server')
const port = 1234;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
