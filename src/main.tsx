import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import ReducerProvider from "./redux/provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ReducerProvider>
			<App />
		</ReducerProvider>
	</React.StrictMode>
);
