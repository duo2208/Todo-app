import React, {useState, useEffect} from 'react';
import AddTodo from './AddTodo';
import Todo from './Todo';
import styles from './TodoList.module.css';

export default function TodoList({filter}) {
    const [todoList, setTodoList] = useState(() => readTodoListFromLocalStorage() );

    const handleAdd = (newItem) => setTodoList([...todoList, newItem]);
    const handleUpdate = (updatedItem) => setTodoList(todoList.map(item => item.id === updatedItem.id ? updatedItem : item));
    const handleDelete = (deletedItem) => setTodoList(todoList.filter(item => item.id !== deletedItem.id ));

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }, [todoList])

    const filtered = getFilteredItems(todoList, filter)

    return (
        <section className={styles.container}>
            <ul className={styles.list}>
                {filtered.map(item => (
                    <Todo
                        key = {item.id}
                        todo = {item}
                        onUpdate = {handleUpdate}
                        onDelete = {handleDelete}
                    />
                ))}
            </ul>

            <AddTodo onAdd={handleAdd} />
        </section>
    );
}

function readTodoListFromLocalStorage() {
    const todoList = localStorage.getItem('todoList');
    return todoList ? JSON.parse(todoList) : [];
}
function getFilteredItems(todoList, filter) {
    if(filter === 'all') {
        return todoList;
    }
    return todoList.filter((todo) => todo.status === filter);
}

/*
const initalList = [
{
    id: '11cs',
    text: '공기청정기필터',
    status: 'completed'
},
{
    id: '21d4',
    text: '단스탠드',
    status: 'active'
},
{
    id: '3a23',
    text: '키보드',
    status: 'active'
}
]
*/