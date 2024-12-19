import { useMemo } from 'react'

import { useQuery, useMutation, useQueryClient } from "react-query"
import { fetchProductList, deleteProduct } from "../../../api"

import { Link } from 'react-router-dom'
import { Flex, Text } from "@chakra-ui/react"
import { Table, Popconfirm, Button, message } from "antd"

function Products() {

  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery("admin:products", fetchProductList)

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
    onError: (e) => { message.error({
              content: e.response?.data.Detail,
              key:"product_delete",
              duration:2
    })}
  });

  const colums = useMemo(() => {
    return [
      {
        title:"Title",
        dataIndex:"title",
        key:"title"
      },
      {
        title:"Price",
        dataIndex:"price",
        key:"price"
      },
      {
        title:"Stock",
        dataIndex:"stock",
        key:"stock"
      },
      {
        title:"Action",
        dataIndex:"action",
        render: (text, record) => (
          <>
            <Link to={`${record.id}`}>Edit</Link>
            <Popconfirm 
                title="Are you sure?" 
                onConfirm={() => { 
                  deleteMutation.mutate(record.id, { 
                    onSuccess: () =>{ 
                      console.log("success")
                    } 
                  }) 
                }} 
                okText="Yes" 
                cancelText="No" 
                placement="left">
              <a href="#" style={{marginLeft:10}}>Delete</a>
            </Popconfirm>
          </>
        )
      }
    ]
  }, [])

  if(isLoading) {
    return <div>Loading</div>
  }

  if(isError) {
    return <div>Error {error.message}</div>
  }

  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" p="5">
          Products
        </Text>

        <Link to="/admin/products/new">
          <Button>New</Button>
        </Link>
      </Flex>

      <Table dataSource={data.items} columns={colums} rowKey="id"></Table>
    </div>
  )
}

export default Products