import { Dropdown, Menu } from 'antd';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import SelectSvg from '../assets/imgs/select.svg';
import { Style } from '../shared/style/const';

export interface SelectOption {
  text: string;
  value: string;
}

const Filter: FC<{
  className?: string;
  span: string;
  options: SelectOption[];
  defaultValue: string;
  onChange: (value: string) => void;
}> = ({ className, span, options, onChange, defaultValue }) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className={className}>
      <span>{span}</span>
      <Dropdown
        trigger={['click']}
        overlay={
          <Menu>
            {options.map((w, index) => (
              <Menu.Item
                key={index}
                onClick={() => {
                  setValue(w.value);
                  onChange(w.value);
                }}
              >
                {w.text}
              </Menu.Item>
            ))}
          </Menu>
        }
      >
        <div className='select'>
          <span>{options.find((t) => t.value === value)?.text}</span>
          <img src={SelectSvg} alt='' />
        </div>
      </Dropdown>
    </div>
  );
};

export default styled(Filter)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 110px;

  > span {
    color: ${Style.label.default};
    line-height: 18px;
    margin-right: 8px;
  }

  > .select {
    height: 32px;
    border-radius: 8px;
    padding: 8px;
    background: #f6f5f7;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      color: ${Style.badge.primary};
    }

    > span {
      margin-right: 8px;
      font-size: 13px;
      font-weight: 500;
      line-height: 16px;
    }
  }
`;
