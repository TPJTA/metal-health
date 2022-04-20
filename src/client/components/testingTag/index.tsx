import { Tag } from 'antd';
import React from 'react';

const TestingTag: React.FC<{ type: number }> = function ({ type }) {
  if (type === 0) {
    return (
      <Tag color="green" key="0">
        健康
      </Tag>
    );
  } else if (type === 1) {
    return (
      <Tag color="magenta" key="1">
        性格
      </Tag>
    );
  } else if (type === 2) {
    return (
      <Tag color="blue" key="2">
        社交
      </Tag>
    );
  } else if (type === 3) {
    return (
      <Tag color="purple" key="3">
        能力
      </Tag>
    );
  } else {
    return null;
  }
};

export default TestingTag;
