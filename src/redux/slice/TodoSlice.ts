import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodoType } from "../../tools/index";
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

interface TodoState {
	data: TodoType[];
	loading: boolean;
	error: null | string;
}

const initialState: TodoState = {
	data: [],
	loading: false,
	error: null,
};

export const getRequest = createAsyncThunk("todo/ feacth", async () => {
	const response = await axios.get(url);
	return response.data;
});

export const postRequest = createAsyncThunk(
	"todo/post",
	async (newData: TodoType) => {
		const response = await axios.post(url, newData);
		return response.data;
	}
);

export const deleteRequest = createAsyncThunk(
	"todo/delete",
	async (_id: number) => {
		const response = await axios.delete(`${url}/${_id}`);
		return response.data;
	}
);

export const patchRequest = createAsyncThunk(
	"todo/updateTodo",
	async ({ _id, updatedData }: { _id: number; updatedData: TodoType }) => {
		const response = await axios.patch(`${url}/${_id}`, updatedData);
		return response.data;
	}
);

const TodoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getRequest.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getRequest.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(getRequest.rejected, (state, action) => {
				(state.loading = false), (state.error = action.error.message || "Kara");
			})
			.addCase(deleteRequest.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(deleteRequest.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Kara";
			})
			.addCase(patchRequest.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(patchRequest.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Kara";
			});
	},
});

export default TodoSlice.reducer;
