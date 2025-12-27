'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Card, LoadingOverlay, SimpleGrid, Text } from '@mantine/core';
import { productListOptions } from '@/lib/queries/queries';
import { urlFor } from '@/sanity/lib/image';

export default function HomePage() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || undefined;
  const { data, isLoading } = useQuery(productListOptions(search));
  const router = useRouter();

  return (
    <>
      {isLoading && <LoadingOverlay visible />}
      <SimpleGrid cols={{ base: 2, sm: 3, lg: 4 }} spacing="md">
        {data?.map((product) => (
          <Card
            className="productCard"
            key={product._id}
            shadow="sm"
            p="md"
            withBorder
            onClick={() => router.push(`/product/${product._id}`)}
            style={{ cursor: 'pointer' }}
          >
            {product.productImages?.asset && (
              <img
                key={product.productImages?._key}
                src={urlFor(product.productImages?.asset).width(250).url()}
                alt={product.name}
                style={{
                  marginTop: '0.5rem',
                  width: '100%',
                  objectFit: 'contain',
                  height: '350px',
                }}
              />
            )}
            <Text>
              <b>{product.name}</b>
            </Text>
            <Text size="sm" color="dimmed">
              {product.price}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}
