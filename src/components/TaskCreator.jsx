import { useState } from "react";

export const TaskCreator = ({ createNewTask }) => {
	const [newTaskName, setNewTaskName] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
		createNewTask(newTaskName);
		setNewTaskName("");
	};

	return (
		<form onSubmit={handleSubmit} className="my-2 row">
			<div className="col-9">
				<input
					onChange={e => setNewTaskName(e.target.value)}
					type="text"
					value={newTaskName}
					placeholder="new task"
					className="form-control"
				/>
			</div>
			<div className="col-3">
				<button className="btn btn-primary btn-sm">Click</button>
			</div>
		</form>
	);
};
