<script lang="ts">
	import { walletState } from '$utils/walletState.svelte';

	let {
		size = 'small',
		color = 'plain'
	}: {
		size?: 'small' | 'big';
		color?: 'plain' | 'transparent';
	} = $props();
	const address = $derived(walletState.accounts?.[0]?.address);

	$inspect('address', address);
	const buttonClasses = $derived(
		[
			// Base styles
			'inline-flex items-center font-bold font-inherit p-0 rounded-full border-none cursor-pointer transition-all duration-300',
			// Size variants
			size === 'small' && 'h-9 px-4 text-base',
			size === 'big' && 'h-14 px-6 text-xl shadow-md hover:shadow-lg',
			// Color variants
			color === 'plain' && 'bg-blue-500 text-white hover:bg-blue-600',
			color === 'transparent' && 'bg-blue-100 text-blue-900 hover:bg-blue-200',
			// Interactive effects
			'active:scale-[0.98]'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<button
	type="button"
	class={buttonClasses}
	onclick={walletState.connected
		? null
		: async () => {
				await walletState.init();
			}}
>
	<span class="transition-transform duration-[50ms] ease-out"
		>{walletState.accounts?.[0]
			? walletState.shortenAddress(walletState.accounts[0])
			: 'Connect wallet'}</span
	>
</button>
