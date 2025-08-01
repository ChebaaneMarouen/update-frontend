import React from 'react';
import { Content} from "adminlte-2-react";
import { withTranslation } from "react-i18next";
import { analyticLink } from 'config';

const DashboardVisual = ({t}) =>{
    return <Content title={t("NAV_ANALYTICAL_DASHBOARD")} browserTitle={t("NAV_ANALYTICAL_DASHBOARD")}>
        <iframe width="100%" height="600" src={analyticLink} title={t("NAV_ANALYTICAL_DASHBOARD")} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </Content>
}

export default withTranslation()(DashboardVisual);