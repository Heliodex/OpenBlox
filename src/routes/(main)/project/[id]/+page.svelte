<script lang="ts">
	import { getData } from "./project.remote"

	const project = await getData()
</script>

<div id="main" class="mx-auto max-w-200 px-4 py-8">
	<h1 class="text-2xl pb-4">Project &ndash; {project.name}</h1>

	<img
		src="/project/{project.id}/image"
		alt="{project.name} image"
		class="w-full rounded-2xl aspect-video object-cover" />

	<p class="text-lg pt-4">
		{project.description}
	</p>
</div>
