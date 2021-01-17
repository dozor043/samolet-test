import React from 'react';
import { ConfigProvider } from 'antd';
import '../app.css';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RegionListPage from '../pages/RegionListPage';
import RegionPage from '../pages/RegionPage';

export const RegionsDataContext = React.createContext([]);

const App: React.FunctionComponent<any> = () => (
    <ConfigProvider locale={ruRU}>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <RegionListPage/>
                </Route>
                <Route path="/region/:id" exact>
                    <RegionPage/>
                </Route>
            </Switch>
        </BrowserRouter>
    </ConfigProvider>
)

export default App;
