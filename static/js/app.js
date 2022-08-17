class HeaderProject extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			titleProject: this.props.title, 
			descriptionProject: this.props.description,
		}
	}

	render(){
		return (
			<div>
				<h1>{this.state.titleProject}</h1>
				<p>{this.state.descriptionProject}</p>
			</div>
		)
	}

}

class TaskElement extends React.Component {

	constructor(props){
		super(props);
		this.returnTaskForDoing = this.returnTaskForDoing.bind(this)
		this.handleCkeckboxTaskForDoing = this.handleCkeckboxTaskForDoing.bind(this)
		this.state = {
			tasksCheked: 0,
		}
	}

	handleCkeckboxTaskForDoing(event){
		if (event.target.checked === true){
			this.setState({tasksCheked: this.state.tasksCheked + 1,})
		}else{
			this.setState({tasksCheked: this.state.tasksCheked - 1,})
		}
	}

	returnTaskForDoing(){
		const tasksForDoing = this.props.dataListTask[1].map((task, index) =>
			<div className="" key={index}>
				<span className=""><input type="checkbox" onClick={this.handleCkeckboxTaskForDoing} className="form-check-input"/> {task} </span>
			</div>
		);
		return tasksForDoing;
	}

	render(){
		return(
			<div className="card taskElement">
				<div className="dropdown">
					<button className="btn btn-light btn-sm dropdown-toggle float-end" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
					    Options
					</button>
					 <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
					    <li><a className="dropdown-item" data-bs-toggle="modal"  onClick={(e) => this.props.handleConfigTask(e, this.props.idTaskElement)} data-bs-target="#modalForDeleteTask" name="delete" href="#">Delete</a></li>
					</ul>
				</div>
				<h3>{this.props.dataListTask[0]}</h3>
				<br/>
				<div>
					<p>Progress: <br/> {this.state.tasksCheked}/{this.props.dataListTask[1].length} tasks completed</p>
				</div>
				<div className="">
					<div className="taskElementCheck card">
						{this.returnTaskForDoing()}
						<br/><span>Date: {this.props.dataListTask[2]}</span>
					</div>
				</div>
			</div>
		)
	}
}

class ModalDeleteTask extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className="modal fade " id="modalForDeleteTask" tabIndex="-1" aria-labelledby="modalForDeleteTaskLabel" aria-hidden="true">
			  <div className="modal-dialog modal-dialog-centered">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="modalForDeleteTaskLabel">Delete list</h5>
			        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			      </div>
			      <div className="modal-body">
			        Are you secure that do you want delete list?
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-danger" name="submit"  onClick={this.props.functionhandleDeleteTask}>Delete</button>
			      </div>
			    </div>
			  </div>
			</div>
		);
	}
}

class OptionsForTask extends React.Component {
	render(){
		return (
			<div className="text-center">
				<button className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#modalForCreateTask">Add new task</button>
			</div>
		);
	}
}


class ModalCreateTask extends React.Component {
	constructor(props){
		super(props);
		this.handleButtonAddTask = this.handleButtonAddTask.bind(this)
		this.handleInputTask = this.handleInputTask.bind(this)
		this.handleInputTitle = this.handleInputTitle.bind(this)
		this.returnTask = this.returnTask.bind(this)
		this.handleDeleteTaskForDoing = this.handleDeleteTaskForDoing.bind(this)
		this.state = {
			tasksForDoing: [],
			inputTitle: '',
			inputTask: '',
			errorInputTask: '',
			errorInputTitle: '',
		}
	}

	handleButtonAddTask(event){
		if (this.state.inputTask.length > 0){
			this.setState({errorInputTask: ''})
			let taskTemp = this.state.tasksForDoing
			taskTemp.push(this.state.inputTask)
			this.setState({tasksForDoing: [...taskTemp], inputTask: ''})	
		}else{
			this.setState({errorInputTask:'You added tasks'})
		}
		
	}

	handleInputTitle(event){
		this.setState({inputTitle: event.target.value, errorInputTitle: ''})
	}

	handleInputTask(event){
		this.setState({inputTask: event.target.value})
	}

	handleDeleteTaskForDoing(event){
		let tasksForDoingTemp = this.state.tasksForDoing;
		delete tasksForDoingTemp[event.target.name]
		let content =  tasksForDoingTemp.filter(el => el != undefined  && el != null)
		this.setState({tasksForDoing: [...content]})	
	}

