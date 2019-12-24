import React from 'react';

import classes from './Input.css'

const input = props => {
    let inputElement = null;
    const classInputElement = [classes.InputElement];
    let errorMessage = null;
    if (props.invalid && props.touched) {
        classInputElement.push(classes.Valid);
        errorMessage = <p className={classes.ErrorMessage}>Please enter a valid value!</p>;
    }
    switch (props.elementType) {
      case "input":
        inputElement = (
          <input
            {...props.elementConfig}
            value={props.value}
            className={classInputElement.join(' ')} onChange={props.changed}
          />
        );
        break;
      case "textarea":
        inputElement = (
          <textarea
            {...props.elementConfig}
            value={props.value}
            className={classInputElement.join(' ')} onChange={props.changed}
          />
        );
        break;
      case "select":
        inputElement = (
          <select className={classes.SelectElement} value={props.value} onChange={props.changed}>
            {props.elementConfig.options.map(option => (
              <option value={option.value} key={option.id}>
                {option.displayValue}
              </option>
            ))}
          </select>
        );
        break;
      default:
        inputElement = (
          <input
            {...props.elementConfig}
            value={props.value}
            className={classInputElement.join(' ')} onChange={props.changed}
          />
        );
        break;
    }
    return (
      <div className={classes.Input}>
        <label htmlFor="" className={classes.Label}>
          {props.label}
        </label>
        {inputElement}
        {errorMessage}
      </div>
    );
}
 
export default input;