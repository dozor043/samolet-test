import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../api";
import { RegionItem } from "../components/RegionList";
import { Content } from "antd/es/layout/layout";
import { Layout, Skeleton } from "antd";

const RegionPage: React.FunctionComponent<{}> = () => {
    const { id } = useParams<{id: string}>();
    const defaultRegion = {
        address: '',
        order: 0,
        libraries: 0,
        territory: '',
    };
    const [regions, setRegions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentRegion, setCurrentRegion] = useState(defaultRegion);

    useEffect(() => {
        setLoading(true);
        //Два раза хождение за одними и теми же данными RegionListPage.tsx:24
        //Если бы за данными приходилось бы ходить > 2 раз таким способом стоит засунуть данные в контекст.
        getData()
            .then(data => {
                setRegions(data)
                setCurrentRegion(data.find((region: RegionItem) => region.order === Number(id)))
            })
            .then(_ => setLoading(false))
            .catch(e => console.error('error', e))
    }, []);
    return (
        <Layout className="main-layout">
            <Content className="main-content">
                <Skeleton loading={loading} active>
                    <h1>{currentRegion.territory}</h1>
                    <div>{currentRegion.address}</div>
                    <div>Количество библиотек {currentRegion.libraries}</div>
                </Skeleton>
            </Content>
        </Layout>
    );
}

export default RegionPage;