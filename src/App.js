// import logo from './logo.svg';
import './App.css';
import Header from './MyComponents/Header';
import { Todos } from './MyComponents/Todos';
import { Footer } from './MyComponents/Footer';
import { AddTodo } from './MyComponents/AddTodo';
import {About} from "./MyComponents/About"

// use-state hook
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  
  // delete todo
  const onDelete = (todo) => {
    console.log("I am ondelete", todo);
    // deleting this way does not work
    // let index = todos.indexOf(todo);
    // todos.splice(index, 1);

    // filter is higher order array method
    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // add todo in list
  const addTodo = (title, desc) => {
    console.log("i am adding todo", title, desc);
    // console.log(todos.length);
    let sno;
    if (todos.length === 0) {
      sno = 1;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  }

  const [todos, setTodos] = useState(initTodo);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <>
    <Router>
      
      <Header title="My Todos List" searchBar={false} />  {/* this is header component, passed title and searchbar props */}

      <Switch>

          <Route exact path="/" render={()=>{
            return( 
            <>
            <AddTodo addTodo={addTodo} />
            <Todos todos={todos} onDelete={onDelete} />
            </>)
          }}  >
          </Route>

          <Route exact path="/about">
            <About />
          </Route>

      </Switch>

      <Footer />
    </Router>
    </>
  );
}

export default App;
