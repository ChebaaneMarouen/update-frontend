import React from 'react';
import './searchResult.css'; // Import your custom CSS file (optional)

const SearchResults = ({ data, t }) => {
  const knowledgeGraph = data.knowledge_graph || [];
  const visualMatches = data.visual_matches || [];

  return (
    <div className="container search-results-container">
      {knowledgeGraph.length?<div className="knowledge-graph">
        <h2>{t("TEXT_KNOWLEDGE_GRAPH")}</h2>
        <ul>
          {knowledgeGraph.map((item, index) => (
            <li key={index} className="pointer underlined blue-on-hover" onClick={()=>window.open(item.link, "_blank")}>             
                {item.title} - {item.subtitle}
            </li>
          ))}
        </ul>
      </div> : null}

      <div className="visual-matches">
        <h2>{t("TEXT_VISUAL_MATCHES")}</h2>
        <div className="row">
          {visualMatches.length?
          visualMatches.map((item, index) => (
            <div key={index} className="col-sm-6 col-md-4 col-lg-3 mb-4 pointer underlined blue-on-hover" onClick={()=>window.open(item.link, "_blank")}>        
                <img src={item.thumbnail} alt={`Thumbnail for ${item.title}`} className="img-thumbnail" />
                <p>{item.title}</p>
            </div>
          )):
          <div className='text-center' style={{width : "100%"}}>
                      <p>{t("TEXT_NO_DATA_FOUND")}</p>

          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
