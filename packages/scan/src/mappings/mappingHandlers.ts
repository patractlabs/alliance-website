import { SubstrateEvent } from '@subql/types';
import { handleAlliance } from './handleAlliance';
import { handleAllianceMotion } from './handleAllianceMotion';

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  const {
    event: { method, section},
  } = event;
  if (section === 'alliance') {
    handleAlliance(method, event)
    // let account = Account.create({
    //   id: '5ggqweqweqw',
    //   address: '5ggqweqweqw'
    // });

    // await account.save();

    // let member = Member.create({
    //   id: '5ggqweqweqw',
    //   accountId: '5ggqweqweqw',
    //   locked: 1000
    // });

    // await member.save();
  }

  if (section === 'allianceMotion') {
    handleAllianceMotion(method, event)
  }
}
