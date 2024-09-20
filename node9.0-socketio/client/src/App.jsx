import { list } from "postcss";
import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
function App() {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [rn, setRn] = useState(""); // room name
  const [socket, setSocket] = useState(null); // Track socket state
  const [ml, setMl] = useState([]); // message list


  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
    setRoom("");
  };

  const handleJoinRoom = (e)=>{
    e.preventDefault();
    socket.emit("join-room", rn);
    setRn("");
  }

  useEffect(() => {
    const newSocket = io("http://localhost:3000");

    // Set the socket to state so it can be accessed elsewhere

    newSocket.on("connect", () => {
      console.log("User Connected here with", newSocket.id);
      setSocket(newSocket);
    });

    newSocket.on("receive-message", (data) => {
      console.log(data);
      setMl((ml) => [...ml, data]);
    });

    newSocket.on("welcome", (s) => {
      console.log("Message From Server :", s);
    });

    return () => {
      setSocket(null);
      newSocket.disconnect();
    };
  }, []);

  return (
    <>
      {socket && (
        <h1 className="text-5xl p-4 text-blue-950">Hello {socket.id}</h1>
      )}

      <form onSubmit={handleJoinRoom}>
        <div className="m-3 bg-gray-400 p-4">
          <label>Join Room : </label>
          <input
            type="text"
            onChange={(e) => {
              setRn(e.target.value);
            }}
            value={rn}
          />
          <button
            type="submit"
            className="px-3 py-1 m-3 bg-slate-300 shadow-md "
          >
            Join
          </button>
        </div>
      </form>
      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <div className="m-3 bg-gray-400 p-4">
          <label>Message : </label>
          <input
            type="text"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          />
          <br />
          <br />
          <label>Room ID : </label>
          <input
            type="text"
            onChange={(e) => {
              setRoom(e.target.value);
            }}
            value={room}
          />
          <br />
          <button
            type="submit"
            className="px-3 py-1 m-3 bg-slate-300 shadow-md "
          >
            Send
          </button>
        </div>

        <ul className="border bottom-3 border-red-800">
          {ml.map((msg, idx) => (
            <li key={idx} className="p-3 border border-b-4">
              {msg}
            </li>
          ))}
        </ul>
      </form>
    </>
  );
}

export default App;
