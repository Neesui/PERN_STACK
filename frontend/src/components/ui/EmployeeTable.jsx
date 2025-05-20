import React from 'react'
import { For, Stack, Table, HStack } from "@chakra-ui/react"
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const EmployeeTable = () => {
  return (
    <Stack gap="10">
    <Table.Root size="md" variant="outline">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>ID</Table.ColumnHeader>
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader>Email</Table.ColumnHeader>
          <Table.ColumnHeader>Age</Table.ColumnHeader>
          <Table.ColumnHeader>Roll</Table.ColumnHeader>
          <Table.ColumnHeader>Salary</Table.ColumnHeader>
          <Table.ColumnHeader>Actions</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.email}</Table.Cell>
            <Table.Cell>{item.age}</Table.Cell>
            <Table.Cell>{item.roll}</Table.Cell>
            <Table.Cell>{item.salary}</Table.Cell>
            <Table.Cell>
              <HStack gap="3">
              <FaEdit size={20} className='icon' />
              <MdDelete  size={20} className='icon'/>
              </HStack>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
</Stack>
  )
}

export default EmployeeTable

const items = [
    { id: 1, name: "Nisha", email: "nanu@gmail.com", age:20, roll:"", salary: 10000 },
    { id: 2, name: "Anu", email: "nau@gmail.com", age:21, roll:"", salary: 20000 },
    { id: 3, name: "Neelu", email: "neelu@gmail.com", age:22, roll:"", salary: 40000 },
    { id: 4, name: "Sita", email: "sita@gmail.com", age:20, roll:"", salary: 50000 },
    { id: 5, name: "Ram", email: "ram@gmail.com", age:23, roll:"", salary: 100000 }
  ]