import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { AnimalContext } from "./AnimalProvider"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import { AnimalCard } from "./AnimalCard"
import "./Animal.css"

// Location is currently tied to Animals because of the expand in the Animal Provider. 
// May need to refactor later on depending on what we need locations for/to do.
export const AnimalList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { animals, getAnimals, searchTerms } = useContext(AnimalContext)
  const { locations, getLocations } = useContext(LocationContext)
  const { customers, getCustomers } = useContext(CustomerContext)

    const [ filteredAnimals, setFiltered ] = useState([])
    // The useHistory hook let's us tell React which route we want to visit. We will use it to tell React to render the animal form component.
    const history = useHistory()

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("AnimalList: Initial render before data")
    getLocations()
    .then(getCustomers)
    getCustomers()
    .then(getAnimals)
    getAnimals()
  }, [])

    // useEffect dependency array with dependencies - will run if dependency changes (state)
  // searchTerms will cause a change
  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching animals
      const subset = animals.filter(animal => animal.name.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {
      // If the search field is blank, display all animals
      setFiltered(animals)
    }
  }, [searchTerms, animals])

  return (
    <>
      <h1>Animals</h1>

      <button onClick={() => history.push("/animals/create")}>
          Make Reservation
      </button>
      <div className="animals">
      {
        filteredAnimals.map(animal => {
          return <AnimalCard key={animal.id} animal={animal} />
        })
      }
      </div>
    </>
  )
}