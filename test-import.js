const fs = require('fs');
const http = require('http');

const fileContent = fs.readFileSync('books.csv');
const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';

const postData = Buffer.concat([
    Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="books.csv"\r\nContent-Type: text/csv\r\n\r\n`),
    fileContent,
    Buffer.from(`\r\n--${boundary}--`)
]);

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/books/import',
    method: 'POST',
    headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': postData.length
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(postData);
req.end();
