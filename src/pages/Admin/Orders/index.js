import React from 'react'

import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Text } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { fetchOrders } from '../../../api'

function Orders() {

  const { isLoading, isError, data, error } = useQuery(
    "admin:orders",
    fetchOrders
  )

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
            <Td>Full Name</Td>
            <Td>Email</Td>
            <Td>Address</Td>
            <Td>Total Price</Td>
            <Td>İtems</Td>
          </Tr>
        </Thead>
        <Tbody>
          {
            
            data.items.map((item) => (
              <Tr key={item.id}>
                  <Td>{item.fullName}</Td>
                  <Td>{item.email}</Td>
                  <Td>{item.address}</Td>
                  <Td>{item.totalPrice}</Td>
                  <Td>{item.items}</Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>
    </div>
  )
}

export default Orders