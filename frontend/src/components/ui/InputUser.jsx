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

const InputUser = ({children, type ="add", data}) => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(type==="add"?{
    name:"", email:"", age:"", salary:"", role:""
  }:data);

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

  // to create user
const addUserMutation = useMutation({
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
    setOpen(false);
    console.log("Data saved successfully", data);
    toast.success("User details added successfully");
    queryClient.invalidateQueries({ queryKey: ["User"] });
  }  
})

//to update user
const updateMutation = useMutation({
  mutationFn: async (info) => {  // <-- change from (id) to (info)
    const res = await fetch(baseUrl + '/' + info.id, {  // <-- use info.id
      method: "PUT",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  },
  onError: (error) => {
    toast.error(error.message);
  },
  onSuccess: (data) => {
    setOpen(false);
    console.log("Update User Details successfully", data);
    toast.success("Update User Details successfully");
    queryClient.invalidateQueries({ queryKey: ["User"] });
  },
});

const requiredFields = ["name", "email", "age", "salary"];

function handleSubmit() {
  // ✅ Loop only once through required fields
  for (const key of requiredFields) {
    const value = info[key];
    if (
      (typeof value === "string" && value.trim() === "") ||
      (typeof value === "number" && isNaN(value))
    ) {
      toast.error(`Missing or invalid value for ${key}`);
      return;
    }
  }

  if (type === "add") {
    // ✅ Prepare payload and exclude empty role
    const payload = { ...info };

    if (!payload.role || payload.role.trim() === "") {
      delete payload.role; // Let DB default to 'INTERN'
    }

    payload.age = parseInt(payload.age);
    payload.salary = parseFloat(payload.salary);

    addUserMutation.mutate(payload);
  } else {
    // ✅ Pass the full info object for update (fix: not just id)
    const payload = {
      ...info,
      age: parseInt(info.age),
      salary: parseFloat(info.salary),
    };

    updateMutation.mutate(payload);
  }
}

  return (
    <>
    <Dialog.Root 
    placement="center" 
    motionPreset="slide-in-bottom" 
    open={open} 
    onOpenChange={(e) => setOpen(e.open)}
    >
            {children}
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>{type==="add"?"Add User":"Update User"}</Dialog.Title> 
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
                    <Button onClick={handleSubmit}>{type==="add"?"Add":"Update"}</Button>
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