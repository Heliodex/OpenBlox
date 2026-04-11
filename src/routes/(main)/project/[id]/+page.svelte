<script lang="ts">
	import { getData } from "./project.remote"

	const { project, universe } = await getData()
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

	{#if universe}
		<h2 class="pt-8 pb-4">Roblox data</h2>

		<h3 class="pb-2">Description</h3>
		<p>{universe.description}</p>

		<table class="pt-4 border-separate border-spacing-y-2">
			<tbody>
				<tr>
					<td class="pr-4"><strong>Created at</strong></td>
					<td>{new Date(universe.createTime).toLocaleString()}</td>
				</tr>
				<tr>
					<td class="pr-4"><strong>Updated at</strong></td>
					<td>{new Date(universe.updateTime).toLocaleString()}</td>
				</tr>
				<tr>
					<td class="pr-4"><strong>Platforms</strong></td>
					<td>{universe.platforms.join(", ")}</td>
				</tr>
			</tbody>
		</table>
		
	{/if}
</div>
