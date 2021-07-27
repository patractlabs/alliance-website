import { SubstrateEvent } from '@subql/types';
import { Account } from '../types';

export async function handleIdentity(method: string, event: SubstrateEvent) {
  const {
    event: { data }
  } = event;

  if (data[0].toRawType() === 'AccountId') {
    const address: string = data[0].toString();
    const account = await Account.getByAddress(address);
    if (!account) return;

    const identity = await api.derive.accounts.identity(address);
    account.display = identity.display || identity.displayParent;
    account.legal = identity.legal;
    account.web = identity.web;
    account.riot = identity.riot;
    account.email = identity.email;
    account.pgpFingerprint = identity.pgp;
    account.image = identity.image;
    account.twitter = identity.twitter;

    account.save();
  }
}
