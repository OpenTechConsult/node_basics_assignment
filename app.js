const http = require('http');

http.createServer(function (request, response) {
    const url = request.url;
    response.setHeader('Content-Type', 'text/html');
    
    if (url === '/') {
        response.write('<html>');
        response.write('<head><title>Enter a User</title></head>');
        response.write('<body>');
        response.write('<h1>Hi User. </h1>');
        response.write('<form method="POST" action="/create-user">');
        response.write('<label for="username">Enter your username </label>');
        response.write('<input type="text" name="username" placeholder="username">');
        response.write('<button type="submit">Submit</button>');
        response.write('</form>');
        response.write('</body>');
        return response.end();
    }

    if (url === '/users') {
        response.write('<html>');
        response.write('<head><title>Users</title></head>');
        response.write('<body>');
        response.write('<h1>Users</h1>');
        response.write('<ul>');
        response.write('<li>User 1</li>');
        response.write('<li>User 2</li>');
        response.write('<li>User 3</li>');
        response.write('</ul>');
        response.write('</body>');
        return response.end();
    }

    if (url === '/create-user' && request.method === 'POST') {
        const body = [];

        request.on('data', (chunk) => {
            body.push(chunk);
        });

        return request.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody.split('=')[1]);
            response.statusCode = 302;
            response.setHeader('Location', '/');
            response.end();
        });

    }
    response.end();

}).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');