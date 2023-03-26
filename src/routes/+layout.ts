import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ( { data }) => {
	return {
		authed: data.authed,
		line_count: data.line_count
	}
}