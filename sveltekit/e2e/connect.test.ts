import { test, expect } from '@playwright/test';

// Add type declarations for injected web3
declare global {
	interface Window {
		injectedWeb3: {
			'polkadot-js': {
				enable: () => Promise<{
					accounts: {
						get: () => Promise<Array<{
							address: string;
							meta: { name: string }
						}>>
					}
				}>;
				version: string;
			}
		}
	}
}

test.describe('Connect Button', () => {
	test.beforeEach(async ({ page }) => {
		// Enable console log in the browser
		page.on('console', (msg) => console.log('BROWSER LOG:', msg.text()));

		// Mock the @polkadot/extension-dapp module
		await page.route('**/@polkadot/extension-dapp', async (route) => {
			console.log('Intercepting @polkadot/extension-dapp request');
			await route.fulfill({
				status: 200,
				contentType: 'application/javascript',
				body: `
					const mockAccount = {
						address: '5Fhn5k33uJeAki4swcqNb1m9dqhFtNkviUCBrtdRCiMvV9dX',
						meta: { name: 'Test Account' }
					};

					export const web3Enable = async () => {
						console.log('Mock web3Enable called');
						return [{ name: 'polkadot-js', version: '0.0.0' }];
					};

					export const web3Accounts = async () => {
						console.log('Mock web3Accounts called');
						return [mockAccount];
					};
				`
			});
		});

		// Add mock injected extension
		await page.addInitScript(() => {
			window.injectedWeb3 = {
				'polkadot-js': {
					enable: async () => {
						console.log('Mock injectedWeb3.enable called');
						return {
							accounts: {
								get: async () => [
									{
										address: '5Fhn5k33uJeAki4swcqNb1m9dqhFtNkviUCBrtdRCiMvV9dX',
										meta: { name: 'Test Account' }
									}
								]
							}
						};
					},
					version: '0.0.0'
				}
			};
			console.log('Injected mock web3 extension');
		});
	});

	test('should display connect wallet button and handle wallet connection', async ({ page }) => {
		// Enable debug logging for the page
		page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
		page.on('pageerror', err => console.error('BROWSER ERROR:', err));
		page.on('requestfailed', req => console.error('FAILED REQUEST:', req.url()));

		console.log('Navigating to homepage...');
		await page.goto('/', { waitUntil: 'networkidle' });

		console.log('Looking for connect button...');
		// Wait for the button to be available in the DOM
		await page.waitForSelector('button:has-text("Connect wallet")', { state: 'visible', timeout: 10000 });
		
		// Now get the button
		const connectButton = page.locator('button:has-text("Connect wallet")');
		await expect(connectButton).toBeVisible();

		// Verify button styling
		await expect(connectButton).toHaveClass(/bg-blue-500/);
		await expect(connectButton).toHaveClass(/text-white/);
		await expect(connectButton).toHaveClass(/rounded-full/);

		console.log('Clicking connect button...');
		// Click the button
		await connectButton.click();

		// Wait for the wallet connection to complete
		console.log('Waiting for wallet connection...');
		await page.waitForFunction(() => {
			const button = document.querySelector('button');
			const text = button?.textContent || '';
			console.log('Current button text:', text);
			return text.includes('5Fhn5') && text.includes('vV9dX');
		}, {}, { timeout: 10000 });

		// Verify the final state
		const address = '5Fhn5k33uJeAki4swcqNb1m9dqhFtNkviUCBrtdRCiMvV9dX';
		const expectedShortAddress = address.substring(0, 5) + '...' + address.substring(address.length - 5);
		console.log('Verifying shortened address:', expectedShortAddress);
		await expect(page.locator(`button:has-text("${expectedShortAddress}")`)).toBeVisible({ timeout: 5000 });
	});
});
