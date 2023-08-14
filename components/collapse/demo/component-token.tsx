import { Collapse, ConfigProvider } from 'antd';
import React from 'react';

/** Test usage. Do not use in your production. */
import type { CollapseProps } from 'antd';

const text = `Ant Design! `.repeat(26);

const items: CollapseProps['items'] = [
  { key: '1', label: `This is panel header 1, (${text})`, children: text },
  { key: '2', label: `This is panel header 2, (${text})`, children: text },
  { key: '3', label: `This is panel header 3, (${text})`, children: text },
];

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Collapse: {
          headerPadding: '0px 10px 20px 30px',
        },
      },
    }}
  >
    <Collapse items={items} />
  </ConfigProvider>
);