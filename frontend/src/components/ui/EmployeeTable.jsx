import React from 'react'
import { Stack, Table, HStack } from "@chakra-ui/react"
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useMutation } from '@tanstack/react-query';
import { baseUrl } from '../../../constants/global-variable';
import  toast  from 'react-hot-toast';
import { queryClient } from '../../../utils/queryClient.js';
const EmployeeTable = ({ data }) => {

  if (!data.length) {
    return <h1>You don't have any employee data..</h1>;
  }
  const mutation = useMutation({
    mutationFn: async(id)=>{
      const res = await fetch(baseUrl + "/" + id,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await res.json();
      if(!res.ok){
        throw new Error(data.message || "Failed to delete data");
      }
      return data;
    },
    onError: (err)=>{
      toast.error(err.response.data.message);
    },
    onSuccess: (data)=>{
      toast.success("User Details Deleted Successfully");
      queryClient.invalidateQueries({queryKey: ["User"]});
    }
  })
  return (
    <Stack gap="10">
      <Table.Root size="md" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Age</Table.ColumnHeader>
            <Table.ColumnHeader>Role</Table.ColumnHeader>
            <Table.ColumnHeader>Salary</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>{item.age}</Table.Cell>
              <Table.Cell>{item.role}</Table.Cell>
              <Table.Cell>{item.salary}</Table.Cell>
              <Table.Cell>
                <HStack gap="3">
                  <FaEdit size={20} className='icon' />
                  <MdDelete 
                  size={20} 
                  className='icon' 
                  onClick={()=>mutation.mutate(item.id)}/>
                </HStack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Stack>
  );
};

export default EmployeeTable;
