<script>
	import { search } from 'svelte-awesome/icons'
	import Icon from 'svelte-awesome'
	import request from './request.ts'

	let username, data, total = {'langs': {}, 'size': 0}

	const handleSubmit = async () => {
		data = await request(username)
		console.log(data)

		data.forEach(i => {
			i.lang.forEach(j => {
				if (j.name in total.langs){
					total.langs[j.name].size += j.size
				} else {
					total.langs[j.name] = {'size': j.size, 'color': j.color}
				}
				total.size += j.size
			})
		})

		console.log(total)
	}
</script>

<main class="ph5 courier">
	<span class="f1 mt4 db">RePowo</span>
	{#if data}
	<div class="mv3">
		<div class="mt2 w-100 pa4 bg-light-gray br3 shadow-4">
			<a class="f3 db ttu tracked link black" href="https://github.com/{username}">{username} stats</a>
			<div class="mv2 db h1 bg-moon-gray flex">
				{#each Object.entries(total.langs) as [lang, info]}
				<div style="flex-grow: {info.size}; background: {info.color};"></div>
				{/each}
			</div>
			{#each Object.entries(total.langs) as [lang, info]}
			<div>
				<span class="h1 w1 ttu consolas" style="background: {info.color};">{info.color}</span>
				<span>{lang} - {info.size} [{Math.round(info.size / total.size * 10000) / 100}%]</span>
			</div>
			{/each}
			<div>
				<span class="h1 w1 ttu consolas bg-moon-gray">#cccccc</span>
				<span>Total - {total.size}</span>
			</div>
		</div>
		{#each data as repo}
		<div class="mt2 w-100 pa4 bg-light-gray br3 shadow-4">
			<a class="f3 db ttu tracked link black" href="https://github.com/{username}/{repo.name}">{repo.name}</a>
			<div class="mv2 db h1 bg-moon-gray flex">
				{#each repo.lang as lang}
				<div style="flex-grow: {lang.size}; background: {lang.color};"></div>
				{/each}
			</div>
			{#each repo.lang as lang}
			<div>
				<span class="h1 w1 ttu consolas" style="background: {lang.color};">{lang.color}</span>
				<span>{lang.name} - {lang.size}</span>
			</div>
			{/each}
		</div>
		{/each}
	</div>
	{:else}
	<form class="flex" on:submit|preventDefault={handleSubmit}>
		<input class="f3 code ba b--black" bind:value={username} type="text" placeholder="username" required>
		<button class="pointer dim f3 code bg-transparent ba">
			<Icon data={search}/>
		</button>
	</form>
	{/if}
</main>

<style>
	form > button { border-left: 0; }
</style>	