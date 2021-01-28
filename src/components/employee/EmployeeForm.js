import React, { useContext, useEffect, useState } from "react"
import { EmployeeContext } from "../employee/EmployeeProvider"
import { LocationContext } from "../location/LocationProvider"
import "./Employee.css"
import { useHistory, useParams } from 'react-router-dom';

export const EmployeeForm = () => {
    const { addEmployee, getEmployeeById, updateEmployee } = useContext(EmployeeContext)
    const { locations, getLocations } = useContext(LocationContext)

    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

    Define the intial state of the form inputs with useState()
    */

    const [employee, setEmployee] = useState({
      name: "",
      locationId: 0,
    });

    //wait for data before button is active. Look at the button to see how it's setting itself to disabled or not based on this state
    const [isLoading, setIsLoading] = useState(true);

   // Now that the form can be used for editing as well as adding an animal, you need access to the animal id for fetching the animal you want to edit
   const { employeeId } = useParams();
   const history = useHistory();

     //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
      //When changing a state object or array,
      //always create a copy make changes, and then set state.
      const newEmployee = { ...employee }
      //animal is an object with properties.
      //set the property to the new value
      newEmployee[event.target.id] = event.target.value
      //update state
      setEmployee(newEmployee)
    }

    const handleSaveEmployee = () => {
      if (parseInt(employee.locationId) === 0) {
          window.alert("Please select a location")
      } else {
        //disable the button - no extra clicks
        setIsLoading(true);
        // This is how we check for whether the form is being used for editing or creating. If the URL that got us here has an id number in it, we know we want to update an existing record of an animal
        if (employeeId){
          //PUT - update
          updateEmployee({
              id: employee.id,
              name: employee.name,
              locationId: parseInt(employee.locationId)
          })
          .then(() => history.push(`/employees/detail/${employee.id}`))
        }else {
          //POST - add
          addEmployee({
              name: employee.name,
              locationId: parseInt(employee.locationId)
          })
          .then(() => history.push("/employees"))
        }
      }
    }


    /*
    Reach out to the world and get customers state
    and locations state on initialization, so we can provide their data in the form dropdowns
    */
    useEffect(() => {
      getLocations()
      .then(() => {
        if (employeeId) {
          getEmployeeById(employeeId)
          .then(employee => {
              setEmployee(employee)
              setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
      })
    }, [])

    // //when a field changes, update state. The return will re-render and display based on the values in state
    //     // NOTE! What's happening in this function can be very difficult to grasp. Read it over many times and ask a lot questions about it.
    // //Controlled component
    // const handleControlledInputChange = (event) => {
    //   /* When changing a state object or array,
    //   always create a copy, make changes, and then set state.*/
    //   const newEmployee = { ...employee }
    //   let selectedVal = event.target.value
    //   // forms always provide values as strings. But we want to save the ids as numbers. This will cover both customer and location ids
    //   if (event.target.id.includes("Id")) {
    //     selectedVal = parseInt(selectedVal)
    //   }
    //   /* Animal is an object with properties.
    //   Set the property to the new value
    //   using object bracket notation. */
    //   newEmployee[event.target.id] = selectedVal
    //   // update state
    //   setEmployee(newEmployee)
    // }

    // const handleClickSaveEmployee = (event) => {
    //   event.preventDefault() //Prevents the browser from submitting the form

    //   const locationId = employee.locationId

    //   if (locationId === 0) {
    //     window.alert("Please select a location")
    //   } else {
    //     //invoke addAnimal passing animal as an argument.
    //     //once complete, change the url and display the animal list
    //     addEmployee(employee)
    //     .then(() => history.push("/employees"))
    //   }
    // }

    return (
      <form className="employeeForm">
          <h2 className="employeeForm__title">{employeeId ? "Edit Employee" : "Add Employee"}</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="employeeName">Employee name:</label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Employee name" value={employee.name}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="location">Assign to location: </label>
                  <select value={employee.locationId} id="locationId" onChange={handleControlledInputChange} className="form-control" >
                      <option value="0">Select a location</option>
                      {locations.map(l => (
                          <option key={l.id} value={l.id}>
                              {l.name}
                          </option>
                      ))}
                  </select>
              </div>
          </fieldset>
          <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveEmployee()
          }}>
        {employeeId ? "Save Employee" : "Add Employee"}</button>
      </form>
    )
}