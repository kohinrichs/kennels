import React from "react"
import "./Animal.css"

export const AnimalCard = ({ animal, owner, location }) => (
    <section className="animal">
        <h3 className="animal__name">{animal.name}</h3>
        <h4 className="animal__breed">Breed: {animal.breed}</h4>
        <h4 className="animal__owner">Owner: {owner.name}</h4>
        <address className="animal__address">Location:{location.name}</address>
    </section>
)