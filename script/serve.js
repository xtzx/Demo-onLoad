const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// http://localhost:3000/pic.jpg?delay=3000

const server = http.createServer((req, res) => {
    const {pathname, query} = url.parse(req.url, true);
    const delay = query.delay || 0;
    const filePath = path.join(__dirname, '../public', pathname);
    // const filePath = path.join('public', pathname);
    console.log('filePath: ', filePath);

    setTimeout(() => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end('File not found');
                return;
            }

            let contentType = 'text/plain';

            if (pathname.endsWith('.css')) {
                contentType = 'text/css';
            } else if (pathname.endsWith('.jpg') || pathname.endsWith('.jpeg')) {
                contentType = 'image/jpeg';
            } else if (pathname.endsWith('.png')) {
                contentType = 'image/png';
            } else if (pathname.endsWith('.js')) {
                contentType = 'application/javascript';
            }

            res.setHeader('Content-Type', contentType);
            res.end(data);
        });
    }, delay);
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000/');
});
