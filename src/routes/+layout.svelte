<script lang="ts">
	import "../app.css"

	let { children } = $props()
</script>

<svelte:head>
	<title>OpenBlox</title>
	<meta
		name="description"
		content="OpenBlox: Learn to build Roblox games, win prizes" />
</svelte:head>

{@render children()}
