import React from 'react';

const Modal = (props) => {
    return (
        <div className="bg-user-active">
        <div className="block-user-active">
          <form onSubmit={props.UserNameHandle}>
            <h2 className="Nick">Nick-Name</h2>
            <label>User name</label>
            <input
              className="UserName"
              placeholder="Enter name"
              type="text" 
              value={props.userName}
              onChange={(e) => props.setUserName( e.target.value )}
            />
            <div>
              <button className="btn go">GO!!!</button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Modal;