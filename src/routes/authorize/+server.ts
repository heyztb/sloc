import { redirect, type RequestHandler } from "@sveltejs/kit";
import { gh } from "$lib/server/octokit";
import { getSiteUrl } from "$lib/siteurl";

export const GET: RequestHandler = async ({ cookies, url }) => {
  const state = cookies.get('state')
  if (!state) {
    throw redirect(303, '/')
  }

  cookies.delete('state', {
    path: '/'
  })

  const their_state = url.searchParams.get('state')
  if (state !== their_state) {
    throw redirect(303, '/')
  }

  const code = url.searchParams.get('code')
  if (!code) {
    throw redirect(303, '/')
  }

  const { authentication } = await gh.createToken({
    state,
    code,
  })

  cookies.set('token', authentication.token, {
    path: '/'
  })

  throw redirect(303, '/') 
};
