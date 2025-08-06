'use client';

import React, { useState } from 'react';
import { useCart } from '@modules/cart/CartContext';
import styles from './cartPage.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CheckoutModal from './CheckoutModal';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getStepClassName = (stepPath: string) => {
    return pathname === stepPath ? styles.active : styles.inactive;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.progressHeader}>
        <div className={`${styles.step} ${getStepClassName('/cart')}`}>
          <span className={styles.stepName}>КОРЗИНА</span>
        </div>
        <div className={styles.arrow}>→</div>
        <div className={`${styles.step} ${getStepClassName('/checkout')}`}>
          <span className={styles.stepName}>ОФОРМИТЬ ЗАКАЗ</span>
        </div>
        <div className={styles.arrow}>→</div>
        <div
          className={`${styles.step} ${getStepClassName('/order-completed')}`}
        >
          <span className={styles.stepName}>ЗАКАЗ ЗАВЕРШЕН</span>
        </div>
      </div>

      <div className={styles.contentWrapper}>
        {cart.length === 0 ? (
          <p className={styles.emptyCart}>Ваша корзина пуста.</p>
        ) : (
          <>
            <div className={styles.cartContent}>
              {cart.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemInfo}>
                    <span
                      className={
                        item.available
                          ? styles.available
                          : styles.notAvailable
                      }
                    >
                      {item.available ? 'В наличии' : 'Нет в наличии'}
                    </span>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemPrice}>{item.price} $</p>
                  </div>

                  <div className={styles.quantityContainer}>
                    <div className={styles.quantityLabels}>
                      <div className={styles.quantityLabel}>Штук</div>
                      <div className={styles.quantityLabel}>Упаковок</div>
                    </div>
                    <div className={styles.quantityControl}>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className={styles.totalWrapper}>
                    <span className={styles.totalText}>Итог</span>
                    <span className={styles.itemTotal}>
                      {item.price * item.quantity} $
                    </span>
                  </div>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM15.36 14.36L14.36 15.36L12 13L9.64 15.36L8.64 14.36L11 12L8.64 9.64L9.64 8.64L12 11L14.36 8.64L15.36 9.64L13 12L15.36 14.36Z"
                        fill="#888"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.summarySidebar}>
              <div className={styles.summaryHeader}>
                <div className={styles.summaryRowHeader}>
                  <span className={styles.summaryLabel}>Подытог</span>
                  <span className={styles.summaryValue}>{total} $</span>
                </div>
                <div className={styles.summaryRowHeader}>
                  <span className={styles.summaryLabel}>Итого</span>
                  <span className={styles.summaryValueTotal}>{total} $</span>
                </div>
              </div>
              <button className={styles.checkoutButton} onClick={openModal}>
                ОФОРМИТЬ ЗАКАЗ
              </button>
            </div>
          </>
        )}
      </div>

      {isModalOpen && <CheckoutModal onClose={closeModal} cartItems={cart} />}
    </div>
  );
}