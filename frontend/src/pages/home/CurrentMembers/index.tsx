import { Col, Row } from 'antd';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { Member } from './MembersByRole';
import Role, { MemberRole } from './Role';
import PolkadotSvg from '../../../assets/imgs/polkadot.svg';
import ApronSvg from '../../../assets/imgs/apron.png';

const CurrentMembers: FC<{ className?: string }> = ({ className }) => {
  const [founders] = useState<Member[]>([
    { name: 'Patract', accountID: '', icon: PolkadotSvg, website: 'https://patract.io' },
    { name: 'Polkadot', accountID: '', icon: PolkadotSvg, website: 'https://polkadot.network' },
    { name: 'Acala', accountID: '', icon: PolkadotSvg, website: 'https://acala.org' },
    { name: 'Bifrost', accountID: '', icon: PolkadotSvg, website: 'https://bifrost.org' },
    { name: 'Litentry', accountID: '', icon: PolkadotSvg, website: 'https://litentry.network' }
  ]);
  const [fellowers] = useState<Member[]>([
    { name: 'Apron', accountID: '', icon: ApronSvg, website: 'https://apron.network' },
    { name: 'Bandot', accountID: '', icon: ApronSvg, website: 'https://bandot.org' },
    { name: 'Clover', accountID: '', icon: ApronSvg, website: 'https://clover.com' },
    { name: 'Manta', accountID: '', icon: ApronSvg, website: 'https://manta.network' },
    { name: 'Plasm', accountID: '', icon: ApronSvg, website: 'https://plasm.com' }
  ]);
  const [allies] = useState<Member[]>([
    { name: 'SubDao', accountID: '', icon: PolkadotSvg, website: 'https://subdao.io' },
    { name: 'Phala', accountID: '', icon: PolkadotSvg, website: 'https://phala.io' },
    { name: 'Cycan', accountID: '', icon: PolkadotSvg, website: 'https://cycan.network' },
    { name: 'Zenlink', accountID: '', icon: PolkadotSvg, website: 'https://zenlink.org' },
    { name: 'OpenSquare', accountID: '', icon: PolkadotSvg, website: 'https://opensquare.network' }
  ]);

  return (
    <div className={className}>
      <h2>Current Members</h2>
      <Row className='roles'>
        <Col className='role' span={8}>
          <Role
            type={MemberRole.Founder}
            desc='Initially founding Members, have veto rights to motions of setting rule and elevating ally and voting power same with Fellow.'
            members={fellowers}
          />
        </Col>
        <Col className='role' span={8}>
          <Role
            type={MemberRole.Fellow}
            desc='Joining Members, have vote rights for motions of setting rule, elevating ally, kicking member, making announcement, managing candidate and blacklist to pass by super majority, can also nominate a candidate without the need of deposit.'
            members={founders}
          />
        </Col>
        <Col className='role' span={8}>
          <Role type={MemberRole.Ally} desc="Waiting members, don't have vote or veto rights." members={allies} />
        </Col>
      </Row>
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
    justify-content: center;

    > .role {
      min-width: 350px;
      max-width: 400px;
      padding: 0px 20px;
    }
  }
`;
