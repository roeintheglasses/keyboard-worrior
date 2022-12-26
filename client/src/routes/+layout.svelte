<script>
	import '../app.postcss';

	import Header from './Header.svelte';
	import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from 'flowbite-svelte';
</script>

<div class="app">
	<div class="isolate bg-white">
		<div class="px-6 pt-6 lg:px-8">
			<Header />
		</div>
		<main>
			<slot />
		</main>
	</div>
</div>
<footer class="absolute bottom-0 z-20 w-full text-center p-2">
	<p>Made with ❤️ by roe</p>
</footer>
