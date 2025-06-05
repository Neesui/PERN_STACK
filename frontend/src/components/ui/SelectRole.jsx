import React from 'react'
import { Portal, Select, createListCollection } from "@chakra-ui/react"

const SelectRole = ({setInfo}) => {
  return (
    <>
    <Select.Root 
    collection={roles} 
    size="sm" 
    width="320px" 
    onChange={(e)=>setInfo((prev)=>({...prev, role: e.target.value}))}>
      <Select.HiddenSelect />
      <Select.Label>Select roles</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select Role" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content className='select'>
            {roles.items.map((role) => (
              <Select.Item item={role} key={role.value}>
                {role.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
    </>
  )
}

export default SelectRole

const roles = createListCollection({
    items: [
      { label: "HR", value: "HR" },
      { label: "Developer", value: "DEVELOPER" },
      { label: "Manager", value: "MANAGER" },
      { label: "Intern", value: "INTERN" },
    ],
  })