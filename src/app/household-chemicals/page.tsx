'use client'

import ProductCard from '@modules/productCard/ProductCard'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { MultiContainer } from 'src/ui/multiContainer/multiContainer'
import styles from './style.module.scss'

interface Product {
	id: number // Id
	title: string // Title
	image: string // Image (url или путь)
	price: number // Price
	is_available: boolean // Is available
	description: string // Description
}

export default function HouseholdChemicals() {
	const [productsData, setProductsData] = useState<Product[]>([])

	useEffect(() => {
		const getProductsFromServer = async () => {
			try {
				const response = await axios.get(
					'https://grubworm-calm-vaguely.ngrok-free.app/api/household_chemicals/',
					{
						headers: {
							'ngrok-skip-browser-warning': 'true',
						},
					}
				)

				setProductsData(response.data.results)
			} catch (error) {
				console.error('Ошибка получения данных с API:', error)
			}
		}

		getProductsFromServer()
	}, [])

	return (
		<div className={styles.HouseholdChemicals}>
			<MultiContainer>
				<div className={styles.breadcrumbs}>
					<span>
						<Link href={'/'}>Главная</Link>
					</span>
					<svg
						width='62'
						height='12'
						viewBox='0 0 62 12'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M0.666667 6C0.666667 8.94552 3.05448 11.3333 6 11.3333C8.94552 11.3333 11.3333 8.94552 11.3333 6C11.3333 3.05448 8.94552 0.666667 6 0.666667C3.05448 0.666667 0.666667 3.05448 0.666667 6ZM50.6667 6C50.6667 8.94552 53.0545 11.3333 56 11.3333C58.9455 11.3333 61.3333 8.94552 61.3333 6C61.3333 3.05448 58.9455 0.666667 56 0.666667C53.0545 0.666667 50.6667 3.05448 50.6667 6ZM6 6V7L8.08333 7V6V5H6V6ZM12.25 6V7L16.4167 7V6V5L12.25 5V6ZM20.5833 6V7L24.75 7V6V5L20.5833 5V6ZM28.9167 6V7L33.0833 7V6V5L28.9167 5V6ZM37.25 6V7L41.4167 7V6V5L37.25 5V6ZM45.5833 6V7L49.75 7V6V5L45.5833 5V6ZM53.9167 6V7L56 7V6V5L53.9167 5V6Z'
							fill='#4A8DFF'
						/>
					</svg>

					<span>Бытовая химия</span>
				</div>

				{productsData?.length === 0 ? (
					<div className={styles.empty}>
						<h2>Каталог пока пуст</h2>
						<p>Загляните позже — мы скоро добавим новые товары.</p>
					</div>
				) : (
					<div className={styles.productsData}>
						{productsData?.map(product => (
							<ProductCard key={product.id} {...product} />
						))}
					</div>
				)}
			</MultiContainer>
		</div>
	)
}
