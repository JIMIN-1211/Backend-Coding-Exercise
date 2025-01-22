import React from "react";

function Form(props) {
  const isRegistered = props.isRegistered;
  return (
    <form className="form">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      {!isRegistered&&<input type="password" placeholder="Confirm Password" />}
      {isRegistered?<button type="submit">Login</button>:<button type="submit">Register</button>}
    </form>
  );
}

export default Form;
