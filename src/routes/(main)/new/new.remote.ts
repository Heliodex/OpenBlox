import { error } from "@sveltejs/kit"
import { type } from "arktype"
import { form } from "$app/server"

const schema = type({
	"image?": "File",
	name: "string",
	description: "string",
	"codeUrl?": "string",
	robloxUrl: "string",
	projectType: "string",
	"declarations?": "string",
	"reviewerNotes?": "string",
})

export const newProjectForm = form(
	schema,
	async ({
		image,
		name,
		description,
		codeUrl,
		robloxUrl,
		projectType,
		declarations,
		reviewerNotes,
	}) => {
		console.log(
			image,
			name,
			description,
			codeUrl,
			robloxUrl,
			projectType,
			declarations,
			reviewerNotes
		)

		error(500, "Not implemented (yet...)")
	}
)
