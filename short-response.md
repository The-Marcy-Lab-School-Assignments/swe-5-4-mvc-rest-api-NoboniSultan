# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use exact terms and concepts from the lesson.

Your responses will each be evaluated out of 3 points for writing quality and 3 points for technical accuracy (6 points per question, 30 points total).

---

## Question 1 — REST Principles

The Todo Tracker API is a **RESTful** API. Identify at least **3 specific design decisions** in the API that make it RESTful, and explain what each one communicates to a client developer. Consider the URL structure, HTTP methods, and status codes used.

One RESTful design choice is the use of clear, resource-based URLs like `/todos` and `/todos/:id`, which tells the client exactly what kind of data they're working with. Another example is the use of proper HTTP methods like `GET` for retrieving todos, `POST` for creating, and `PATCH` of `PUT` for updating. As a result, the intent of the request is clearly communicated. Another example is using meaningful HTTP status codes, such as `200` for success. `201` frr creation, and `400` for bad requests. This helps the client to understand the result of their request. These design decisions make the API predictable and easy to work with.

---

## Question 2 — Separation of Concerns

What problem is caused by mixing data logic and request/response logic in a single file? What does separating them into a model and controller enable? Be specific about what gets harder and what gets easier.

When data logic and request/response logic are mixed in the same file, the code becomes harder to read, test, and maintain because it leads to "spaghetti code" where components are tightly coupled. Even small changes, eg. updating how data is stored, can break unrelated parts of the request handling. By separating them into a model and a controller, the model focuses only on data operations while the controller handles HTTP-specific logic. This makes debugging easier and allows you to reuse the data and logic in different contexts. Overall, it reduces complexity and makes the code more organized and scalable.

---

## Question 3 — Request Lifecycle

Walk through what happens, step by step, when the user clicks a checkbox to toggle a todo's `isDone` field. Name each file and function in your MVC structure that gets involved, in the order it runs, and describe what it does.

When the user clicks the checkbox, the frontend sends a request (usually a `PATCH` request) to update the `isDone` field of a specific todo. That request hits the route, which calls a controller function eg. `updateTodo`. Inside the controller, it extracts the `id` and updated data from the request and calls a model function, such as `updateTodoById`. The model handles finding the correct todo and updating its `isDone` value in the data store. Finally, the controller sends back a response with the updated todo, which the frontend uses to update the UI.
---

## Question 4 — Code Sorting

Below is a `createTodo` function that does everything in one place. For each numbered line, identify whether it belongs in the **model** or the **controller**, and explain why.

```js
const createTodo = (req, res) => {
  /* 1 */ const { task } = req.body;
  /* 2 */ if (!task) return res.status(400).send({ message: 'task is required' });
  /* 3 */ const newTodo = { id: getId(), task, isDone: false };
  /* 4 */ todos.push(newTodo);
  /* 5 */ res.status(201).send(newTodo);
};
```

Line 1: `const { task } = req.body;` belongs to the controller because it deals with extracting data from the HTTP request.

Line 2: This line (the validation and `res.status(400)`) also belongs to the controller logic since it handles request validation and sending a response. 

Line 3: `const newTodo = {...}` belongs to the model because it defines how a todo is structured internally.

Line 4: `todos.push(newTodo);` is model logic because it directly interacts with the date storage.

Line 5: `res.status(201).send(newTodo);` goes in the controller because it;s responsible for sending the HTTP response back to the client.