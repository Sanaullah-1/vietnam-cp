import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import "./Webtrader.scss";
const WebTrader = () => {
  const [scriptLoadingState, setScriptLoadingState] = useState("IDLE");
  const [loading, setloading] = useState(true);
  useEffect(() => {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://trade.mql5.com/trade/widget.js";
    script.onload = function () {
      setScriptLoadingState("LOADED");
      setloading(false);
    };
    script.onerror = function () {
      setScriptLoadingState("FAILED");
      setloading(false);
    };
    document.body.appendChild(script);
  }, []);
  return (
    <section className="section web-trader-wrapper">
      {loading && (
        <div className="text-center pt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!loading && scriptLoadingState == "LOADED" && (
        <div id="webterminal" style={{ height: "calc(100vh - 145px)" }}>
          <Helmet>
            <script type="text/javascript">
              {`
                            new MetaTraderWebTerminal('webterminal',{
                             version: 5,
                            servers: ["AccuindexLimited-Demo","AccuindexLimited-Live", "MetaQuotes-Demo"],  
                            server: "AccuindexLimited-Demo",  
                            demoAllServers: true,   
                            utmCampaign: "",    
                            utmSource: "www.accuindex.com", 
                             startMode: "login", 
                            language: "en",   
                            colorScheme: "black_on_white"
                    })
                `}
            </script>
          </Helmet>
        </div>
      )}
    </section>
  );
};

export default WebTrader;
