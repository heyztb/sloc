import type { LayoutServerLoad } from "./$types";
import { getUserOctokit } from "$lib/server/octokit";

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('token')
	if (!token) {
		return { authed: false }
	}

	const octokit = await getUserOctokit(token)
	const { data: { login, public_repos } } = await octokit.request('GET /user')

	console.log('public repos', public_repos)

	const { data: repos } = await octokit.request('GET /user/repos', {
		visibility: 'public',
		affiliation: 'owner',
	})

	console.log(repos.length)

	let line_count: number = 0
	let success_count: number = 0
	for (const repo of repos) {
		const response = await octokit.rest.repos.getCodeFrequencyStats({
			owner: login,
			repo: repo.name,
		})

		if (response.status !== 200) {
			console.log(`${repo.name} failed`)
			continue
		}

		const { data } = response

		const count = data.reduce((total: any, changes: any) => 
			total + changes[1] + changes[2], 0)

		console.log(repo.name, count)
		line_count += count
		success_count++
	}

	console.log(line_count, success_count)

	return { authed: true, line_count }
}