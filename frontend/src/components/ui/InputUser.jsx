import React from 'react'
import { Button, CloseButton, Dialog, For, HStack, Portal, VStack,} from "@chakra-ui/react"
import { Input } from "@chakra-ui/react";
import { Field } from './field.jsx'
import SelectRole from './SelectRole.jsx';
const InputUser = () => {
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
                        <Input name="name" placeholder="Enter Username" />
                    </Field>
                    <Field label="Email" required>
                        <Input name="emal" placeholder="Enter Email" />
                    </Field>
                    <Field label="Age" required>
                        <Input name="age" placeholder="Enter Age" type="number" />
                    </Field>
                    <Field label="Salary" required>
                        <Input name="salary" placeholder="Enter Salary" />
                    </Field>
                    <SelectRole />
                    </VStack>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button>Save</Button>
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