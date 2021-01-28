import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import "./Location.css"
import { useHistory, useParams } from 'react-router-dom';

export const LocationForm = () => {
    const { addLocation, updateLocation, getLocationById } = useContext(LocationContext)

    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

    Define the intial state of the form inputs with useState()
    */

    const [location, setLocation] = useState({
      name: "",
      address: "",
    });

    const [isLoading, setIsLoading] = useState(true);

    const { locationId } = useParams();
    const history = useHistory();

     //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
      //When changing a state object or array,
      //always create a copy make changes, and then set state.
      const newLocation = { ...location }
      //animal is an object with properties.
      //set the property to the new value
      newLocation[event.target.id] = event.target.value
      //update state
      setLocation(newLocation)
    }

    const handleSaveLocation = () => {
      if (location.name === "" || location.address === "") {
          window.alert("Please fill out the form")
      } else {
        //disable the button - no extra clicks
        setIsLoading(true);
        // This is how we check for whether the form is being used for editing or creating. If the URL that got us here has an id number in it, we know we want to update an existing record of an animal
        if (locationId){
          //PUT - update
          updateLocation({
              id: location.id,
              name: location.name,
              address: location.address
          })
          .then(() => history.push(`/locations/detail/${location.id}`))
        }else {
          //POST - add
          addLocation({
              name: location.name,
              address: location.address
          })
          .then(() => history.push("/locations"))
        }
      }
    }

    // Get customers and locations. If animalId is in the URL, getAnimalById
    useEffect(() => {
        if (locationId) {
          getLocationById(locationId)
          .then(location => {
              setLocation(location)
              setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
    }, [])

    /*
    Reach out to the world and get customers state
    and locations state on initialization, so we can provide their data in the form dropdowns
    */
    // useEffect(() => {
    //   getLocations()
    // }, [])

    // //when a field changes, update state. The return will re-render and display based on the values in state
    //     // NOTE! What's happening in this function can be very difficult to grasp. Read it over many times and ask a lot questions about it.
    // //Controlled component
    // const handleControlledInputChange = (event) => {
    //   /* When changing a state object or array,
    //   always create a copy, make changes, and then set state.*/
    //   const newLocation = { ...location }
    //   let selectedVal = event.target.value
    //   // forms always provide values as strings. But we want to save the ids as numbers. This will cover both customer and location ids
    //   if (event.target.id.includes("Id")) {
    //     selectedVal = parseInt(selectedVal)
    //   }
    //   /* Animal is an object with properties.
    //   Set the property to the new value
    //   using object bracket notation. */
    //   newLocation[event.target.id] = selectedVal
    //   // update state
    //   setLocation(newLocation)
    // }

    // const handleClickSaveLocation = (event) => {
    //   event.preventDefault() //Prevents the browser from submitting the form

    // //   const locationId = employee.locationId

    //   if (location.name.value === "" || location.address.value === "") {
    //     window.alert("Please complete the form.")
    //   } else {
    //     //invoke addAnimal passing animal as an argument.
    //     //once complete, change the url and display the animal list
    //     addLocation(location)
    //     .then(() => history.push("/locations"))
    //   }
    // }

    return (
      <form className="locationForm">
          <h2 className="locationForm__title">{locationId ? "Edit Location" : "Add Location"}</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Location name:</label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Location name" value={location.name}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="address">Location address:</label>
                  <input type="text" id="address" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Location address" value={location.address}/>
              </div>
          </fieldset>
          <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveLocation()
          }}>
        {locationId ? "Save Location" : "Add Location"}</button>
      </form>
    )
}