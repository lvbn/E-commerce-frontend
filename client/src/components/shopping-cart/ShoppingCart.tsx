import styles from './ShoppingCart.module.css'

import { useCartSlice } from '../../zustand/ShoppingCartSlice'
import { CartItemType } from '../../models/models'
import CartItem from '../cart-item/CartItem'

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, scale: 0.99 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0, 0.71, 0.2, 1.01],
      delayChildren: 0.1,
      staggerChildren: 0.07
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function ShoppingCart() {
  const cartItems = useCartSlice((state) => state.cartItems)
  const isOpen = useCartSlice((state) => state.isOpen)
  const closeCart = useCartSlice((state) => state.closeCart)

  // // URL query and fetch the DB
  // const [products, setProducts] = useState<Product[]>([])

  // useEffect(() => {

  //   const fectchProductsBySellerId = async () => {
  //     const res = await getProductsBySellerId({sellerId: '646d3615ee38ef18f3490506'})
  //     // console.log('My Products Screen: ', res)
  //     if (res !== undefined) {
  //       setProducts(res)
  //     }
  //   }

  //   fectchProductsBySellerId()
  // }, [])

  return (
    <>
      {isOpen &&
        <motion.div
          className={`${styles.container} ${container}`}
          variants={container}
          initial="hidden"
          animate="visible"
        >

          <div className={styles.cartHeader}>
            <h1>Cart</h1>
            <motion.h1
              className={styles.closeCart}
              onClick={() => { closeCart() }}
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{
                scale: 0.8,
                rotate: -90,
                borderRadius: "100%"
              }}
            >+</motion.h1>
          </div>

          <motion.ul
            className={`${container}`}
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {cartItems.map((cartItem: CartItemType) => (
              <motion.li key={cartItem._id} variants={item}>
                <CartItem cartItem={cartItem} />
              </motion.li>
            ))}
          </motion.ul>

          <div className={styles.cartFooter}>
            <div className={styles.total}>
              <h3>Total</h3>
              <h3
                className={styles.totalValue}
              >
                {cartItems.reduce((total, cartItem) => {
                  return total + (cartItem.price * cartItem.quantity)
                }, 0)}
              </h3>
            </div>

            <div className={styles.checkout}>
              <h3>Checkout</h3>
            </div>
          </div>

        </motion.div>
      }
    </>
  )
}
