'use client'

import { useCart } from "@/lib/contexts/CartContext"
import { ActionIcon, AppShell, Drawer, Group, Indicator, ScrollArea, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconSearch, IconShoppingCart } from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PropsWithChildren, useEffect, useRef } from "react"
import Cart from "../Cart/Cart"
import classes from './RandistAppShell.module.css'

export const RandistAppShell: React.FC<PropsWithChildren> = ({ children }) => {
  const [cartDrawerOpened, { open: openCartDrawer, close: closeCartDrawer }] = useDisclosure(false)

  const { cart } = useCart()
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0)

  const pathname = usePathname()

  const cartCountRef = useRef<HTMLDivElement>(null)
  const cartIconRef = useRef<HTMLButtonElement>(null)

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
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between" h="100%" px="24px">
          <Group>
            <Link href="/" style={{ textDecoration: 'none' }}>
              Randist
            </Link>
            <TextInput
              placeholder="Search products..."
              leftSection={<IconSearch size={16} />}
              style={{ width: 300 }}
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
