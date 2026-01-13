
import React, { useState, useEffect } from 'react'
import Create from './Create'
import axios from 'axios'
import './App.css'

function Home() {
    const [todos, setTodos] = useState([])

    const fetchTodos = () => {
        axios.get("http://localhost:3000/get")
            .then((res) => {
                setTodos(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    const deleteTodo = (id) => {
        axios.delete(`http://localhost:3000/delete/${id}`)
            .then(() => {
                fetchTodos()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="todo-container">
            <h2 className="todo-title">Todo List</h2>
            <Create onTodoAdded={fetchTodos} />
            <div className="todo-list">
                {
                    todos.length === 0 ? (
                        <div className="no-record">
                            <h2>No tasks yet</h2>
                            <p>Start by adding your first task above</p>
                        </div>
                    ) : (
                        todos.map((todo, idx) => (
                            <div className="todo-item" key={idx}>
                                <input type="checkbox" className="todo-checkbox" />
                                <span className="todo-text">{todo.task}</span>
                                <button className="delete-button" onClick={() => deleteTodo(todo._id)}>🗑️</button>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default Home
