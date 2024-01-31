import React, { useEffect, useState } from 'react'
import del from "./trash.svg";
import axios from 'axios'
import './index.css';

function App() {

  const [items, setItems] = useState({todos:[], done:[]})

  const [newItem, setNewItem] = useState("")


  function handleChange(e) {
    console.log(e.target.value)
    setNewItem(e.target.value)
  }

    //Pour que la fonction s'execute dés l'ouverture
    useEffect(() => {
      fetch();
    }, );

  function fetch() {
    axios.get('http://localhost:4000/todos')
    .then(res => {
      filter(res.data)
    })
  }

  function filter(all) {
    let todos = all.filter(todo => {
      return !todo.isCompleted
    })
    let done = all.filter(todo => {
      return todo.isCompleted
    })
    setItems({todos: todos, done: done})
  }

  function add(e) {
    //console.log(newItem)
    if (newItem !== " ") {
      let todo = { text: newItem, isCompleted: false} 
      axios.post('http://localhost:4000/todos/add', todo)
      .then(res => {
        console.log(res.data)
        console.log('Success')
        fetch()
      })
      setNewItem(" ")
    }   
  }

  function check(todo) {
    axios.put('http://localhost:4000/todos/'+ todo._id, todo)
    .then(res => {
      console.log(res.data)
      fetch()
    })
  }

  function trash(id) {
    axios.delete('http://localhost:4000/todos/'+ id)
    .then(res => {
      console.log(res.data)
      fetch()
    })   
  }


  return (
    <div>
      <nav>TODO App</nav>
      <div class="section">
        <div class="undone">
          <p class="title"></p>
          <div class="list">
            <form onSubmit={(e) => { e.preventDefault(); add(e) }}>
              <input type="text" placeholder='Add ToDo' value={newItem} onChange={(e) => handleChange(e)} class='input' />
            </form>
            <ul>
              {items.todos.map(item => {
                  return (<li onClick={() => check(item)} key={item._id}>{item.text}</li>)
              })}
            </ul>
          </div>
          <div class="left">
            <p>{items.todos.length} items left</p>
          </div>
        </div>

        <div class="undone">
          <p class="title">Done</p>
          <div class="list">
            <ul>
              {items.done.map(item => {
                  return (
                    <li key={item._id} class="done">
                      <label>{item.text}</label>
                      <button onClick={() => trash(item._id)}><img src={del} alt="delete" height={20} /></button>
                    </li>
                  )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
