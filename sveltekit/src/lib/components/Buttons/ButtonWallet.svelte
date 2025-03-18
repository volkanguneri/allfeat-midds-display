<script lang="ts">
	let {
		size = 'small',
		color = 'plain'
	}: {
		size?: 'small' | 'big';
		color?: 'plain' | 'transparent';
	} = $props();

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

<button type="button" class={buttonClasses}>
	<svg
		class="mr-2.5 h-[35%] w-auto"
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
	>
		<path
			fill="currentColor"
			d="M0 3.6c0-.99.81-1.8 1.8-1.8h13.5a.9.9 0 0 1 .9.9v.9H1.8v.9h15.3a.9.9 0 0 1 .9.9v9a1.8 1.8 0 0 1-1.8 1.8H1.8A1.8 1.8 0 0 1 0 14.4V3.6Zm14.85 8.1a1.35 1.35 0 1 0 0-2.7 1.35 1.35 0 0 0 0 2.7Z"
		/>
	</svg>
	<span class="transition-transform duration-[50ms] ease-out">Connect wallet</span>
</button>
