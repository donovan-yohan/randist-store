'use client'

import { ColourOption } from '@/components/ColourOption/ColourOption'
import { RandistPortableText } from '@/components/RandistPortableText/RandistPortableText'
import { useCart } from '@/lib/contexts/CartContext'
import { productDetailOptions } from '@/lib/queries/queries'
import { urlFor } from '@/sanity/lib/image'
import { Badge, Button, Center, Group, Image, Loader, Modal, NumberFormatter, NumberInput, ScrollArea, Stack, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function ProductDetailPage() {
    const { id } = useParams()
    const { data: product, isLoading } = useQuery(productDetailOptions(id as string))

    const [activeIndex, setActiveIndex] = useState(0)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [fullImageSrc, setFullImageSrc] = useState<string>('')
    const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false)
    const imageRefs = useRef<(HTMLDivElement)[]>([])

    const [selectedOption, setSelectedOption] = useState<string | undefined>()
    const [selectedSize, setSelectedSize] = useState<string | undefined>()
    const [quantity, setQuantity] = useState(1)

    const { addToCart } = useCart()

    const openModalLoadImage = () => {
        openModal()
    }

    const scrollToImage = useCallback((index: number) => {
        if (index < 0 || index >= imageRefs.current.length) { return }

        const target = imageRefs.current[index]
        if (target && scrollRef.current) {
            scrollRef.current.scrollTo({ left: target.offsetLeft, behavior: 'smooth' })
        }
        setActiveIndex(index)
    }, [imageRefs, scrollRef])

    useEffect(() => {
        const el = scrollRef.current
        if (!el) { return }

        const handleScroll = () => {
            const scrollLeft = el.scrollLeft
            const closestIndex = imageRefs.current.reduce((closestIdx, img, idx) => {
                const distance = Math.abs(img.offsetLeft - scrollLeft)
                const closestDistance = Math.abs(imageRefs.current[closestIdx]?.offsetLeft - scrollLeft)
                return distance < closestDistance ? idx : closestIdx
            }, 0)
            setActiveIndex(closestIndex)
        }

        el.addEventListener('scroll', handleScroll, { passive: true })
        return () => el.removeEventListener('scroll', handleScroll)
    }, [scrollRef, imageRefs])

    if (isLoading) {
        return (
            <Center py="xl">
                <Loader />
            </Center>
        )
    }

    if (!product) {
        return <Text>Product not found.</Text>
    }

    const allImages = product.options?.flatMap(option => option.images?.filter(img => img.asset)?.map(img => ({ ...img, optionId: option._key })) || []) || []

    return (
        <>
            <Group gap='xl' align='flex-start' mt='xl'>
                {allImages.length > 0 && (
                    <Stack style={{ maxWidth: '50%', minWidth: '50%' }}>
                        <div style={{ position: 'relative' }}>
                            <ScrollArea type="scroll" scrollbars="x" viewportRef={scrollRef} style={{ overflow: 'hidden' }}>
                                <div style={{ display: 'flex', gap: '1rem', scrollSnapType: 'x mandatory' }}>
                                    {allImages.map((image, index) => (
                                        <div
                                            key={image._key}
                                            ref={(el) => {
                                                if (el) {
                                                    imageRefs.current[index] = el
                                                }
                                            }}
                                            style={{ minWidth: '100%', scrollSnapAlign: 'center' }}
                                        >
                                            <Image
                                                src={urlFor(image.asset!).width(500).url()}
                                                alt=""
                                                onClick={() => {
                                                    setFullImageSrc(urlFor(image.asset!).url())
                                                    openModalLoadImage()
                                                }}
                                                style={{ width: '100%', cursor: 'pointer' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                            {activeIndex > 0 && (
                                <Button
                                    variant='transparent'
                                    color='dark'
                                    style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
                                    onClick={() => scrollToImage(Math.max(activeIndex - 1, 0))}
                                >
                                    ◀
                                </Button>
                            )}
                            {activeIndex < allImages.length - 1 && (
                                <Button
                                    variant='transparent'
                                    color='dark'
                                    style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
                                    onClick={() => scrollToImage(Math.min(activeIndex + 1, allImages.length - 1))}
                                >
                                    ▶
                                </Button>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                            {allImages.map((image, index) => (
                                <Image
                                    key={`${image._key}-thumb`}
                                    src={urlFor(image.asset!).width(100).url()}
                                    alt=""
                                    onClick={() => {
                                        const target = imageRefs.current[index]
                                        if (target && scrollRef.current) {
                                            scrollRef.current.scrollTo({ left: target.offsetLeft, behavior: 'smooth' })
                                        }
                                        setActiveIndex(index)
                                    }}
                                    style={{
                                        width: 80,
                                        height: 80,
                                        objectFit: 'cover',
                                        border: index === activeIndex ? '2px solid #000' : '1px solid #ccc',
                                        cursor: 'pointer'
                                    }}
                                />
                            ))}
                        </div>
                    </Stack>
                )}
                <Stack>
                    <Title order={2}>{product.name}</Title>
                    <Text size="lg"><b><NumberFormatter prefix='$' value={product.price} /></b></Text>

                    {product.description && (<RandistPortableText value={product.description} />)}

                    {product.options?.length && (
                        <Stack>
                            <Text span fw={500}>Available Options: {selectedOption && <Text span c="dimmed" size='sm'>Current: {product.options.find(opt => opt._key === selectedOption)?.name}</Text>}</Text>
                            <Group>
                                {product.options.map(option => (
                                    <ColourOption
                                        key={option._key}
                                        onClick={() => {
                                            setSelectedOption(option._key)
                                            scrollToImage(allImages.findIndex(img => img._key === option.images?.[0]?._key))
                                        }}
                                        style={{ cursor: 'pointer' }}
                                        name={option.name!}
                                        colourOption={option.colour}
                                        selected={selectedOption === option._key}
                                    />
                                ))}
                            </Group>
                        </Stack>
                    )}

                    {product.sizes?.length && (
                        <Stack>
                            <Text span fw={500}>Available Sizes: {selectedSize && <Text span c="dimmed" size='sm'>Current: {selectedSize}</Text>}</Text>
                            <Group>
                                {product.sizes.map(size => (
                                    <Badge
                                        key={size}
                                        variant={selectedSize === size ? 'filled' : 'outline'}
                                        onClick={() => setSelectedSize(size)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {size}
                                    </Badge>
                                ))}
                            </Group>
                        </Stack>
                    )}

                    <Group align='flex-end' >
                        <NumberInput
                            style={{ width: '75px' }}
                            label="Quantity"
                            min={1}
                            value={quantity}
                            onChange={(val) => setQuantity(parseInt(`${val}`, 10))}
                            clampBehavior="strict"
                        />
                        <Button mt="md" disabled={!selectedOption || !selectedSize} onClick={() => {
                            addToCart({
                                productId: product._id,
                                optionId: selectedOption!,
                                name: product.name,
                                imageUrl: urlFor(allImages.find((img) => img.optionId === selectedOption!)!.asset!).width(100).url(),
                                price: product.price!,
                                option: product.options?.find((opt) => opt._key === selectedOption)?.name ?? selectedOption!,
                                size: selectedSize!,
                                quantity,
                            })
                        }}>
                            Add to Cart
                        </Button>
                    </Group>
                </Stack>

            </Group>

            <Modal
                opened={modalOpened}
                onClose={closeModal}
                size="auto"
                centered
            >
                <Center style={{ minWidth: '50vw', minHeight: '50vh' }}>
                    <Loader style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                    <Image
                        src={fullImageSrc}
                        alt=""
                        style={{ maxHeight: '80vh', maxWidth: '90vw', zIndex: 1 }}
                        loading='lazy'
                    />
                </Center>
            </Modal>
        </>
    )
}