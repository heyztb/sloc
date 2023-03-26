import { redirect, type RequestHandler } from "@sveltejs/kit";
import { gh } from "$lib/server/octokit";
import { getSiteUrl } from "$lib/siteurl";

export const GET: RequestHandler = async ({ cookies }) => {
  const state = Math.random().toString(16).substring(2, 12)

  const url = gh.getWebFlowAuthorizationUrl({
    scopes: ["read:user, public_repo"],
    state: state,
    redirectUrl: getSiteUrl('authorize')
  })

  console.log(url)

  cookies.set('state', state, {
    path: '/'
  })

  throw redirect(303, url.url) 
};
