import React from 'react'
import { Grid, Box, Flex, Button } from '@chakra-ui/react'
import { useInfiniteQuery } from 'react-query'

import Card from '../../components/Card'

import { fetchProductList } from "../../api"

function Products() {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useInfiniteQuery(
        'items',
        fetchProductList,
        {
            getNextPageParam: (lastPage) => {
                return lastPage.hasNext ? lastPage.index + 1 : undefined;
              }
        }
    );

    if (status === "loading") return 'Loading...'

    if (status === "error") return 'An error has occurred: ' + error.message

    return (
        <div>
            <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                {
                    data.pages.map((group, i) => (
                        <React.Fragment key={i}>
                            {
                                group.items.map((item) => (
                                    <Box w="100%" key={item.id}>
                                        <Card item={item} />
                                    </Box>
                                ))
                            }
                        </React.Fragment>
                    ))
                }
            </Grid>

            <Flex mt="10" justifyContent="center">
                <Button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage} isLoading={isFetchingNextPage}>
                {
                    isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                    ? "Load More"
                    : "Nothing more to load"
                }
                </Button>
            </Flex>
        </div>
    )
}

export default Products