import React, { useState } from 'react'

function Message(props) {
  // Declare a new state variable, which we'll call "count"
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <h2>{props.key}</h2>
      <p> {props.content}</p>
      <button onClick={()=>setShowForm(!showForm)}>
        button is {showForm ? "true" : "false"}
      </button>
    </div>
  );
}

export default Message
