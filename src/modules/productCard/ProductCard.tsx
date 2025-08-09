// 'use client'

// import React from 'react'
// import Link from 'next/link'
// import styles from './style.module.scss'

// interface Props {
// 	id: string | number
// 	image: string
// 	name: string
// 	description: string
// 	price: number
// 	available: boolean
// }

// export default function ProductCard({
// 	id,
// 	image,
// 	name,
// 	description,
// 	price,
// 	available,
// }: Props) {
// 	return (
// 		<Link
// 			href={{
// 				pathname: `/household-chemicals/${id}`,
// 				query: {
// 					name,
// 					price: price.toString(),
// 					image,
// 					description: description,
// 				},
// 			}}
// 		>
// 			<div className={styles.card}>
// 				<img src={image} alt={name} className={styles.image} />
// 				<h3 className={styles.name}>{name}</h3>
// 				<h4 className={styles.description}>{description}</h4>
// 				<span className={available ? styles.available : styles.notAvailable}>
// 					{available ? 'В наличии' : 'Нет в наличии'}
// 				</span>
// 				<p className={styles.price}>{price} $</p>
// 				<button className={styles.btn}>В корзину</button>
// 			</div>
// 		</Link>
// 	)
// }


'use client'

import { addCartItem } from '@utils/cartApi'
import Link from 'next/link'
import styles from './style.module.scss'
import { useCart } from '../cart/CartContext'

interface Props {
    id: string | number
    image: string
    name: string
    description: string
    price: number
    available: boolean
}

export default function ProductCard({
    id,
    image,
    name,
    description,
    price,
    available,
}: Props) {
	const handleAddToCart = async () => {
		try {
			await addCartItem(id, 1)
			alert('Товар добавлен в корзину')
		} catch (error) {
			console.error('Ошибка при добавлении товара:', error)
			alert('Ошибка при добавлении товара')
		}
	}

	return (
		<div className={styles.card}>
			<Link
				href={{
					pathname: `/household-chemicals/${id}`,
					query: { name, price: price.toString(), image, description },
				}}
			>
				<img src={image} alt={name} className={styles.image} />
			</Link>

			<h3 className={styles.name}>{name}</h3>
			<h4 className={styles.description}>{description}</h4>

			<span className={available ? styles.available : styles.notAvailable}>
				{available ? 'В наличии' : 'Нет в наличии'}
			</span>

			<p className={styles.price}>{price} $</p>

			<button
				type="button"
				className={styles.btn}
				onClick={handleAddToCart}
			>
				В корзину
			</button>
		</div>
	)
}
