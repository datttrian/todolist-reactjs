import React from "react"
import styled from "styled-components"
import { useThemeContext } from "../context/themeProvider"
import TodoForm from "./TodoForm"

const TodoItem = ({
	title,
	description,
	todoItem,
	onCompleteItem,
	onDeleteItem,
	onClickItem,
	editedInputTitle,
	setEditedInputTitle,
	editedInputDescription,
	setEditedInputDescription,
	editTodoItem,
	selectedItemIndex,
	itemIndex,
}) => {
	const theme = useThemeContext()

	return itemIndex === selectedItemIndex ? (
		<TodoForm
			buttonName="Edit item"
			inputTitle={editedInputTitle}
			setInputTitle={setEditedInputTitle}
			inputDescription={editedInputDescription}
			setInputDescription={setEditedInputDescription}
			onClickForm={editTodoItem}
		/>
	) : (
		<TodoWrapper>
			<Todo
				theme={theme}
				className={`${todoItem.completed ? "completed" : ""}`}
				onClick={onClickItem}
				draggable>
				<TodoTitle>{title}</TodoTitle>
				<TodoDescription>{description}</TodoDescription>
			</Todo>
			<TodoButtons>
				<CompleteButton
					theme={theme}
					className={`${todoItem.completed ? "completed" : ""}`}
					onClick={onCompleteItem}>
					{todoItem.completed ? "Uncheck" : "Complete"}
				</CompleteButton>
				<DeleteButton theme={theme} onClick={onDeleteItem}>
					Delete
				</DeleteButton>
			</TodoButtons>
		</TodoWrapper>
	)
}

const TodoWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	transition: 0.25s ease-in-out;
	padding: 1rem 0;

	@media screen and (min-width: 700px) {
		align-items: normal;
		justify-content: space-between;
		flex-direction: row;
	}
`

const Todo = styled.li`
	width: 100%;
	padding: 1rem;
	border-radius: 1rem;
	background-color: ${(props) => props.theme.primaryColor};
	transition: 0.25s ease-in-out;
	margin: 0 1rem;

	&: hover {
		opacity: 0.75;
	}

	&.completed {
		opacity: 0.75;
		text-decoration: line-through;
		color: ${(props) => props.theme.headerColor};
		background-color: ${(props) => props.theme.completeColor};
		pointer-events: none;
	}

	@media screen and (min-width: 700px) {
		width: 75%;
	}
`

const TodoTitle = styled.h1`
	font-size: 1.6rem;
	margin-bottom: 1rem;
`

const TodoDescription = styled.h2`
	font-size: 1rem;
	margin-top: 1rem;
`

const TodoButtons = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin: 1rem;

	@media screen and (min-width: 700px) {
		width: auto;
		margin: 0 1rem;
	}
`

const CompleteButton = styled.button`
	width: 40%;
	padding: 1rem;
	border: none;
	border-radius: 1rem;
	color: ${(props) => props.theme.headerColor};
	background-color: ${(props) => props.theme.completeColor};
	transition: 0.25s ease-in-out;

	&: hover {
		opacity: 0.75;
	}

	&.completed {
		color: ${(props) => props.theme.darkHeaderColor};
		background-color: ${(props) => props.theme.primaryColor};
	}

	@media screen and (min-width: 700px) {
		width: auto;
		padding: 0 1rem;
	}
`

const DeleteButton = styled.button`
	width: 40%;
	padding: 1rem;
	border: none;
	border-radius: 1rem;
	color: ${(props) => props.theme.headerColor};
	background-color: ${(props) => props.theme.deleteColor};
	transition: 0.25s ease-in-out;

	&: hover {
		opacity: 0.75;
	}

	@media screen and (min-width: 700px) {
		width: auto;
		padding: 0 1rem;
	}
`

export default TodoItem
