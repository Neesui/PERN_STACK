import React from 'react'

const Tablelist = () => {
    const clients = [{name: "Nisha Chaudhary", email:"nisha@gmail.com", job: "Devloper", rate:"1000", isactive: true},
        {name: "Nisha Chaudhary", email:"nisha@gmail.com", job: "Devloper", rate:"1000", isactive: true},
        {name: "Nisha Chaudhary", email:"nisha@gmail.com", job: "Devloper", rate:"1000", isactive: true},
        {name: "Nisha Chaudhary", email:"nisha@gmail.com", job: "Devloper", rate:"1000", isactive: true},
        {name: "Nisha Chaudhary", email:"nisha@gmail.com", job: "Devloper", rate:"1000", isactive: true},
    ]
    
    return (
        <>
            <div className="overflow-x-auto mt-10">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Job</th>
                            <th>Rate</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client, index) => (
                            <tr key={index} className="hover:bg-base-300">
                                <th>{index + 1}</th>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.job}</td>
                                <td>{client.rate}</td>
                                <td>
                                    <button className={`btn btn-xs ${client.isactive ? 'btn-success' : 'btn-error'}`}>
                                        {client.isactive ? 'Active' : 'Inactive'}
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-xs btn-secondary">Update</button>
                                </td>
                                <td>
                                    <button className="btn btn-xs btn-accent">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Tablelist