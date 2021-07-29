import { Account } from '../types';
import { getIdentity } from './identityHelper';

export async function createAccount(accountId: string): Promise<Account> {
  let account = await Account.getByAddress(accountId);
  if (account) return account;

  const identity = await getIdentity(accountId);
  account = Account.create({
    id: accountId,
    address: accountId,
    additional: identity.additional,
    display: identity.display,
    displayParent: identity.displayParent,
    legal: identity.legal,
    web: identity.web,
    riot: identity.riot,
    email: identity.email,
    pgpFingerprint: identity.pgpFingerprint,
    image: identity.image,
    twitter: identity.twitter,
    judgements: identity.judgements
  });

  await account.save();

  return account;
}
