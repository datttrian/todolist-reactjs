import React from "react"
import styled from "styled-components"
import { useThemeContext } from "../context/themeProvider"

const TodoForm = ({
	inputTitle,
	setInputTitle,
	inputDescription,
	setInputDescription,
	buttonName,
	onClickForm,
}) => {
	const theme = useThemeContext()

	// Handle user input in the title field
	const handleInputTitleChange = (e) => {
		setInputTitle(e.target.value)

		if (e.target.value.length >= 25) {
			alert("Title cannot be more than 20 characters")
		}
	}

	// Handle user input in the description field
	const handleInputDescriptionChange = (e) => {
		setInputDescription(e.target.value)

		if (e.target.value.length >= 75) {
			alert("Description cannot be more than 75 characters")
		}
	}

	return (
		<FormWrapper>
			<Form>
				<TodoTitle
					value={inputTitle}
					placeholder="Enter a todo item"
					minLength={4}
					maxLength={20}
					onChange={handleInputTitleChange}
					required={true}
				/>
				<TodoDescription
					value={inputDescription}
					placeholder="Enter a description"
					minLength={15}
					maxLength={75}
					onChange={handleInputDescriptionChange}
					required={true}
				/>
				<AddButton theme={theme} onClick={onClickForm}>
					{buttonName}
				</AddButton>
			</Form>
		</FormWrapper>
	)
}

const FormWrapper = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 2rem 0;

	@media screen and (min-width: 700px) {
		width: 75%;
		flex-direction: row;
		justify-content: space-between;
	}
`

const Form = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 2rem 0;
	padding: 0 1rem;

	@media screen and (min-width: 700px) {
		justify-content: space-between;
		flex-direction: row;
		gap: 0;
	}
`

const TodoTitle = styled.input`
	width: 100%;
	padding: 1rem;
	border: none;
	border-radius: 1rem;
	transition: 0.25s ease-in-out;

	&:focus {
		opacity: 0.75;
	}

	@media screen and (min-width: 700px) {
		width: 25%;
		padding: 0 1rem;
	}
`

const TodoDescription = styled.input`
	width: 100%;
	padding: 1rem;
	border: none;
	border-radius: 1rem;
	transition: 0.25s ease-in-out;

	&:focus {
		opacity: 0.75;
	}

	@media screen and (min-width: 700px) {
		width: 60%;
		padding: 0 1rem;
	}
`

const AddButton = styled.button`
	border: none;
	border-radius: 1rem;
	padding: 1rem;
	background-color: ${(props) => props.theme.addButtonColor};
	color: ${(props) => props.theme.headerColor};
	transition: 0.25s ease-in-out;
	cursor: pointer;

	&:hover {
		opacity: 0.75;
	}
`

export default TodoForm
