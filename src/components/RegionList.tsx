import React from 'react';
import { List, Skeleton, Typography } from 'antd';
import { Link } from 'react-router-dom';
const { Text } = Typography;

export interface RegionItem {
    address: string,
    order: number,
    libraries: number,
    territory: string,
}

interface RegionListProps {
    items: Array<RegionItem> | null,
    loading: boolean,
}

const RegionList: React.FunctionComponent<RegionListProps> = ({items, loading}) => (
    <List
        itemLayout="vertical"
        size="small"
        dataSource={items ?? []}
        renderItem={(item: RegionItem) => (
            <List.Item key={item.order} className="region-list__elem region-list__elem_flatted">
                <Skeleton loading={loading} active paragraph={false}>
                    <Link className="region-list__link" to={`region/${item.order}`}>
                        {`${item.territory} `}
                        <Text strong>{item.libraries}</Text>
                    </Link>
                </Skeleton>
            </List.Item>
        )}
    />
)

export default RegionList;
