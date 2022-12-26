<script>
	import { Card, Button, Badge } from 'flowbite-svelte';
</script>

<div class="mx-auto max-w-2xl px-2 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-4">
	<h2 class="text-4xl font-bold tracking-tight text-gray-900 pb-10">Items on clearance</h2>

  <div class="flex flex-wrap justify-start w-full gap-5">
	<Card padding="none" class='w-80'>
		<div
			class="h:60 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-60"
		>
			<img
				src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
				alt="Front of men&#039;s Basic Tee in black."
				class="h-full w-full object-cover object-center lg:h-full lg:w-full"
			/>
		</div>
		<div class="px-5 pb-5">
			<a href="/">
				<h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
					Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
				</h5>
        Seller : <Badge slot="text">StacksKb</Badge>
			</a>

			<div class="flex justify-between items-center">
				<span class="text-3xl font-bold text-gray-900 dark:text-white">$543</span>
				<Button outline gradient color="cyanToBlue" href="/" size="sm">Buy now</Button>
			</div>
		</div>
	</Card>
  
</div>
</div>
