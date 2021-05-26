import Header from './components/Header';
import Tasks from './components/Tasks';
import { useState } from 'react';
import AddTask from './components/AddTask';

function App(

) {
  const [tasks,setTasks] = useState([

    {
        id:1,
        text: 'Doctors Appointment',
        day: 'Feb 5th at 2:30pm',
        reminder:true
    },
    {
        id:2,
        text: 'Meeting at School',
        day: 'Feb 6th at 1:30pm',
        reminder:true
    },
    {
        id:3,
        text: 'Food Shopping',
        day: 'Feb 5th at 2:30pm',
        reminder:false
    }
    
]);

//Add Tasks
const addTasks = (task) =>{
  console.log(task);
}

//Delete Tasks
const deleteTasks = (id)=>{
  setTasks(tasks.filter((task)=>task.id !== id))
}

//Toggle Reminder
const toggleReminder = (id)=>{
setTasks(tasks.map((task)=> task.id === id ? {...task,reminder:!task.reminder}: task))
}
  return (
    <div className="container">
<AddTask onAdd={addTasks}/>
<Header />
{tasks.length > 0 ?<Tasks tasks={tasks} 
onDelete={deleteTasks}
onToggle={toggleReminder}
/> : 'There are no tasks!'}
    </div>
  );
}

export default App;