	returnTask(){
		const a = this.state.tasksForDoing.map((tag, index) => 
			  <li className="list-group-item" key={index}>{tag} <button onClick={this.handleDeleteTaskForDoing} name={index} className="btn btn-primary float-end">Eliminar</button></li>
		);
		return a;
	}

	render(){
		return(
			<div className="modal fade " id="modalForCreateTask" tabIndex="-1" aria-labelledby="modalForCreateTaskLabel" aria-hidden="true">
			  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="modalForCreateTaskLabel">Create a new list tasks</h5>
			        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			      </div>
			      <div className="modal-body">
			        <label className="form-label">Title of list</label>
			        <input type="text" className="form-control" onChange={this.handleInputTitle} value={this.state.inputTitle}/>
			        <p className="text-danger">{this.state.errorInputTitle}</p>
			        <label className="form-label">Task for doing</label>
			        <div className="input-group">
				        <input type="text" className="form-control" onChange={this.handleInputTask} value={this.state.inputTask}/>
				        <button className="btn btn-primary" onClick={this.handleButtonAddTask}>Add</button>
			        </div>
			        <p className="text-danger">{this.state.errorInputTask}</p>
			     	<ol className="list-group list-group-numbered">
			     		{this.returnTask()}
					</ol>
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Reset</button>
			        <button type="button" className="btn btn-primary" name="submit" onClick={(e) =>{
			        	if (this.state.inputTitle.length > 0 && this.state.tasksForDoing.length > 0){
			        		this.props.handleButtonAddListTasks(e, this.state.inputTitle, this.state.tasksForDoing);
				        	this.setState({tasksForDoing: [], errorInputTask: '', errorInputTitle: '', inputTitle: ''});
				        	this.props.functionHideModal(document.getElementById('modalForCreateTask'));
			        	}
			        	else{
			        		this.setState({errorInputTask: 'You can not left input blank', errorInputTitle: 'You can not left input blank'})
			        	}
	
			        }}>
			        	Save list
			        </button>
			      </div>
			    </div>
			  </div>
			</div>
		)
	}
}

const project = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliq"

class ElementMain extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			ListTaskElement: [["Make documentation", ["Lorem ipsum dolor sit amet, consectetur", "adipisicing elit, sed do", "eiusmodtempor incididunt ut"], "Wed Jun 08 2022"]],
			TaskElementForDelete: '',
		}
		this.handleConfigTask = this.handleConfigTask.bind(this)
		this.returnTaskElement = this.returnTaskElement.bind(this)
		this.handleDeleteTask = this.handleDeleteTask.bind(this) 
		this.hideModal = this.hideModal.bind(this)
		this.handleButtonAddListTasks = this.handleButtonAddListTasks.bind(this)
		this.setDate = this.setDate.bind(this)
	}

	returnTaskElement(){
		const taskElements = this.state.ListTaskElement.map((element, index) => 
			<TaskElement key={index} dataListTask={this.state.ListTaskElement[index]}  idTaskElement={index} handleConfigTask={this.handleConfigTask}/>
		)
		return taskElements;
	}

	handleConfigTask(event, id){
		switch (event.target.name){
			case "delete":
			this.setState({TaskElementForDelete: id})
				break;
		}
	}

	hideModal(element){
		let boostrapModal =  bootstrap.Modal.getInstance(element)
		boostrapModal.hide()
	}

	handleDeleteTask(event){
		switch(event.target.name){
			case "submit":
				const ListTaskElementTemp = this.state.ListTaskElement
				delete ListTaskElementTemp[this.state.TaskElementForDelete]
				const content = ListTaskElementTemp.filter(element => element != null && element != undefined)
				this.setState({ListTaskElement: [...content], TaskElementForDelete: ''})
				this.hideModal(document.getElementById('modalForDeleteTask'))
		}
	}

	setDate(){
		const date = new Date()
		return date.toDateString()
	}

	handleButtonAddListTasks(event, title, content){
		let newListTask = this.state.ListTaskElement
		newListTask.push([title, [...content], this.setDate()])
		this.setState({ListTaskElement: [...newListTask]})
	}

	render(){
		return (
			<div>
				<br/>
				<HeaderProject title="Section" description={project}/><br/>
				<OptionsForTask/>
				{this.returnTaskElement()}
				<ModalCreateTask functionHideModal={this.hideModal} handleButtonAddListTasks={this.handleButtonAddListTasks}/>
				<ModalDeleteTask functionhandleDeleteTask={this.handleDeleteTask}/>
			</div>
		)
	}
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
	<ElementMain/>
);