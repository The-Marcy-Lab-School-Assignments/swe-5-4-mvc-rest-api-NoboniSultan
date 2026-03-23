let todos = [
    { id: getId(), task: 'Buy groceries', isDone: false },
    { id: getId(), task: 'Walk the dog', isDone: true },
    { id: getId(), task: 'Read a book', isDone: false },
];

const getID = () => todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;

const list = () => todos.map(t => ({ ...t }));

const find = (id) => {
    const todo = todos.find(t => t.id === Number(id));
    return todo ? { ...todo } : null;
};

const create = (task) => {
    const newTodo = { id: getId(), task, isDone: false };
    todos.push(newTodo);
    return { ...newTodo };
};

const update = (id, changes) => {
    const todo = todos.find(t => t.id === Number(id));
    if (!todo)
        return null;
    Object.assign(todo, changes);
    return { ...todo };
};

const destroy = (id) => {
    const index = todos.findIndex(t => t.id === Number(id));
    if (index === -1)
        return false;
    todos.splice(index, 1);
    return true;
};

module.exports = { list, find, create, update, destroy };