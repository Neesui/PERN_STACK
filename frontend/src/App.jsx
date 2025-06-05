import React from 'react'
import EmployeeTable from './components/ui/EmployeeTable'
import { VStack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { baseUrl } from '../constants/global-variable.js'
import InputUser from './components/ui/InputUser.jsx'
import { Button, Dialog} from '@chakra-ui/react'


const App = () => {
  async function getAllUsers() {
    const res = await fetch(baseUrl);
    const data = await res.json();
    if (!res.ok) {  // Changed from res.ok to !res.ok
      throw new Error(data.message || 'Failed to fetch data');
    }
    return data;
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['User'],
    queryFn: getAllUsers
  })

  if (isPending) {
    return "Loading...";
  }

  if (isError) {
    return error.message;
  }

  // console.log(data)

  return (
    <VStack gap={6} align={'flex-start'}>
      <InputUser>
      <Dialog.Trigger asChild>
        <Button variant="outline">Add User </Button>
      </Dialog.Trigger>
      </InputUser>
      <EmployeeTable data={data?.data} />  {/* Pass the data prop */}
    </VStack>
  )
}

export default App