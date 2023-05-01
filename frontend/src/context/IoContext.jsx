import { createContext, useContext, useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { SERVER } from "../constants";

console.log("SERVER", SERVER);

// eslint-disable-next-line react-refresh/only-export-components
export const socket = socketIOClient(SERVER)
export const SocketContext = createContext({})

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => useContext(SocketContext)

// eslint-disable-next-line react/prop-types
export const IoProvider = ( {children} ) => {
    const [games, setGames] = useState()

    useEffect(() => {
        socket.on('rooms', (data) => {
            console.log("Connected to server", socket.id)
            console.log("data", data)
            setGames([])
        })
    }, [])

    return (
        <SocketContext.Provider
            value={{ socket: socket, games: games }}
        >
            {children}
        </SocketContext.Provider>
    )
}