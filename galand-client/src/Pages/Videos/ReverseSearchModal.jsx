import React, { Component, useCallback, useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import MyModal from "@shared/Components/MyModal";
import { Button } from "adminlte-2-react";
import axios from "axios";
import { apiEndpoint } from "config";
import Spinner from "components/Spinner/Spinner";
import SearchResults from "./SearchResult";

const GoogleReverseModal = ({t,url}) => {
    const [analyse, setAnalyse] = useState([]);
    const [display, openModal] = useState(false);
    const [loading, setLoading] = useState(false);

 
    const analyseImage = useCallback(async ()=>{
      try {     
        setLoading(true);               
        const response = await axios({
            url : apiEndpoint + "reverse-search?url=" + url,
            method :"GET"
        })
        const data = JSON.parse(response.data);
        setAnalyse(data);
        setLoading(false);
      } catch (error) {
      setAnalyse([])
      setLoading(false);
    }
    }) 
    return (
        <div onClick={()=>{!display && analyseImage(); openModal(true)}}>
            { url && 
              <MyModal
                block
                size="lg"
                onToggle={openModal}
                button={
                  <Button
                    size={"xs"}
                    onClick={() => openModal(false)}
                    pullRight={true}
                    type="danger"
                    text={t("GOOGLE_REVERSE_SEARCH_TEXT")}
                  />
                }
                hideSubmit={true}
                title={t("GOOGLE_REVERSE_SEARCH_TEXT")}
              >
              {display ? 
              !loading ?
              <div>
                    <h3 className="title text-center">
                      {t("LABEL_ORIGINAL_IMAGE")}
                    </h3>
                    <div className="d-flex justify-content-center">
                    <img src={url} alt={`Thumbnail for original image`} className="img-thumbnail" />

                    </div>
                      <tr/>
                    {
                      <SearchResults data={analyse} t={t}/>
                    }
                    
                </div>:
                <Spinner/>:
                null
                }
              </MyModal>
        }
      </div>
    );
  }

export default withTranslation()(GoogleReverseModal);
