import { SubstrateEvent } from '@subql/types';
import { Account } from '../types';
import { getIdentity } from './identityHelper';

export async function handleIdentity(method: string, event: SubstrateEvent) {
  const {
    event: { data }
  } = event;

  if (data[0].toRawType() === 'AccountId') {
    const address: string = data[0].toString();
    const account = await Account.getByAddress(address);
    if (!account) return;

    const identity = await getIdentity(address);
    account.additional = identity.additional;
    account.display = identity.display;
    account.displayParent = identity.displayParent;
    account.legal = identity.legal;
    account.web = identity.web;
    account.riot = identity.riot;
    account.email = identity.email;
    account.pgpFingerprint = identity.pgpFingerprint;
    account.image = identity.image;
    account.twitter = identity.twitter;
    account.judgements = identity.judgements;

    await account.save();
  }
}
