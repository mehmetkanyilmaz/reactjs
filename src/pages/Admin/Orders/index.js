import React from 'react'

import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Text } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { fetchOrders } from '../../../api'

function Orders() {

  const { isLoading, isError, data, error } = useQuery(
    "admin:orders",
    fetchOrders
  )
  console.log("data", data)
  if(isLoading) {
    return <div>Loading...</div>
  }

  if(isError) {
    return <div>Error {error.message}</div>
  }

  return (
    <div>
      <Text fontSize="2xl" p={5}>
        Orders
      </Text>

      <Table variant="simple">
        <TableCaption>Table Caption</TableCaption>
        <Thead>
          <Tr>
            <Td>User</Td>
            <Td>Address</Td>
            <Td isNumeric>İtems</Td>
          </Tr>
        </Thead>
        <Tbody>
          {
            
            data.map((item) => (
              <Tr key={item.id}>
                  <Td>{item.user.email}</Td>
                  <Td>{item.address}</Td>
                  <Td isNumeric>{item.items.length}</Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>
    </div>
  )
}

export default Orders