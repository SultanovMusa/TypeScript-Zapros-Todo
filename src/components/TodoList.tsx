import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
	deleteRequest,
	getRequest,
	patchRequest,
	postRequest,
} from "../redux/slice/TodoSlice";
import scss from "./TodoList.module.scss";
import { TodoType } from "../tools";

const TodoList = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string | number>("");
	const [image, setImage] = useState<string>("");

	const [email2, setEmail2] = useState<string>("");
	const [password2, setPassword2] = useState<string | number>("");
	const [image2, setImage2] = useState<string>("");
	const [editId, setEditId] = useState<number | null>(null);

	const todos = useAppSelector((state) => state.todo.data);
	const dispatch = useAppDispatch();

	const handleAdd = async () => {
		const newData: TodoType = {
			email,
			password,
			img: image,
		};
		if (email === "" || password === "" || image === "") {
			alert("kot");
		} else {
			await dispatch(postRequest(newData));
			setEmail("");
			setPassword("");
			setImage("");
			dispatch(getRequest());
		}
	};

	const deleteHandle = async (_id: number) => {
		await dispatch(deleteRequest(_id));
		dispatch(getRequest());
	};

	const patchHandle = async (_id: number) => {
		const updatedData = {
			email: email2,
			password: password2,
			img: image2,
		};
		await dispatch(patchRequest({ _id, updatedData }));
		dispatch(getRequest());
		setEditId(null);
	};

	useEffect(() => {
		dispatch(getRequest());
	}, []);

	return (
		<div className={scss.container}>
			<h1>TodoList</h1>
			<hr />
			<div className={scss.content}>
				<input
					type="Email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="Password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input
					type="url"
					placeholder="Url"
					value={image}
					onChange={(e) => setImage(e.target.value)}
				/>
				<button onClick={handleAdd}>Add Todo</button>
				<hr />
			</div>

			{todos.map((item) => (
				<div key={item._id}>
					{editId === item._id! ? (
						<div className={scss.cars}>
							<input
								type="Email"
								placeholder="Email"
								value={email2}
								onChange={(e) => setEmail2(e.target.value)}
							/>
							<input
								type="Password"
								placeholder="Password"
								value={password2}
								onChange={(e) => setPassword2(e.target.value)}
							/>
							<input
								type="url"
								placeholder="Url"
								value={image2}
								onChange={(e) => setImage2(e.target.value)}
							/>
							<button onClick={() => patchHandle(item._id!)}>Save </button>
							<button onClick={() => setEditId(null)}>Cancel</button>
							<hr />
						</div>
					) : (
						<>
							<div className={scss.car}>
								<p>Email: {item.email}</p>
								<p>Password: {item.password}</p>
								<img src={item.img} alt="Todo image" />
								<button onClick={() => deleteHandle(item._id!)}>Delete</button>
								<button
									onClick={() => {
										setEditId(item._id!);
										setEmail2(item.email);
										setPassword2(item.password);
										setImage2(item.img);
									}}>
									Edit
								</button>
							</div>
						</>
					)}
				</div>
			))}
		</div>
	);
};

export default TodoList;
