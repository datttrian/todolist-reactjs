import React from "react"
import styled from "styled-components"
import TodoItem from "./TodoItem"

const TodoList = ({
	todoItems,
	setTodoItems,
	filteredTodoItems,
	onClickItem,
	editTodoItem,
	isSelected,
	selectedItemIndex,
	editedInputTitle,
	setEditedInputTitle,
	editedInputDescription,
	setEditedInputDescription,
}) => {
	// Handle todo delete button
	const deleteTodoItem = (todoItem) => {
		const updatedTodoList = setTodoItems(
			todoItems.filter((element) => element.id !== todoItem.id)
		)

		localStorage.setItem("todoItems", JSON.stringify(updatedTodoList))

		if (updatedTodoList === undefined) {
			localStorage.setItem("todoItems", JSON.stringify([]))
		}
	}

	// Handle todo complete button
	const completeTodoItem = (todoItem) => {
		setTodoItems(
			todoItems.map((item) => {
				if (item.id === todoItem.id) {
					return {
						...item,
						completed: !item.completed,
					}
				}
				return item
			})
		)
	}

	return (
		<ListWrapper>
			<List>
				{filteredTodoItems.map((todoItem, index) => (
					<TodoItem
						title={todoItem.title}
						description={todoItem.description}
						todoItem={todoItem}
						completed={todoItem.completed}
						key={todoItem.id}
						todoItems={todoItems}
						setTodoItems={setTodoItems}
						onCompleteItem={() => {
							completeTodoItem(todoItem)
						}}
						onDeleteItem={() => {
							deleteTodoItem(todoItem)
						}}
						onClickItem={() => {
							onClickItem(todoItem.id)
						}}
						editTodoItem={editTodoItem}
						isSelected={isSelected}
						selectedItemIndex={selectedItemIndex}
						itemIndex={index}
						editedInputTitle={editedInputTitle}
						setEditedInputTitle={setEditedInputTitle}
						editedInputDescription={editedInputDescription}
						setEditedInputDescription={setEditedInputDescription}
					/>
				))}
			</List>
		</ListWrapper>
	)
}

const ListWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 1rem 0;
`

const List = styled.ul`
	width: 100%;
	list-style-type: none;
`

export default TodoList
