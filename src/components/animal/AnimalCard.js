import React from "react"
import "./Animal.css"

export const AnimalCard = ({ animal, customer, location }) => (
    <section className="animal">
        <h3 className="animal__name">{animal.name}</h3>
        <div className="animal__breed">Breed: {animal.breed}</div>
        <div className="animal__owner">Owner: {customer.name}</div>
        <address className="animal__address">Location: {location.name}</address>
    </section>
)