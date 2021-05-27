import { useState, useEffect } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App(

) {
  const [showAddTask,setShowAddTask] = useState(false);

  useEffect(() => {

    const getTasks = async() =>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks();

  }, []);


  //Fetch Taskss
  const fetchTasks = async() =>{
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json()
    console.log(data);
    return data
  }

  const fetchTask = async(id) =>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json()
    return data
  }

  const [tasks,setTasks] = useState([
  
]);

//Add Tasks
const addTasks = async(task) => {
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {'Content-type': 'application/json'
},
body: JSON.stringify(task)
  })
  const data = await res.json()

  setTasks([...tasks,data]);
}

//Delete Tasks
const deleteTasks = async(id)=>{
await fetch (`http://localhost:5000/tasks/${id}`,{
  method: 'DELETE'
})

  setTasks(tasks.filter((task)=>task.id !== id))
}

//Toggle Reminder
const toggleReminder = async (id)=>{
const taskToToggle = await fetchTask(id)
const updateTask = {...taskToToggle, reminder: 
!taskToToggle.reminder}

const res = await fetch(`http://localhost:5000/tasks/${id}`, {
  method:'PUT',
  headers: {
    'Content-type': 'application/json',
  },
    body: JSON.stringify(updateTask)
  })

  const data = await res.json()

setTasks(tasks.map((task)=> 
task.id === id ? {...task,reminder:
data.reminder}: task))
}
  return (
    <div className="container">
{showAddTask && <AddTask onAdd={addTasks}/>}
<Header onAdd={()=> setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
{tasks.length > 0 ?<Tasks tasks={tasks} 
onDelete={deleteTasks}
onToggle={toggleReminder}
/> : 'There are no tasks!'}
    </div>
  );
}

export default App;
