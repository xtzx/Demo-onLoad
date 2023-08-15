const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    // 解析 URL，获取路径和查询参数
    const { pathname, query } = url.parse(req.url, true);

    // 获取延迟时间，默认为0
    const delay = parseInt(query.delay) || 0;

    // 延迟发送响应
    setTimeout(() => {
        // 读取请求的静态文件
        fs.readFile(`.${pathname}`, (err, data) => {
            if (err) {
                // 处理文件不存在的情况
                res.statusCode = 404;
                res.end('File not found');
            } else {
                // 设置 Content-Type 根据需要自行调整
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    }, delay);
});

const port = 8000;

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
