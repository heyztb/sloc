<script>
	import { Heading, P, Span, Button } from 'flowbite-svelte';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>SLOC</title>
	<meta name="description" content="Web utility for GitHub users to count the lines of code in their public repositories" />
</svelte:head>

<div class="flex flex-col justify-center items-center w-full h-screen">
	<div class="p-6">
		<Heading tag="h1">SLOC</Heading>
		<P>Web util for GitHub users to count the lines of code in your public repos</P>
		{#if !$page.data.authed}
			<Button color="light" href="/login">Login with GitHub</Button>
		{:else}
			<Button color="light" href="/logout">Logout</Button>
			<div>
				<P>Your total line count is <Span>{$page.data.line_count}</Span></P>
			</div>
		{/if}
	</div>
</div>
