import { Button, Box, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Image {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface GetImagesResponse {
  after?: string;
  data: Image[];
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = null }): Promise<GetImagesResponse> => {
      const response = await api.get('/api/images', {
        params: {
          after: pageParam,
        },
      });

      return response.data;
    },
    {
      getNextPageParam: lastPage => {
        return lastPage?.after ?? null;
      },
    }
  );

  const formattedData = useMemo(() => {
    return data?.pages?.map(page => page.data).flat();
  }, [data]);

  if (isLoading && !isError) {
    return <Loading />;
  }

  if (isLoading && isError) {
    return <Error />;
  }

  if (!isLoading && isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button mt="12" onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
