import React, { useState, useRef } from 'react';

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
	name: string,
	done: boolean
}
function App() {
	const [newTask, setNewTask] = useState<string>(''); 
	const [task, setTasks] = useState<ITask[]>([]);
	const taskInput = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: FormElement) => {
		e.preventDefault();
		addTask(newTask);
		console.log(task);
		setNewTask('');
		taskInput.current?.focus();
	}

	const addTask = (name: string): void => {
		const newTasks: ITask[] = [...task, {name, done: false}];
		setTasks(newTasks);
	}
	
	const toggleDoneClass = (i: number): void => {
		const newTasks: ITask[] = [...task];
		newTasks[i].done = !newTasks[i].done;
		setTasks(newTasks);
	}

	const deleteTask = (i: number): void => {
		const newTasks: ITask[] = [...task];
		newTasks.splice(i ,1);
		setTasks(newTasks);
	}
	return (
		<div className="container p-4">
			<div className="row">
				<div className="col-md-6 offset-md-3">
				<div className="card">
				<div className="card-body">
					<form onSubmit={handleSubmit}>
								<input className="form-control" ref={taskInput} autoFocus type="text" onChange={e => setNewTask(e.target.value)} value={newTask}/>
								<input type="submit" className="btn btn-success btn-block mt-2" value="Enviar"/>
							</form>
						</div>
					</div>
					{
						task.map((t: ITask, i: number) => (
							<div key={i} className="card card-body mt-2">
								<h1 style={{textDecoration: t.done ? 'line-through' : ''}} >{t.name}</h1>
								<div>
									<button className="btn btn-secondary" onClick={() => toggleDoneClass(i)}>
										{t.done ? '✓' : '✗'}
									</button>
									<button className="btn btn-danger" onClick={() => deleteTask(i)}>
										🗑
									</button>
								</div>
							</div>
						))
					}
				</div>
			</div>
		</div>
	);
}

export default App;
