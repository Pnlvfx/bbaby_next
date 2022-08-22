import { createContext } from "react";

const UserContext = createContext<SessionProps | {}>({});

export default UserContext;