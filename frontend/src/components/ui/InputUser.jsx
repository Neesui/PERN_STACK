import React from 'react'
import { Button, CloseButton, Dialog, For, HStack, Portal, VStack,} from "@chakra-ui/react"
import { Input } from "@chakra-ui/react";
import { Field } from './field.jsx'
import SelectRole from './SelectRole.jsx';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { baseUrl } from '../../../constants/global-variable';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../utils/queryClient.js';
const InputUser = () => {
  const [info, setInfo] = useState({
    name:"", email:"", age:"", salary:"", role:""
  });

  // console.log(info);

  function handleChange(e){
    const {name,value} = e.target;
    setInfo(prev => {
      return{
        ...prev,
        [name]:value
      }
    })
  }

const mutation = useMutation({
  mutationFn: async (info) => {
    const res = await fetch( baseUrl,{
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if(!res.ok){
      throw new Error(data.message);
    }
    return data;
  },
  onError: (error) => {
    toast.error(error.message);
  },
  onSuccess: (data) => {
    console.log("Data saved successfully", data);
    toast.success("User details added successfully");
    queryClient.invalidateQueries({ queryKey: ["User"] });
  }  
})

  const requiredFields = ["name", "email", "age", "salary"];
  function handleSubmit(){
    for (const key of requiredFields) {
      if (!info[key].trim()) {
        toast.error(`Missing Fields...`);
        return;
      }
    }
    mutation.mutate(info);
  }
  return (
    <>
    <Dialog.Root placement="center" motionPreset="slide-in-bottom">
            <Dialog.Trigger asChild>
              <Button variant="outline">Add User </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>ADD Users</Dialog.Title> 
                  </Dialog.Header>
                  <Dialog.Body>
                    <VStack gap="4" alignItems="flex-start">
                    <Field label="Username" required>
                        <Input name="name" placeholder="Enter Username" value={info.name}onChange={handleChange}/>
                    </Field>
                    <Field label="Email" required>
                        <Input name="email" placeholder="Enter Email" value={info.email}onChange={handleChange}/>
                    </Field>
                    <Field label="Age" required>
                        <Input name="age" placeholder="Enter Age" type="number" value={info.age}onChange={handleChange}/>
                    </Field>
                    <Field label="Salary" required>
                        <Input name="salary" placeholder="Enter Salary"value={info.salary}onChange={handleChange} />
                    </Field>
                    <SelectRole setInfo={setInfo}/>
                    </VStack>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button onClick={handleSubmit}>Add</Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
    </>
  )
}

export default InputUser