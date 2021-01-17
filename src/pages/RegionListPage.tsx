import React, { useEffect, useState } from 'react';
import { Layout, PageHeader } from 'antd';
import '../app.css';
import { getData } from '../api';
import RegionList, { RegionItem } from '../components/RegionList';
import { Content } from 'antd/es/layout/layout';
import Actions from "../components/Actions";

export enum sortType {
    Rise = "rise",
    Drop = "drop",
}

const RegionListPage: React.FunctionComponent<{}> = () => {
    const [regions, setRegions] = useState<Array<RegionItem> | null>(null);
    const [filtratedRegions, setFiltratedRegions] = useState<Array<RegionItem> | null>(null);
    const [pageHeader, setPageHeader] = useState('');
    const [loading, setLoading] = useState(false);
    const [filterString, setFilterString] = useState('');
    const [sort, setSort] = useState<sortType | null>(null);

    useEffect(() => {
        setLoading(true);
        getData()
            .then(data => {
                setRegions(data)
                setPageHeader(data[0].formname)
            })
            .then(_ => setLoading(false))
            .catch(e => console.error ('error', e))
    }, []);
    useEffect(() => {
        if (filterString.length > 0) {
            if (regions) {
                console.log("1111", regions.filter(region => region.territory.toLowerCase().includes(filterString.toLowerCase())))
                setFiltratedRegions(regions.filter(region => region.territory.toLowerCase().includes(filterString.toLowerCase())))
            }
        } else {
            setFiltratedRegions(null)
        }
    }, [filterString]);
    useEffect(() => {
        const currentRegions = filtratedRegions ? filtratedRegions : regions;
        if (currentRegions) {
            const sortedRegions = sort === sortType.Drop
                ? currentRegions.sort((a, b) => b.libraries - a.libraries)
                : currentRegions.sort((a, b) => a.libraries - b.libraries);
            setFiltratedRegions((prevRegions: Array<RegionItem> | null) => {
                if (!prevRegions) {
                    return sortedRegions;
                } else {
                    return [...sortedRegions];
                }
            })
        }
    }, [sort]);

    const onSearchChange = (value: string) => setFilterString(value);
    const onSortChange = (value: sortType) => setSort(value);
    return (
        <Layout className="main-layout">
            <Content className="main-content">
                <PageHeader title={pageHeader} />
                <Actions onSearchChange={onSearchChange} onSortChange={onSortChange}/>
                <RegionList items={filtratedRegions ? filtratedRegions : regions} loading={loading} />
            </Content>
        </Layout>
    );
}

export default RegionListPage;
