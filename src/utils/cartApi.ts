const BASE_URL = 'https://grubworm-calm-vaguely.ngrok-free.app/api'

const defaultHeaders = {
	'Content-Type': 'application/json',
	'ngrok-skip-browser-warning': 'true',
}


export const getCart = async () => {
	const res = await fetch(`${BASE_URL}/cart/`, {
		method: 'GET',
		headers: defaultHeaders,
		credentials: 'include',
	})

	if (!res.ok) {
		throw new Error(`Ошибка при получении корзины: ${res.status}`)
	}

	return res.json()
}

export const addCartItem = async (productId: number, count: number = 1) => {
	console.log({ productId, count })

	const res = await fetch(`${BASE_URL}/cart/add/`, {
		method: 'POST',
		headers: defaultHeaders,
		credentials: 'include',
		body: JSON.stringify({
			count,
			product: productId,
		}),
	})

	if (!res.ok) {
		throw new Error(`Ошибка при добавлении в корзину: ${res.status}`)
	}

	return res.json()
}

export const increaseCartItem = async (id: number) => {
	const res = await fetch(`${BASE_URL}/cart/increase/${id}/`, {
		method: 'PATCH',
		headers: defaultHeaders,
		credentials: 'include',
	})

	if (!res.ok) {
		throw new Error(`Ошибка при увеличении товара: ${res.status}`)
	}

	return res.json()
}

export const decreaseCartItem = async (id: number) => {
	const res = await fetch(`${BASE_URL}/cart/decrease/${id}/`, {
		method: 'PATCH',
		headers: defaultHeaders,
		credentials: 'include',
	})

	if (!res.ok) {
		throw new Error(`Ошибка при уменьшении товара: ${res.status}`)
	}

	return res.json()
}

export const removeCartItem = async (cartItemId: number) => {
	const res = await fetch(`${BASE_URL}/cart/remove/${cartItemId}/`, {
		method: 'DELETE',
		credentials: 'include',
	})

	if (!res.ok) {
		const errorData = await res.json().catch(() => ({}))
		throw new Error(
			errorData.detail || `Ошибка при удалении товара: ${res.status}`
		)
	}

	if (res.status === 204) {
		return null
	}

	return await res.json().catch(() => null)
}

