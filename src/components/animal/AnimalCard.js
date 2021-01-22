import React from "react"
import "./Animal.css"

export const AnimalCard = ({ animal, customer, location }) => (
    <section className="animal">
        <h3 className="animal__name">{animal.name}</h3>
        <h4 className="animal__breed">{animal.breed}</h4>
        <address className="location__address">{location.name}</address>
        <h4 className="customer__name">{customer.name}</h4>
    </section>
)