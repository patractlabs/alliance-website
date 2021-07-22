import { SubstrateEvent } from '@subql/types';
import { Member, Account } from '../types';

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  logger.info(`hhhh`);
  logger.info(Object.keys(event));

  let account = Account.create({
    id: '5ggqweqweqw',
    address: '5ggqweqweqw'
  });

  await account.save();

  let member = Member.create({
    id: '5ggqweqweqw',
    accountId: '5ggqweqweqw',
    locked: 1000
  });

  await member.save();
}
