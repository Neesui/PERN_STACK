import React from 'react'
import EmployeeTable from './components/ui/EmployeeTable'
import { VStack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { baseUrl } from '../constants/global-variable.js'
const App = () => {
  async function fetchEmployeeDetails(params){
    const res = await fetch(baseUrl);
  }
  const {isPending, isError, data, error} = useQuery({
    queryKey: ['employees_details'],
    queryFn: fetchEmployeeDetails
  })
  return (
    <VStack gap={6} align={'flex-start' }>
      <EmployeeTable />
    </VStack>
  )
}

export default App