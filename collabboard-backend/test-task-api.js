const http = require('http');

const BASE_URL = 'http://localhost:5000/api/tasks';

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  let res = await request('GET', '/api/tasks');
  console.log('GET /api/tasks:', res.status === 200 && Array.isArray(res.data) && res.data.length > 0);

  res = await request('GET', '/api/tasks?columnId=col-inprogress');
  console.log('GET /api/tasks?columnId=col-inprogress:', res.status === 200 && res.data.every((t) => t.columnId === 'col-inprogress'));

  res = await request('POST', '/api/tasks', {
    title: 'Integration Test Task',
    description: 'Testing task card creation',
    columnId: 'col-todo',
    boardId: 'board-1',
    priority: 'high',
  });
  console.log('POST /api/tasks:', res.status === 201 && typeof res.data.id === 'string');
}

runTests();
