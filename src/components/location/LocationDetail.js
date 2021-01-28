import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"
import { useHistory, useParams } from "react-router-dom"

export const LocationDetail = () => {
  const { getLocationById } = useContext(LocationContext)
	const [location, setLocation] = useState({
        employees:[],
        animals: []
    })

  const history = useHistory()  

	const {locationId} = useParams();

  useEffect(() => {
    console.log("useEffect", locationId)
    getLocationById(locationId)
    .then((response) => {
      setLocation(response)
    })
    }, [])

  return (
    <section className="location">
      <h3 className="location__name">{location.name}</h3>
      {/* The question marks are for option chaining. The code won't break if location or customer doesn't
      have a property called name*/}
      <div className="location__address">{location.address}</div>
      <div className="location__employees">Employees: {location.employees.map(employee => employee.name).join(", ")}</div>
      <div className="location__animals">Animals: {location.animals.map(animal => animal.name).join(", ")}</div>
      <button onClick={() => {
        history.push(`/locations/edit/${location.id}`)
      }}>Edit</button>
    </section>
  )
}