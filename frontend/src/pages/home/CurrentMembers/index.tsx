import { FC, useState } from 'react';
import styled from 'styled-components';
import { Member, MemberStatus } from './MembersByRole';
import Role, { MemberRole } from './Role';
import PolkadotSvg from '../../../assets/imgs/polkadot.svg';
import ApronSvg from '../../../assets/imgs/apron.png';

const CurrentMembers: FC<{ className?: string }> = ({ className }) => {
  const [founders] = useState<Member[]>([
    {
      joinedDate: 'Jun-1-2021',
      elevatedDate: 'Jun-24-2021',
      stauts: MemberStatus.Existing,
      locked: '1000 DOT',
      role: MemberRole.Ally,
      name: 'Patract',
      accountID: '',
      icon: PolkadotSvg,
      website: 'https://patract.io'
    },
    {
      joinedDate: 'Jun-1-2021',
      elevatedDate: 'Jun-24-2021',
      stauts: MemberStatus.Existing,
      locked: '1000 DOT',
      role: MemberRole.Ally,
      name: 'Polkadot',
      accountID: '',
      icon: PolkadotSvg,
      website: 'https://polkadot.network'
    },
    {
      joinedDate: 'Jun-1-2021',
      elevatedDate: 'Jun-24-2021',
      stauts: MemberStatus.Existing,
      locked: '1000 DOT',
      role: MemberRole.Ally,
      name: 'Acala',
      accountID: '',
      icon: PolkadotSvg,
      website: 'https://acala.org'
    },
    {
      joinedDate: 'Jun-1-2021',
      elevatedDate: 'Jun-24-2021',
      stauts: MemberStatus.Existing,
      locked: '1000 DOT',
      role: MemberRole.Ally,
      name: 'Bifrost',
      accountID: '',
      icon: PolkadotSvg,
      website: 'https://bifrost.org'
    },
    {
      joinedDate: 'Jun-1-2021',
      elevatedDate: 'Jun-24-2021',
      stauts: MemberStatus.Existing,
      locked: '1000 DOT',
      role: MemberRole.Ally,
      name: 'Litentry',
      accountID: '',
      icon: PolkadotSvg,
      website: 'https://litentry.network'
    }
  ] as any);
  const [fellowers] = useState<Member[]>([
    {
      joinedDate: 'Jun-1-2021',
      elevatedDate: 'Jun-24-2021',
      stauts: MemberStatus.Existing,
      locked: '1000 DOT',
      role: MemberRole.Ally,
      name: 'Apron',
      accountID: '',
      icon: ApronSvg,
      website: 'https://apron.network'
    },
    {
      joinedDate: 'Jun-1-2021',
      elevatedDate: 'Jun-24-2021',
      stauts: MemberStatus.Existing,
      locked: '1000 DOT',
      role: MemberRole.Ally,
      name: 'Bandot',
      accountID: '',
      icon: ApronSvg,
      website: 'https://bandot.org'
    },
    {
      joinedDate: 'Jun-1-2021',
      elevatedDate: 'Jun-24-2021',
      stauts: MemberStatus.Existing,
      locked: '1000 DOT',
      role: MemberRole.Ally,
      name: 'Clover',
      accountID: '',
      icon: ApronSvg,
      website: 'https://clover.com'
    },
    {
      joinedDate: 'Jun-1-2021',
      elevatedDate: 'Jun-24-2021',
      stauts: MemberStatus.Existing,
      locked: '1000 DOT',
      role: MemberRole.Ally,
      name: 'Manta',
      accountID: '',
      icon: ApronSvg,
      website: 'https://manta.network'
    },
    {
      joinedDate: 'Jun-1-2021',
      elevatedDate: 'Jun-24-2021',
      stauts: MemberStatus.Existing,
      locked: '1000 DOT',
      role: MemberRole.Ally,
      name: 'Plasm',
      accountID: '',
      icon: ApronSvg,
      website: 'https://plasm.com'
    }
  ] as any);
  const [allies] = useState<Member[]>([
    {
      joinedDate: 'Jun-1-2021',
      elevatedDate: 'Jun-24-2021',
      stauts: MemberStatus.Existing,
      locked: '1000 DOT',
      role: MemberRole.Ally,
      name: 'SubDao',
      accountID: '',
      icon: PolkadotSvg,
      website: 'https://subdao.io'
    },
    {
      joinedDate: 'Jun-1-2021',
      elevatedDate: 'Jun-24-2021',
      stauts: MemberStatus.Existing,
      locked: '1000 DOT',
      role: MemberRole.Ally,
      name: 'Phala',
      accountID: '',
      icon: PolkadotSvg,
      website: 'https://phala.io'
    },
    {
      joinedDate: 'Jun-1-2021',
      elevatedDate: 'Jun-24-2021',
      stauts: MemberStatus.Existing,
      locked: '1000 DOT',
      role: MemberRole.Ally,
      name: 'Cycan',
      accountID: '',
      icon: PolkadotSvg,
      website: 'https://cycan.network'
    },
    {
      joinedDate: 'Jun-1-2021',
      elevatedDate: 'Jun-24-2021',
      stauts: MemberStatus.Existing,
      locked: '1000 DOT',
      role: MemberRole.Ally,
      name: 'Zenlink',
      accountID: '',
      icon: PolkadotSvg,
      website: 'https://zenlink.org'
    },
    {
      joinedDate: 'Jun-1-2021',
      elevatedDate: 'Jun-24-2021',
      stauts: MemberStatus.Existing,
      locked: '1000 DOT',
      role: MemberRole.Ally,
      name: 'OpenSquare',
      accountID: '',
      icon: PolkadotSvg,
      website: 'https://opensquare.network'
    }
  ] as any);

  return (
    <div className={className}>
      <h2>Current Members</h2>
      <div className='roles'>
        <div className='role'>
          <Role
            type={MemberRole.Founder}
            desc='Initially founding Members, have veto rights to motions of setting rule and elevating ally and voting power same with Fellow.'
            members={fellowers}
          />
        </div>
        <div className='role'>
          <Role
            type={MemberRole.Fellow}
            desc='Joining Members, have vote rights for motions of setting rule, elevating ally, kicking member, making announcement, managing candidate and blacklist to pass by super majority, can also nominate a candidate without the need of deposit.'
            members={founders}
          />
        </div>
        <div className='role'>
          <Role type={MemberRole.Ally} desc="Waiting members, don't have vote or veto rights." members={allies} />
        </div>
      </div>
    </div>
  );
};

export default styled(CurrentMembers)`
  background-color: rgb(250, 250, 251);
  padding: 70px 97px;
  > h2 {
    text-align: center;
    margin-bottom: 76px;
  }
  > .roles {
    display: flex;
    justify-content: center;

    > .role {
      flex: 1;
      min-width: 280px;
      max-width: 440px;
      margin-right: 20px;

      &:last-child {
        margin-right: 0px;
      }
    }
  }
`;
