import { error } from "@sveltejs/kit"
import { find } from "$lib/server/db"

export async function GET({ params }) {
	const { id } = params
	if (!(await find("project", id))) error(404, "Not Found")

	return new Response(Bun.file(`./data/images/${id}.avif`))
}
