import React from 'react';
import Settings from './Settings';

const DetalBar = (props) => {
    return (
        <div className="detal_bar">
        <button 
          className="detal_button"
          onClick={() => props.setActive(props.Active === false ? true : props.Active == true ? null : props.Active == null )}
        >
          <div className={props.Active == false ? "burger-clouse" : props.Active == true ? "burger-menu" :props.Active == null? "burger_cross" : ""}></div>
          <div className={props.Active == false ? "burger-clouse" : props.Active == true ? "burger-menu" :props.Active == null? "burger_cross" : ""}></div>
          <div className={props.Active == false ? "burger-clouse" : props.Active == true ? "burger-menu" :props.Active == null? "burger_cross" : ""}></div>
        </button>
        <div 
          onClick={() => props.setActive(props.Active == false ? true : props.Active == true ? null : props.Active == null)}
          className={props.Active == null ? "bg-settings_bar" : "No-bg-settings_bar"}>
        </div>   
        <Settings
        handleSignout={props.handleSignout}
        setProfileActive={props.setProfileActive}
        Active={props.Active}
        setActive={props.setActive}
        />
        <form style={{width: 100 + "%"}} onSubmit={props.handleSubmitUsers}>
          <input
            className="search_users"
            type="text"
            placeholder="Найти..."
            onChange={(e) => props.setUsersSeacrh( e.target.value )}
            value={props.usersSeacrh}
            onClick={() => props.setActive(props.Active == true ? false : false)}
          />
        </form>
      </div>
    );
};

export default DetalBar;