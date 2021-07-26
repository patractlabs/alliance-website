import type { Bytes, Enum, Vec, Option } from '@polkadot/types';
import type {
  DispatchResult,
  AccountId,
  Hash,
  BalanceOf
} from '@polkadot/types/interfaces';

import { SubstrateEvent } from '@subql/types';
import { Blacklist, Candidate } from '../types';
import { Member } from '../types';

/** @name BlacklistItem */
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
    event: { data, index },
    extrinsic,
    block
  } = event;

  if (method === 'AllyElevated') {
    const motionIndex =
      extrinsic.events.findIndex((event) => event.event.index.eq(index)) + 1;
    const motionHash = extrinsic.events[motionIndex].event.data[0] as Hash;
    const motionResult = extrinsic.events[motionIndex].event
      .data[1] as DispatchResult;
    logger.info(motionResult.isOk);
    if (!motionResult.isOk) {
      return;
    }

    const address = data[0].toString();

    logger.info(motionHash.toHex());
    const member = await Member.get(address);
    member.elevatedMotionHash = motionHash.toHex();
    member.elevatedTime = block.timestamp;
    member.type = 'FELLOW';
    await member.save().catch((error) => console.error(error.toString()));
  } else if (method === 'BlacklistAdded') {
    const motionIndex =
      extrinsic.events.findIndex((event) => event.event.index.eq(index)) + 1;
    const motionHash = extrinsic.events[motionIndex].event.data[0] as Hash;
    const motionResult = extrinsic.events[motionIndex].event
      .data[1] as DispatchResult;
    if (!motionResult.isOk) {
      return;
    }

    const blacklistItems = data[0] as Vec<BlacklistItem>;
    await Promise.all(
      blacklistItems.map((item) => {
        const blacklist = Blacklist.create({
          id: item.hash.toHex(),
          value: item.isAccountId
            ? item.asAccountId.toString()
            : item.asWebsite.toString(),
          isAccount: item.isAccountId,
          addTime: block.timestamp,
          addMotionHash: motionHash.toHex()
        });
        return blacklist.save();
      })
    );
  } else if (method === 'BlacklistRemoved') {
    const motionIndex =
      extrinsic.events.findIndex((event) => event.event.index.eq(index)) + 1;
    const motionHash = extrinsic.events[motionIndex].event.data[0] as Hash;
    const motionResult = extrinsic.events[motionIndex].event
      .data[1] as DispatchResult;
    if (!motionResult.isOk) {
      return;
    }

    const blacklistItems = data[0] as Vec<BlacklistItem>;
    await Promise.all(
      blacklistItems.map(async (item) => {
        const blacklist = await Blacklist.getByValue(
          item.isAccountId
            ? item.asAccountId.toString()
            : item.asWebsite.toString()
        );
        blacklist.removeTime = block.timestamp;
        blacklist.removeMotionHash = motionHash.toHex();
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

    const candidate = Candidate.create({
      id: address,
      account: address,
      nominator,
      locked,
      applyTime: block.timestamp
    });
    await candidate.save();
  } else if (method === 'CandidateApproved') {
    const motionIndex =
      extrinsic.events.findIndex((event) => event.event.index.eq(index)) + 1;
    const motionHash = extrinsic.events[motionIndex].event.data[0] as Hash;
    const motionResult = extrinsic.events[motionIndex].event
      .data[1] as DispatchResult;
    if (!motionResult.isOk) {
      return;
    }

    const address = data[0].toString();

    const member = Member.create({
      id: address,
      account: address,
      type: 'ALLY',
      status: 'EXIST',
      joinTime: block.timestamp,
      joinMotionHash: motionHash.toHex()
    });
    await member.save().catch((error) => console.error(error.toString()));
  } else if (method === 'CandidateRejected') {
  } else if (method === 'FoundersInitialized') {
    await Promise.all(
      (data[0] as Vec<AccountId>).map((accountId: AccountId) => {
        const address = accountId.toString();
        const joinTime = block.timestamp;

        const member = Member.create({
          id: address,
          account: address,
          type: 'FOUNDER',
          status: 'EXIST',
          joinTime
        });
        return member.save().catch((error) => console.error(error.toString()));
      })
    );
  } else if (method === 'MemberKicked') {
    const motionIndex =
      extrinsic.events.findIndex((event) => event.event.index.eq(index)) + 1;
    const motionHash = extrinsic.events[motionIndex].event.data[0] as Hash;
    const motionResult = extrinsic.events[motionIndex].event
      .data[1] as DispatchResult;
    if (!motionResult.isOk) {
      return;
    }

    const address = data[0].toString();

    const member = await Member.get(address);
    member.status = 'KICKED';
    await member.save().catch((error) => console.error(error.toString()));
  } else if (method === 'MemberRetired') {
    const motionIndex =
      extrinsic.events.findIndex((event) => event.event.index.eq(index)) + 1;
    const motionHash = extrinsic.events[motionIndex].event.data[0] as Hash;
    const motionResult = extrinsic.events[motionIndex].event
      .data[1] as DispatchResult;
    if (!motionResult.isOk) {
      return;
    }

    const address = data[0].toString();

    const member = await Member.get(address);
    member.status = 'RETIRED';
    await member.save().catch((error) => console.error(error.toString()));
  } else if (method === 'NewAnnouncement') {
  } else if (method === 'NewRule') {
  }
}
