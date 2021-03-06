import {useEffect, useState} from "react";
import io from "socket.io-client";

function useBlockedServices() {
  const [socket, setSocket] = useState()
  const [blockedServices, setBlockedServices] = useState(null)

  useEffect(() => {
    const socket = io("ws://localhost:8080", {
      reconnectionDelayMax: 10000,
      auth: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTYxNDUxMDkwNH0.iHJfC1k01HK9-DqGNyZReiGC6uHkmXghBivELtBxTgQ"
      },
    })

    setSocket(socket)
  }, [])

  useEffect(() => {
    if (!socket) {
      return
    }

    return socket.on('blocked-services', (data) => {
      setBlockedServices(data.data)
    })

  }, [socket])

  return blockedServices
}

export {useBlockedServices};

