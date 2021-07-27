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

    const identity = await api.query.identity.identityOf(address);
    const identityInfo = identity.unwrapOrDefault().info;
    (account.additional = identityInfo.additional.isEmpty
      ? null
      : identityInfo.additional.toHuman().toString()),
      (account.display = identityInfo.display.isEmpty
        ? null
        : identityInfo.display.asRaw.toHuman().toString()),
      (account.legal = identityInfo.legal.isEmpty
        ? null
        : identityInfo.legal.asRaw.toHuman().toString()),
      (account.web = identityInfo.web.isEmpty
        ? null
        : identityInfo.web.asRaw.toHuman().toString()),
      (account.riot = identityInfo.riot.isEmpty
        ? null
        : identityInfo.riot.asRaw.toHuman().toString()),
      (account.email = identityInfo.email.isEmpty
        ? null
        : identityInfo.email.asRaw.toHuman().toString()),
      (account.pgpFingerprint = identityInfo.pgpFingerprint.isEmpty
        ? null
        : identityInfo.pgpFingerprint.unwrap().toString()),
      (account.image = identityInfo.image.isEmpty
        ? null
        : identityInfo.image.asRaw.toHuman().toString()),
      (account.twitter = identityInfo.twitter.isEmpty
        ? null
        : identityInfo.twitter.asRaw.toHuman().toString());

    account.save();
  }
}
