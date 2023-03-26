import { ORIGIN } from "$env/static/private"

export const getSiteUrl = (path: string) => {
	return `${ORIGIN}/${path}`
}