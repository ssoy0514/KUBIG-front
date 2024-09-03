import React, { useState } from "react";

const AuthContext = React.createContext({
	role: "",
	name: "",
	setRole: (role) => {},
	setName: (name) => {},
});

export const AuthContextProvider = (props) => {
	const [role, setRole] = useState("");
	const [name, setName] = useState("");

	const setRoleHandler = (role) => {
		setRole(role);
	};
	const setNameHandler = (name) => {
		setName(name);
	};

	const contextValue = {
		role: role,
		name: name,
		setRole: setRoleHandler,
		setName: setNameHandler,
	};
	return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
