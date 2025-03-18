<script lang="ts">
	import ButtonWallet from './Buttons/ButtonWallet.svelte';
</script>

<header
	class="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm"
>
	<div class="container mx-auto px-4 py-3">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-6">
				<h1 class="text-xl font-bold text-gray-900">Allfeat</h1>
			</div>
			<div class="flex items-center gap-4">
				<ButtonWallet />
			</div>
		</div>
	</div>
</header>

<!-- Spacer to prevent content from going under fixed header -->
<div class="h-[61px]"></div>
