import React, { useState } from 'react'
import axios from 'axios'

function Create({ onTodoAdded }) {

  const [task, setTask] = useState("")

  const handleAdd = () => {

    axios.post("http://localhost:3000/add", { task })
      .then(() => {
        setTask("")
        onTodoAdded()  // Refresh the todo list
      })
      .catch((err) => {
        console.log(err)
      })
  }


  return (
    <div className="create-form">
      <input
        type='text'
        className='create-input'
        placeholder='Add a new task...'
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type='button' onClick={handleAdd} className='create-button'>Add</button>
    </div>
  )
}

export default Create
