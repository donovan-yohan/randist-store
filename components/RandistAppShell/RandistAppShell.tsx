'use client'

import { useCart } from "@/lib/contexts/CartContext"
import { ActionIcon, AppShell, Drawer, Group, Indicator, ScrollArea, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconArrowRight, IconSearch, IconShoppingCart } from "@tabler/icons-react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { PropsWithChildren, useEffect, useRef, useState } from "react"
import Cart from "../Cart/Cart"
import { RandistSvg } from "../Svgs/RandistSvg"
import classes from './RandistAppShell.module.css'

export const RandistAppShell: React.FC<PropsWithChildren> = ({ children }) => {
  const [cartDrawerOpened, { open: openCartDrawer, close: closeCartDrawer }] = useDisclosure(false)

  const { cart } = useCart()
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0)

  const cartCountRef = useRef<HTMLDivElement>(null)
  const cartIconRef = useRef<HTMLButtonElement>(null)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') ?? ''

  const [search, setSearch] = useState(initialSearch)


  useEffect(() => {
    if (totalQuantity === 0) { return }

    cartCountRef.current?.classList.add(classes.bounce)
    cartIconRef?.current?.classList.add(classes.shake)

    const bounceTimeout = setTimeout(() => {
      cartCountRef.current?.classList.remove(classes.bounce)
    }, 200)

    const shakeTimeout = setTimeout(() => {
      cartIconRef?.current?.classList.remove(classes.shake)
    }, 500)

    return () => {
      clearTimeout(bounceTimeout)
      clearTimeout(shakeTimeout)
    }
  }, [totalQuantity])

  useEffect(() => {
    closeCartDrawer()
  }, [pathname])

  return (
    <AppShell
      header={{ height: 60 }}
      // navbar={{
      //   width: 300,
      //   breakpoint: 'sm',
      // }}
      padding="lg"
    >
      <AppShell.Header px='sm'>
        <Group justify="space-between" h="100%" px='xl'>
          <Group>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <RandistSvg style={{ marginBottom: '4px' }} />
            </Link>
            <TextInput
              placeholder="Search products..."
              leftSection={<IconSearch size={16} />}
              style={{ width: 300 }}
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  router.push(`/?search=${search}`)
                }
              }}
              rightSection={
                <ActionIcon
                  size={32}
                  variant="subtle"
                  onClick={() => {
                    router.push(`/?search=${search}`)
                  }}
                >
                  <IconArrowRight size={18} stroke={1.5} />
                </ActionIcon>
              }
            />
          </Group>

          <Indicator label={totalQuantity} size={16} ref={cartCountRef} className={classes.cartCount}>
            <ActionIcon
              ref={cartIconRef}
              variant="subtle"
              onClick={openCartDrawer}
              aria-label="Open cart"
            >
              <IconShoppingCart size={20} />
            </ActionIcon>
          </Indicator>
        </Group>
      </AppShell.Header>

      {/* <AppShell.Navbar p="md">

      </AppShell.Navbar> */}

      <AppShell.Main mx='xl'>
        {children}
      </AppShell.Main>

      <Drawer
        opened={cartDrawerOpened}
        onClose={closeCartDrawer}
        scrollAreaComponent={ScrollArea.Autosize}
        title={`Your Cart (${totalQuantity})`}
        position="right"
        padding="md"
        size="md"
      >
        <Cart />
      </Drawer>
    </AppShell >
  )
}
