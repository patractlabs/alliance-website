import React, { FC } from 'react';
import styled from 'styled-components';
import { useActionByMotionIndex } from '../hooks/useActionByMotionIndex';
import { useMotionByIndex } from '../hooks/useMotionByIndex';
import { Style } from '../shared/style/const';
import AccountDisplay from './AccountDisplay';

const MotionHistory: FC<{
  className?: string;
  motionIndex?: number | null;
  withTop?: boolean;
}> = ({ className, motionIndex, withTop = true }) => {
  const { data: motion } = useMotionByIndex(motionIndex);
  const { data: actions } = useActionByMotionIndex(motionIndex);

  return (
    <div className={className}>
      <div className='line'>
        <div className='line-key'>
          <div className='badge' />
          <span>Motion Proposer</span>
        </div>
        <div className='line-value' style={{ borderTopWidth: withTop ? '1px' : '0px' }}>
          <AccountDisplay id={motion?.proposerId || ''} />
        </div>
      </div>
      <div className='line'>
        <div className='line-key'>
          <div className='badge' />
          <span>Motion Approvers</span>
        </div>
        <div className='line-value'>
          <div className='accounts'>
            {!actions.filter((action) => action.approve).length
              ? '-'
              : actions
                  ?.filter((action) => action.approve)
                  .map((action) => <AccountDisplay id={action.accountId} key={action.accountId} />)}
          </div>
        </div>
      </div>
      <div className='line'>
        <div className='line-key'>
          <div className='badge' />
          <span>Motion Disapprovers</span>
        </div>
        <div className='line-value'>
          <div className='accounts'>
            {!actions.filter((action) => !action.approve).length
              ? '-'
              : actions
                  ?.filter((action) => !action.approve)
                  .map((action) => <AccountDisplay id={action.accountId} key={action.accountId} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default styled(MotionHistory)`
  width: 100%;
  > .line {
    display: flex;
    > .line-key {
      width: 30%;
      padding-left: 16px;
      margin-right: 16px;
      display: flex;
      align-items: center;
      > .badge {
        width: 7px;
        height: 7px;
        border-radius: 7px;
        background: rgb(230, 0, 122);
        margin-right: 8px;
      }
      > span {
        font-weight: 400;
        color: ${Style.label.default};
      }
    }

    > .line-value {
      min-height: 49px;
      padding: 13px 10px;
      flex: 1;
      border-top: 1px solid rgb(231, 232, 233);

      > .accounts {
        display: flex;

        > div {
          margin-right: 24px;
        }
      }
    }
  }
`;
