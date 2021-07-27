import { Account } from '../types';

export async function createAccount(accountId: string): Promise<Account> {
  let account = await Account.getByAddress(accountId);
  if (account) return account;

  const identity = await api.query.identity.identityOf(accountId);
  const identityInfo = identity.unwrapOrDefault().info;
  account = Account.create({
    id: accountId,
    address: accountId,
    additional: identityInfo.additional.isEmpty
      ? null
      : identityInfo.additional.toHuman(),
    display: identityInfo.display.isEmpty
      ? null
      : identityInfo.display.asRaw.toHuman(),
    legal: identityInfo.legal.isEmpty
      ? null
      : identityInfo.legal.asRaw.toHuman(),
    web: identityInfo.web.isEmpty ? null : identityInfo.web.asRaw.toHuman(),
    riot: identityInfo.riot.isEmpty ? null : identityInfo.riot.asRaw.toHuman(),
    email: identityInfo.email.isEmpty
      ? null
      : identityInfo.email.asRaw.toHuman(),
    pgpFingerprint: identityInfo.pgpFingerprint.isEmpty
      ? null
      : identityInfo.pgpFingerprint.unwrap().toString(),
    image: identityInfo.image.isEmpty
      ? null
      : identityInfo.image.asRaw.toHuman(),
    twitter: identityInfo.twitter.isEmpty
      ? null
      : identityInfo.twitter.asRaw.toHuman()
  });

  await account.save();

  return account;
}
