// A module imported from the node module, is always inside a quote and without slashes or dots
const { rejects } = require("assert");
const res = require("express/lib/response");
const http = require("http");
const { resolve } = require("path");
const Todo = require("./controller")
const { getReqData } = require("./utils")

const PORT = process.env.PORT || 5000;

const server = http.createServer(async(req,res) => {
  // /api/v1/todos: GET
  if (req.url === "api/v1/todos" && req.method === "GET") {
    // get the code
    const todos = await Todo.getTools();
    // set the status code, ane content type
    res.writeHead(200, { "Content-Type": "application/json" });
    // send the data
    res.end(JSON.stringify(todos));
  }

  // /api/v1/todos/:id: GET
  else if (req.url.match(/\/api\/v1\/todos\/([0-9]+)/) && req.method === "GET") {
    try {
        // get id from url 
        const id = req.url.split('/')[4];
        // delete todo
        let message = await Todo.deleteTodo(id);
        // set the status code and content type
        res.writeHead(404,  { "Content-type": "application/json" });
        // send the error
        res.end(JSON.stringify({ message : error }));
    }
  }

  // /api/v1/todos/:id : DELETE
  else if (req.url.match(/\/api\/v1\/todos\/[0-9]+/) && req.method === "DELETE") {
    try {
        // get the idea from the url
        const id = req.url.split('/')[4];
        // delete todo
        let message = await Todo.deleteTodo(id);
        // set the status code and content type 
    }
  }
});