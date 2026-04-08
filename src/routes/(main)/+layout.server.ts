import { authorise } from "$lib/server/auth"

// Redirect to homepage if user is logged in
export async function load({ locals }) {
	const { user } = await authorise(locals)

	return {
		connectedRoblox: user.robloxData !== undefined,
	}
}
