import React from 'react';
import { Content} from "adminlte-2-react";
import { withTranslation } from "react-i18next";

const Tineye = ({t}) =>{
    return <Content title={t("NAV_TINEYE")} browserTitle={t("NAV_TINEYE")}>
        <iframe width="100%" height="600" src="https://tineye.com/" title={t("NAV_TINEYE")} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </Content>
}

export default withTranslation()(Tineye);