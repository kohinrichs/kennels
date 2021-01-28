import React, { useContext, useEffect, useState } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"
import { useHistory, useParams } from "react-router-dom"

export const EmployeeDetail = () => {
  const { getEmployeeById } = useContext(EmployeeContext)

  const [employee, setEmployee] = useState({})
  
  const history = useHistory()

	const {employeeId} = useParams();

  useEffect(() => {
    console.log("useEffect", employeeId)
    getEmployeeById(employeeId)
    .then((response) => {
      setEmployee(response)
    })
    }, [])

  return (
    <section className="employee">
      <h3 className="employee__name">{employee.name}</h3>
      {/* The question marks are for option chaining. The code won't break if location or customer doesn't
      have a property called name*/}
      <div className="employee__location">Location: {employee.location?.name}</div>
      <div className="employee__location--address">Location Address: {employee.location?.address}</div>
      <button onClick={() => {
        history.push(`/employees/edit/${employee.id}`)
      }}>Edit</button>
    </section>
  )
}