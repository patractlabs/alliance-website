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
              desc='Initially founding Members, have veto rights to motions of setting rule and elevating ally and voting power same with Fellow.'
              members={data.filter((m) => m.type === MemberRole.FOUNDER)}
            />
          </AnimationWrapper>
        </div>
        <div className='role'>
          <AnimationWrapper delay={400}>
            <Role
              type={MemberRole.FELLOW}
              desc='Joining Members, have vote rights for motions of setting rule, elevating ally, kicking member, making announcement, managing candidate and blacklist to pass by super majority, can also nominate a candidate without the need of deposit.'
              members={data.filter((m) => m.type === MemberRole.FELLOW)}
            />
          </AnimationWrapper>
        </div>
        <div className='role'>
          <AnimationWrapper delay={800}>
            <Role
              type={MemberRole.ALLY}
              desc="Waiting members, don't have vote or veto rights."
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
