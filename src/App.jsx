import { TaskCreator } from "./components/TaskCreator";
import "./App.css";
import { useState, useEffect } from "react";
import TaskTable from "./components/TaskTable";
import VisibilityControl from "./components/VisibilityControl";
import Container from "./components/Container";

function App() {
	const [tasks, setTasks] = useState([]);
	const [showCompleted, setShowCompleted] = useState(false);

	function createNewTask(taskName) {
		console.log(taskName);
		if (!tasks.find(task => task.name === taskName)) {
			setTasks([...tasks, { name: taskName, done: false }]);
		}
	}

	function toggleTask(task) {
		setTasks(
			tasks.map(t => (t.name === task.name ? { ...t, done: !t.done } : t))
		);
	}

	useEffect(() => {
		let data = localStorage.getItem("tasks");
		if (data) {
			setTasks(JSON.parse(data));
		}
	}, []);

	const cleanTasks = () => {
		setTasks(tasks.filter(task => !task.done));
		setShowCompleted(false);
	};

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);
	return (
		<main className="App bg-dark vh-100 text-white">
			<Container>
				<TaskCreator createNewTask={createNewTask} />
				<TaskTable tasks={tasks} toggleTask={toggleTask} />
				<VisibilityControl
					isChecked={showCompleted}
					setShowCompleted={completed => setShowCompleted(completed)}
					cleanTasks={cleanTasks}
				/>
				{showCompleted === true && (
					<TaskTable
						tasks={tasks}
						toggleTask={toggleTask}
						showCompleted={showCompleted}
					/>
				)}
			</Container>
		</main>
	);
}

export default App;
