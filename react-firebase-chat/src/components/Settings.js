import React from 'react';
import { useTheme } from "../Hooks/use-theme";

const Settings = (props) => {

  const {theme, setTheme} = useTheme()

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  const ProfileFunc = () => {
    props.setProfileActive(true)
    props.setActive(props.Active == true ? false : false)
  }

    return (
        <div className={props.Active == null ? "settings_bar" : "NoSettings_bar" }>
        <button
          className="settings_item"
          onClick={ProfileFunc}
        >
          Профиль 
        </button>
        <button
          onClick={themeToggler}
          className="settings_item"
        >
        Тема
        <label className="switch">
            <input type="checkbox"/>
            <span className="slider round"></span>
          </label>
        </button>
        <button
          className="settings_item"
          onClick={props.handleSignout}
        >
          Выход 
        </button>
        </div>
    );
};

export default Settings;