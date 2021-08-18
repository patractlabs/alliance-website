import { FC } from 'react';
import styled from 'styled-components';
import Role from './Role';
import { MemberRole, useMembers } from '../../../hooks';
import AnimationWrapper from '../../../shared/AnimationWrapper';

const CurrentMembers: FC<{ className?: string }> = ({ className }) => {
  const { data } = useMembers();

  return (
    <div className={className}>
      <h2>Current Members</h2>
      <div className='roles'>
        <div className='role'>
          <AnimationWrapper>
            <Role
              type={MemberRole.FOUNDER}
              descs={[
                'Founding members are teams that have been around since the early days, have a strong  reputation in the community and have made significant contributions to the ecosystem. They set, publish and enforce the rules of membership, deciding if/when to kick an ally, deciding if/when to elevate an Ally into a Fellow, maintaining a blacklist of websites and addresses that are detrimental to the ecosystem, and investigating and voting for a resolution in a dispute between two allies.',
                'Founding members have veto rights on motions on setting rules and elevating Allies.'
              ]}
              // members={[...data, ...data]}

              members={data.filter((m) => m.type === MemberRole.FOUNDER)}
            />
          </AnimationWrapper>
        </div>
        <div className='role'>
          <AnimationWrapper delay={400}>
            <Role
              type={MemberRole.FELLOW}
              descs={[
                'Fellows are joining Members whose candidacy is endorsed by Founders. They have voting rights on motions focused on setting the Alliance rules, elevating Allies, kicking members, making announcements and blacklisting proposals to pass by supermajority. They can also nominate a candidate without the need for a deposit.',
                'All Fellows must vote on an Ally elevation. Elevation requires a supermajority of Aye votes (> 60%).'
              ]}
              members={data.filter((m) => m.type === MemberRole.FELLOW)}
            />
          </AnimationWrapper>
        </div>
        <div className='role'>
          <AnimationWrapper delay={800}>
            <Role
              type={MemberRole.ALLY}
              descs={[
                'Allies are candidates to enter the Alliance.',
                'Ally registration is permissionless, but they are required to place a deposit (~1,000 DOT) which is locked until/unless they retire as a member or they become a Fellow. They can also skip the deposit if a Fellow nominates them.'
              ]}
              members={data.filter((m) => m.type === MemberRole.ALLY)}
            />
          </AnimationWrapper>
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
      min-width: 260px;
      max-width: 440px;
      margin-right: 20px;

      &:last-child {
        margin-right: 0px;
      }
    }
  }
`;
