import React from "react";
import { Input, Select, Space } from "antd";
import { sortType } from "../pages/RegionListPage";
const { Option } = Select;

interface ActionsProps {
    onSearchChange: (value: string) => void;
    onSortChange: (value: sortType) => void;
}

const Actions: React.FunctionComponent<ActionsProps> = ({onSearchChange, onSortChange}) => (
    <div className="action-line">
        <Space>
            <span>Найти регион</span>
            <Input
                className="search-input"
                placeholder="Введите значение"
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <span>сортировать количество</span>
            <Select placeholder="Выберите значение" onChange={onSortChange}>
                <Option value={sortType.Drop}>по убыванию</Option>
                <Option value={sortType.Rise}>по возрастанию</Option>
            </Select>
        </Space>
    </div>
);

export default Actions;
