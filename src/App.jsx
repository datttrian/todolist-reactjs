import { useState, useEffect } from "react"
import styled from "styled-components"
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"
import { useThemeContext } from "./context/themeProvider"
import { v4 as uuid } from "uuid"

function App() {
	const theme = useThemeContext()

	// Using the UUID package to generate a unique identifier for each todo item
	const id = uuid()

	// Creating different states for data management
	const [inputTitle, setInputTitle] = useState("")
	const [inputDescription, setInputDescription] = useState("")
	const [editedInputTitle, setEditedInputTitle] = useState("")
	const [editedInputDescription, setEditedInputDescription] = useState("")
	const [selectedItemIndex, setSelectedItemIndex] = useState()
	const [todoItems, setTodoItems] = useState([])
	const [todoStatus, setTodoStatus] = useState("all")
	const [filteredTodoItems, setFilteredTodoItems] = useState([])

	// Creating a use effect that will run the get data from local storage function on loading the website
	useEffect(() => {
		getTodosFromLocalStorage()
	}, [])

	// Creating a use effect that will run the filter function whenever the a new todo is added, then save the todo list to local storage
	useEffect(() => {
		filterByStatus()
		saveTodosToLocalStorage()
		// eslint-disable-next-line
	}, [todoItems, todoStatus])

	const filterByStatus = () => {
		switch (todoStatus) {
			case "pending":
				setFilteredTodoItems(
					todoItems.filter((todoItem) => todoItem.completed === false)
				)
				break
			case "completed":
				setFilteredTodoItems(
					todoItems.filter((todoItem) => todoItem.completed === true)
				)
				break
			default:
				setFilteredTodoItems(todoItems)
				break
		}
	}

	const saveTodosToLocalStorage = () => {
		if (todoItems.length > 0) {
			localStorage.setItem("todoItems", JSON.stringify(todoItems))
		}
	}

	const getTodosFromLocalStorage = () => {
		if (localStorage.getItem("todoItems") === null) {
			localStorage.setItem("todoItems", JSON.stringify([]))
		} else {
			let todoListfromLocalStorage = JSON.parse(
				localStorage.getItem("todoItems")
			)
			setTodoItems(todoListfromLocalStorage)
		}
	}

	// Handle todo status
	const changeTodoItemStatus = (e) => {
		setTodoStatus(e.target.value)
	}

	// Hangle todo add button
	const addTodoItem = (e) => {
		e.preventDefault()

		if (
			inputTitle === "" ||
			inputDescription === "" ||
			inputTitle.length <= 4 ||
			inputDescription.length <= 15
		) {
			return alert("Invalid title or description! Please try again.")
		} else {
			setTodoItems([
				...todoItems,
				{
					title: inputTitle,
					description: inputDescription,
					completed: false,
					id: id,
				},
			])
			setInputTitle("")
			setInputDescription("")
		}
	}

	const onSelectTodoItem = (id) => {
		const item = todoItems.filter((todoItem) => todoItem.id === id)
		setEditedInputTitle(item[0].title)
		setEditedInputDescription(item[0].description)
		setSelectedItemIndex(todoItems.indexOf(item[0]))
		// console.log(todoItems.findIndex((i) => i.id === item.id))
	}

	const editTodoItem = (e) => {
		e.preventDefault()

		if (
			editedInputTitle === "" ||
			editedInputDescription === "" ||
			editedInputTitle.length <= 4 ||
			editedInputDescription.length <= 15
		) {
			return alert("Invalid title or description! Please try again.")
		} else {
			todoItems.splice(selectedItemIndex, selectedItemIndex + 1, {
				title: editedInputTitle,
				description: editedInputDescription,
				completed: false,
				id: id,
			})
			localStorage.setItem("todoItems", JSON.stringify(todoItems))
			setEditedInputTitle("")
			setEditedInputDescription("")
			setSelectedItemIndex()
		}
	}

	return (
		<Wrapper theme={theme}>
			<Header theme={theme}>Todo List Application</Header>
			<TodoContainer theme={theme}>
				<MainForm>
					<TodoForm
						inputTitle={inputTitle}
						setInputTitle={setInputTitle}
						inputDescription={inputDescription}
						setInputDescription={setInputDescription}
						todoItems={todoItems}
						setTodoItems={setTodoItems}
						setTodoStatus={setTodoStatus}
						onClickForm={addTodoItem}
						buttonName="Add item"
					/>
					<TodoFilter onChange={changeTodoItemStatus}>
						<FilterOption value="all">All</FilterOption>
						<FilterOption value="pending">Pending</FilterOption>
						<FilterOption value="completed">Completed</FilterOption>
					</TodoFilter>
				</MainForm>
				<ListContainer theme={theme}>
					{todoItems.length === 0 ? (
						<EmptyPrompt theme={theme}>
							New tasks will be added here...
						</EmptyPrompt>
					) : (
						<TodoList
							todoItems={todoItems}
							setTodoItems={setTodoItems}
							filteredTodoItems={filteredTodoItems}
							onClickItem={onSelectTodoItem}
							editTodoItem={editTodoItem}
							selectedItemIndex={selectedItemIndex}
							editedInputTitle={editedInputTitle}
							setEditedInputTitle={setEditedInputTitle}
							editedInputDescription={editedInputDescription}
							setEditedInputDescription={
								setEditedInputDescription
							}
						/>
					)}
				</ListContainer>
			</TodoContainer>
		</Wrapper>
	)
}

const Wrapper = styled.main`
	min-height: 100vh;
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 2rem 0;
	background: ${(props) => props.theme.backgroundColor};
`

const TodoContainer = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;
`

const MainForm = styled.div`
	margin: 2rem 0;
	display: flex;
	flex-direction: column;

	@media screen and (min-width: 700px) {
		width: 100%;
		justify-content: space-between;
		flex-direction: row;
	}
`

const TodoFilter = styled.select`
	margin: 2rem 1rem;
	border: none;
	border-radius: 1rem;
	padding: 1rem;
	cursor: pointer;
`

const FilterOption = styled.option``

const Header = styled.h1`
	font-size: 3rem;
	text-align: center;
	color: ${(props) => props.theme.headerColor};
`

const ListContainer = styled.div`
	border-radius: 1rem;
	padding: 3rem 1rem 3rem 1rem;
	background-color: ${(props) => props.theme.foregroundColor};

	@media screen and (min-width: 700px) {
		padding: 2rem 0;
	}
`

const EmptyPrompt = styled.h3`
	font-size: 1rem;
	font-style: italic;
	color: ${(props) => props.theme.headerColor};
	text-align: center;
`

export default App
