"use strict";
 
const express = require('express');
const app = express();
 
// Serve static files from the 'public' folder
app.use(express.static('public'));
 
// Parse JSON request bodies (needed for POST)
app.use(express.json());
 
// ---- Your endpoints go below this line ----
 
 app.get('/hello', (req, res) => {
  res.type('text').send('Hello from the server!');
});

let time = new Date().toISOString();
app.get('/api/time', (req, res) => {
    let myObj = {
        currentTIme: new Date().toISOString(),
        message: "Current server time"
    }
    res.type('json').send(myObj);
});

app.get('/api/greet/:name', (req, res) => {
    let myObj = { 
        greeting: "Hello, " +  req.params.name  + "! Welcome to the API."
    }
  res.type('json').send(myObj);
});

app.get('/api/math', (req, res) => {
    let a = req.query.a;
    let b = req.query.b;
    let operation = req.query.operation;
    const numA = parseInt(a);
    const numB = parseInt(b);

    let result;

    switch(operation) {
        case 'add':
            result = numA + numB;
            break;
        case 'subtract':
            result = numA - numB;
            break;
        case 'multpiply': 
            result = numA * numB;
            break; 
        case 'division':
            if (numA === 0 || numB === 0) {
                return res.status(400).json({ error: 'Division by zero is not allowed' });
            }
            result = numA / numB;
            break
        default:
            return res.status(400).json({ error: 'invalid operations'})
    }
  res.json({
    "a": numA,
    "b": numB,
    "operation": operation,
    "result": result
  });
});
 
// ---- Your endpoints go above this line ----
 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
