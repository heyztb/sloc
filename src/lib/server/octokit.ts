import { GH_CLIENT_ID, GH_CLIENT_SECRET } from "$env/static/private";
import { OAuthApp } from "@octokit/oauth-app";
import { Octokit } from "octokit";

export const gh = new OAuthApp({
	clientId:GH_CLIENT_ID,
	clientSecret: GH_CLIENT_SECRET,
})

export const getUserOctokit = async (token: string) => {
	return new Octokit({
		auth: token
	})
}
