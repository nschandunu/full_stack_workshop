require('dotenv').config();
const http = require('http');

const PORT = process.env.PORT || 5001;
const BASE_URL = `http://localhost:${PORT}/api/tasks`;

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
  const createdId = res.data.id;
  console.log('POST /api/tasks:', res.status === 201 && typeof createdId === 'string');

  res = await request('PUT', `/api/tasks/${createdId}/move`, {
    targetColumnId: 'col-inprogress',
  });
  console.log('PUT /api/tasks/:id/move:', res.status === 200 && res.data.columnId === 'col-inprogress');

  res = await request('PATCH', `/api/tasks/${createdId}`, {
    priority: 'medium',
    assignee: 'user-2',
  });
  console.log('PATCH /api/tasks/:id:', res.status === 200 && res.data.priority === 'medium');

  res = await request('DELETE', `/api/tasks/${createdId}`);
  console.log('DELETE /api/tasks/:id:', res.status === 200);
}

runTests();
