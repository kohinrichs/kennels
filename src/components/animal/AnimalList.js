import React, { useContext, useEffect } from "react"
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
  const { animals, getAnimals } = useContext(AnimalContext)
  const { locations, getLocations } = useContext(LocationContext)
  const { customers, getCustomers } = useContext(CustomerContext)

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

  return (
    <div className="animals">
       <h2>Animals</h2>
		      <button onClick={() => {history.push("/animals/create")}}>
            Add Animal
          </button>

      {animals.map(animal => {
          const customer = customers.find(c => c.id === animal.customerId)
          const location = locations.find(l => l.id === animal.locationId)

          return <AnimalCard key={animal.id} animal={animal} customer={customer} location ={location} />
        })
      }
    </div>
  )
}
// animals.map(animal => {
//   const owner = customers.find(c => c.id === animal.customerId)
//   const clinic = locations.find(l => l.id === animal.locationId)

// return <AnimalCard key={animal.id}
//   location={clinic}
//   customer={owner}
//   animal={animal} />
// }
// )
// }