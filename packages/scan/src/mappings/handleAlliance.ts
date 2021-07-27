import type { Bytes, Enum, Vec, Option } from '@polkadot/types';
import type {
  DispatchResult,
  AccountId,
  Hash,
  BalanceOf
} from '@polkadot/types/interfaces';

import { SubstrateEvent } from '@subql/types';
import { Announcement, Blacklist, Candidate, Rule } from '../types';
import { Member } from '../types';
import { createAccounts } from './createAccounts';

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
    if (!motionResult.isOk) {
      return;
    }

    const address = data[0].toString();
    await createAccounts([address]);

    const member = await Member.get(address);
    member.elevatedMotionHash = motionHash.toHex();
    member.elevatedTime = block.timestamp;
    member.type = 'FELLOW';
    await member.save();
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
      blacklistItems.map(async (item) => {
        const blacklist = Blacklist.create({
          id: item.hash.toHex(),
          value: item.isAccountId
            ? item.asAccountId.toString()
            : item.asWebsite.toString(),
          isAccount: item.isAccountId,
          addTime: block.timestamp,
          addMotionHash: motionHash.toHex()
        });
        if (item.isAccountId) {
          await createAccounts([item.asAccountId.toString()]);
        }
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

    await createAccounts([address]);

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
    await createAccounts([address]);

    const member = Member.create({
      id: address,
      account: address,
      type: 'ALLY',
      status: 'EXIST',
      joinTime: block.timestamp,
      joinMotionHash: motionHash.toHex()
    });
    await member.save();
  } else if (method === 'CandidateRejected') {
  } else if (method === 'FoundersInitialized') {
    await createAccounts(
      (data[0] as Vec<AccountId>).map((accountId) => accountId.toString())
    );

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
        return member.save();
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
    await createAccounts([address]);

    const member = await Member.get(address);
    member.status = 'KICKED';
    await member.save();
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
    await createAccounts([address]);

    const member = await Member.get(address);
    member.status = 'RETIRED';
    await member.save();
  } else if (method === 'NewAnnouncement') {
    const motionIndex =
      extrinsic.events.findIndex((event) => event.event.index.eq(index)) + 1;
    const motionHash = extrinsic.events[motionIndex].event.data[0] as Hash;
    const motionResult = extrinsic.events[motionIndex].event
      .data[1] as DispatchResult;
    if (!motionResult.isOk) {
      return;
    }

    const cid = data[0].toHex();

    const announcement = Announcement.create({
      id: cid,
      cid,
      createTime: block.timestamp,
      motionHash: motionHash.toHex()
    });
    await announcement.save();
  } else if (method === 'NewRule') {
    const motionIndex =
      extrinsic.events.findIndex((event) => event.event.index.eq(index)) + 1;
    const motionHash = extrinsic.events[motionIndex].event.data[0] as Hash;
    const motionResult = extrinsic.events[motionIndex].event
      .data[1] as DispatchResult;
    if (!motionResult.isOk) {
      return;
    }

    const cid = data[0].toHex();

    const rule = Rule.create({
      id: cid,
      cid,
      createTime: block.timestamp,
      motionHash: motionHash.toHex()
    });
    await rule.save();
  }
}
