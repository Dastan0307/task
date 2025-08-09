'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './cartPage.module.scss';

interface Product {
  title: string;
  price: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  available: boolean;
}

interface OrderItem {
  id: number;
  count: number;
  product: Product;
  total_price: string;
}

interface OrderData {
  full_name: string;
  address: string;
  phone_number: string;
  email: string;
  country_region: string;
  notes: string;
  items: OrderItem[];
}

interface CheckoutModalProps {
  onClose: () => void;
  cartItems: CartItem[];
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose, cartItems }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    country_region: 'Кыргызстан', // Жаңы талаа
    address: '',
    phone_number: '',
    email: '',
    notes: '', // Жаңы талаа
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const orderData: OrderData = {
      full_name: formData.full_name,
      country_region: formData.country_region,
      address: formData.address,
      phone_number: formData.phone_number,
      email: formData.email,
      notes: formData.notes,
      items: cartItems.map(item => ({
        id: item.id,
        count: item.quantity,
        product: {
          title: item.name,
          price: item.price.toString(),
        },
        total_price: (item.price * item.quantity).toFixed(2),
      })),
    };

    try {
      const response = await fetch('/api/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте еще раз.');
      }

      setIsOrderConfirmed(true);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка.';
      console.error('Ошибка при отправке заказа:', error);
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {isOrderConfirmed ? (
          <div className={styles.confirmationScreen}>
            <h2 className={styles.confirmationTitle}>Спасибо!</h2>
            <p className={styles.confirmationText}>Ваш заказ оформлен.</p>
            <p className={styles.confirmationText}>Скоро наши менеджеры свяжутся с вами!</p>
            <button className={styles.toMainButton} onClick={onClose}>НА ГЛАВНУЮ</button>
          </div>
        ) : (
          <>
            <button className={styles.closeButton} onClick={onClose}>
              &times;
            </button>
            <div className={styles.modalBody}>
              <h2 className={styles.modalTitle}>Адрес доставки и данные получателя</h2>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="full_name">Имя Фамилия</label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="country_region">Страна / Регион</label>
                  <select
                    id="country_region"
                    name="country_region"
                    value={formData.country_region}
                    onChange={handleChange}
                    required
                  >
                    <option value="Кыргызстан">Кыргызстан</option>
                    <option value="Казахстан">Казахстан</option>
                    <option value="Россия">Россия</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="address">Адрес доставки</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone_number">Телефон</label>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">E-mail (необязательно)</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="notes">Примечания к вашему заказу (необязательно)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>
                
                <div className={styles.orderSummaryModal}>
                  <span className={styles.summaryTotalLabel}>Итоговая сумма заказа</span>
                  <span className={styles.summaryTotalValue}>{total.toFixed(2)} $</span>
                </div>

                {submitError && <p className={styles.errorText}>{submitError}</p>}
                
                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? 'Отправка...' : 'ПОДТВЕРДИТЬ ЗАКАЗ'}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;