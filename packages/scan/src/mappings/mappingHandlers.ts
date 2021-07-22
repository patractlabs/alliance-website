import { SubstrateEvent } from '@subql/types';
import { Member } from '../types';
import { GenericCidMultihash } from '../CidMultihash';

api.registry.setKnownTypes({
  //@ts-ignore
  CidMultihash: GenericCidMultihash
});

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  console.log(event);

  let record = Member.create({
    id: '5ggqweqweqw',
    accountId: '5ggqweqweqw'
  });

  await record.save();
}
