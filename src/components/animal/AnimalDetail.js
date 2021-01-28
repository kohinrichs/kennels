import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"
import { useParams, useHistory } from "react-router-dom"

export const AnimalDetail = () => {
  const { getAnimalById, releaseAnimal } = useContext(AnimalContext)

  const [animal, setAnimal] = useState({})
  
  const history = useHistory()

  const handleRelease = () => {
    releaseAnimal(animal.id)
      .then(() => {
        history.push("/animals")
      })
  }

	const {animalId} = useParams();

  useEffect(() => {
    console.log("useEffect", animalId)
    getAnimalById(animalId)
    .then((response) => {
      setAnimal(response)
    })
    }, [])

  return (
    <section className="animal">
      <h3 className="animal__name">{animal.name}</h3>
      <div className="animal__breed">{animal.breed}</div>
      {/* The question marks are for option chaining. The code won't break if location or customer doesn't
      have a property called name*/}
      <div className="animal__location">Location: {animal.location?.name}</div>
      <div className="animal__owner">Customer: {animal.customer?.name}</div>
      <button onClick={() => {
        history.push(`/animals/edit/${animal.id}`)
      }}>Edit</button>
      <button onClick={handleRelease}>Release Animal</button>
    </section>
  )
}