import { redirect, type RequestHandler } from "@sveltejs/kit";
import { gh } from '$lib/server/octokit'

export const GET: RequestHandler = async ({cookies, fetch}) => {
  const token = cookies.get('token')
  if (!token) {
    throw redirect(303, '/login')
  }

  await gh.deleteToken({
    token
  })

  cookies.delete('token', {
    path: '/'
  })

  throw redirect(303, '/')
};
