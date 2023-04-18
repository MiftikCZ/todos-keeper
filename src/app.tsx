import { useEffect, useState } from 'preact/hooks'
import './app.css'

interface headerInterface {
  text: string,
  todos: todoInterface[],
  setTodos: Function | any,
  addTodo: Function | any
}

function Header({text,addTodo,setTodos,todos}:headerInterface) {
  return <>
    <div class="text-2xl flex flex-row gap-2">
      <button class="material-symbols-outlined p-1 px-3 h-full self-center border-r-2 cursor-pointer text-gray-400" style={{borderColor: "#aaa2"}} onClick={()=>{
        addTodo()
      }}>add</button>
      <div class="text w-full p-1">
        {text}
      </div>
      <button onClick={()=>{
        let shouldDelete = confirm("This will remove all todos marked as done")
        if(shouldDelete) {
          setTodos(todos.filter(_todo => !_todo.done))
        }
      }} class="material-symbols-outlined self-center p-1 px-3 justify-center content-center flex border-l-2 cursor-pointer text-gray-400" style={{borderColor: "#aaa2"}}>delete</button>
    </div>
  </>
}

interface todoInterface {
  text:string,
  id: string,
  done?:boolean
}

interface customTodoCheckboxInterface {
  done: boolean
}

function CustomTodoCheckbox({done}:customTodoCheckboxInterface) {
  return <>
    <div class={"checkbox "+(done && "done" || "")}></div>
  </>
}

function Todo({todo,todos,setTodos}:todoElInterface) {
  const [rnDone, setRnDone] = useState<boolean>(todo.done || false)

  return <>
    <div onClick={()=>{
      setTodos(todos.map((_todo)=>{
        return _todo.id == todo.id ? {
          ...todo,
          done:!rnDone
        } : _todo
      }))
      setRnDone(!rnDone)
    }} class="p-2 border-b-1 border-b flex flex-row gap-3" style={{borderBottomColor: "#aaa2"}}>
      <CustomTodoCheckbox done={rnDone || false}/>
      <div class="text max-w" style={{color:"#eeee"}}>
        {todo.text}
      </div>
    </div>
  </>
}

interface todosElInterface {
  todos: todoInterface[],
  setTodos: Function | any
}


interface todoElInterface {
  todo: todoInterface,
  todos: todoInterface[],
  setTodos: Function | any
}


function Todos({todos,setTodos}:todosElInterface) {
  return <>
    <div class="todos flex flex-col gap-1 ">
      {todos.map(todo => {
        return <>
          <Todo todo={todo} todos={todos} setTodos={setTodos} />
        </>
      })}
    </div>
  </>
}

export function App() {
  let todosDb = JSON.parse(localStorage.getItem("tk_todos") || "[]") || []

  let [todos,setTodos] = useState<todoInterface[]>(todosDb)
  useEffect(()=>{
    localStorage.setItem("tk_todos", JSON.stringify(todos))
  },[todos])

  function addTodo() {
    let newTodo = prompt("Add new todo")
    if(!newTodo) return
    let newTodoObj:todoInterface = {
      id: Date.now().toString(36),
      text: newTodo,
      done: false
    }
    setTodos([...todos,newTodoObj])
  }

  return (
    <>
      <Header addTodo={addTodo} text="Todo keeper" setTodos={setTodos} todos={todos} />
      <Todos todos={todos} setTodos={setTodos} />
    </>
  )
}
