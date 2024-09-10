import React from 'react'
import Cart from '@/components/Cart'
import Link from 'next/link'

const CartPage = () => {
  return (
    <div>
      <Cart/>
      <Link href={'/products'}>
        Back 
      </Link>
    </div>
  )
}

export default CartPage;
