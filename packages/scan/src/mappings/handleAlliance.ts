import type { Bytes, Enum, Vec, Option } from '@polkadot/types';
import type { AccountId, BalanceOf } from '@polkadot/types/interfaces';

import { SubstrateEvent } from '@subql/types';
import { Announcement, Blacklist, Candidate, Rule } from '../types';
import { Member } from '../types';
import { createAccount } from './createAccount';
import { getMotionFromExtrinsic } from './motionHelper';
import { decodeCid, getIpfsContent } from './utils';

export interface BlacklistItem extends Enum {
  readonly isAccountId: boolean;
  readonly asAccountId: AccountId;
  readonly isWebsite: boolean;
  readonly asWebsite: Bytes;
}

export async function handleAlliance(
  method: string,
  event: SubstrateEvent
): Promise<void> {
  const {
    event: { data },
    extrinsic,
    block
  } = event;

  if (method === 'AllyElevated') {
    const motion = getMotionFromExtrinsic(extrinsic);
    if (!motion.isOk) {
      return;
    }

    const address = data[0].toString();
    await createAccount(address);

    const member = await Member.get(address);
    member.elevatedMotionIndex = motion.index;
    member.elevatedTime = block.timestamp;
    member.elevatedBlock = block.block.header.number.toBigInt();
    member.elevatedExtrinsic = extrinsic.idx;
    member.type = 'FELLOW';
    await member.save();
  } else if (method === 'BlacklistAdded') {
    const motion = getMotionFromExtrinsic(extrinsic);
    if (!motion.isOk) {
      return;
    }

    const blacklistItems = data[0] as Vec<BlacklistItem>;
    await Promise.all(
      blacklistItems.map(async (item) => {
        const blacklist = Blacklist.create({
          id: item.isAccountId
            ? item.asAccountId.toString()
            : item.asWebsite.toHuman(),
          accountId: item.isAccountId ? item.asAccountId.toString() : null,
          website: item.isAccountId ? null : item.asWebsite.toHuman(),
          isAccount: item.isAccountId,
          addTime: block.timestamp,
          addBlock: block.block.header.number.toBigInt(),
          addExtrinsic: extrinsic.idx,
          addMotionIndex: motion.index
        });
        if (item.isAccountId) {
          await createAccount(item.asAccountId.toString());
        }
        return blacklist.save();
      })
    );
  } else if (method === 'BlacklistRemoved') {
    const motion = getMotionFromExtrinsic(extrinsic);
    if (!motion.isOk) {
      return;
    }

    const blacklistItems = data[0] as Vec<BlacklistItem>;
    await Promise.all(
      blacklistItems.map(async (item) => {
        const blacklist = await Blacklist.get(
          item.isAccountId
            ? item.asAccountId.toString()
            : (item.asWebsite.toHuman() as string)
        );
        blacklist.removeTime = block.timestamp;
        blacklist.removeBlock = block.block.header.number.toBigInt();
        blacklist.removeExtrinsic = extrinsic.idx;
        blacklist.removeMotionIndex = motion.index;
        return blacklist.save();
      })
    );
  } else if (method === 'CandidateAdded') {
    const address = data[0].toString();
    const nominator = (data[1] as Option<AccountId>).isEmpty
      ? null
      : (data[1] as Option<AccountId>).unwrap().toString();
    const locked = (data[2] as Option<BalanceOf>).isEmpty
      ? null
      : (data[2] as Option<BalanceOf>).unwrap().toBigInt();

    await createAccount(address);

    const candidate = Candidate.create({
      id: address,
      accountId: address,
      nominatorId: nominator,
      locked,
      applyTime: block.timestamp,
      applyBlock: block.block.header.number.toBigInt(),
      applyExtrinsic: extrinsic.idx
    });
    await candidate.save();
  } else if (method === 'CandidateApproved') {
    const motion = getMotionFromExtrinsic(extrinsic);
    if (!motion.isOk) {
      return;
    }

    const address = data[0].toString();
    await createAccount(address);

    const candidate = await Candidate.get(address);
    const member = Member.create({
      id: address,
      accountId: address,
      type: 'ALLY',
      status: 'EXIST',
      joinTime: block.timestamp,
      joinBlock: block.block.header.number.toBigInt(),
      joinExtrinsic: extrinsic.idx,
      joinMotionIndex: motion.index,
      locked: candidate ? candidate.locked : null
    });
    await member.save();
  } else if (method === 'CandidateRejected') {
  } else if (method === 'FoundersInitialized') {
    await Promise.all(
      (data[0] as Vec<AccountId>).map(async (accountId: AccountId) => {
        const address = accountId.toString();
        const joinTime = block.timestamp;

        await createAccount(accountId.toString());

        const member = Member.create({
          id: address,
          accountId: address,
          type: 'FOUNDER',
          status: 'EXIST',
          joinTime,
          joinBlock: block.block.header.number.toBigInt(),
          joinExtrinsic: extrinsic.idx
        });
        return member.save();
      })
    );
  } else if (method === 'MemberKicked') {
    const motion = getMotionFromExtrinsic(extrinsic);
    if (!motion.isOk) {
      return;
    }

    const address = data[0].toString();
    await createAccount(address);

    const member = await Member.get(address);
    member.status = 'KICKED';
    member.kickedTime = block.timestamp;
    member.kickedBlock = block.block.header.number.toBigInt();
    member.kickedExtrinsic = extrinsic.idx;
    member.kickedMotionIndex = motion.index;
    await member.save();
  } else if (method === 'MemberRetired') {
    const address = data[0].toString();
    await createAccount(address);

    const member = await Member.get(address);
    member.status = 'RETIRED';
    member.retiredTime = block.timestamp;
    member.retiredBlock = block.block.header.number.toBigInt();
    member.retiredExtrinsic = extrinsic.idx;
    await member.save();
  } else if (method === 'NewAnnouncement') {
    const motion = getMotionFromExtrinsic(extrinsic);
    if (!motion.isOk) {
      return;
    }

    const cid = decodeCid(data[0].toHex());
    const content = await getIpfsContent(cid);

    const announcement = Announcement.create({
      id: extrinsic.extrinsic.hash.toHex(),
      cid,
      content,
      createTime: block.timestamp,
      createBlock: block.block.header.number.toBigInt(),
      createExtrinsic: extrinsic.idx,
      motionIndex: motion.index
    });
    await announcement.save();
  } else if (method === 'NewRule') {
    const motion = getMotionFromExtrinsic(extrinsic);
    if (!motion.isOk) {
      return;
    }

    const cid = decodeCid(data[0].toHex());
    const content = await getIpfsContent(cid);

    const rule = Rule.create({
      id: extrinsic.extrinsic.hash.toHex(),
      cid,
      content,
      createTime: block.timestamp,
      createBlock: block.block.header.number.toBigInt(),
      createExtrinsic: extrinsic.idx,
      motionIndex: motion.index
    });
    await rule.save();
  }
}
