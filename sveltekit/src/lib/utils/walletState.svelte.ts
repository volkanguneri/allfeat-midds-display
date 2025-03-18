import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import type { InjectedAccountWithMeta, InjectedExtension } from '@polkadot/extension-inject/types';
import { browser } from '$app/environment';
// import type { IRegisterResult, IMidds, MiddsInputs } from '@allfeat/sdk';

class WalletState {
	extensions: InjectedExtension[] | null = $state(null);
	accounts: InjectedAccountWithMeta[] | null = $state(null);
	connected: boolean = $derived(this.accounts !== null && this.accounts?.length > 0);

	public async init() {
		if (!browser) return;
		
		this.extensions = await web3Enable('Allfeat MIDDS Display');
		console.log('this.extensions', this.extensions);
		if (this.extensions.length > 0) {
			this.accounts = await web3Accounts();
		}
	}

	public shortenAddress(account: InjectedAccountWithMeta | undefined): string {
		if (!account) return '';

		const address = account.address;
		return address.substring(0, 5) + '...' + address.substring(address.length - 5);
	}
}

export const walletState = new WalletState();
