import { loadModules } from "esri-loader";
import React, { useEffect, useRef } from "react";

export function Map() {
  const MapRef = useRef(null);
  useEffect(() => {
    let view;
    loadModules(
      [
        "esri/views/MapView",
        "esri/Map",
        "esri/WebMap",
        "esri/layers/FeatureLayer",
      ],
      { css: true }
    ).then(([MapView, WebMap, esriConfig, FeatureLayer]) => {
      esriConfig.apiKey = "AAPK690264ca3a0a4605879a96ada6b538d3UX3VQGVVu6g2TGCkGSgODDo6FtzM3bwzDPjCapsyryCZvPzgTba4SZo_aIwNgNl7";

      const webmap = new WebMap({
        basemap: "streets",
      });

      view = new MapView({
        map: webmap,
        center: [35.0818155, 31.4117257],
        zoom: 7,
        container: MapRef.current,
      });

      const POPUP = {
        title: "{CNTRY_NAME}",
        content: "<b>City Name:</b> {CITY_NAME}<br><b>POP:</b> {POP }<br>",
      };

      const capitalCitiesLayer = new FeatureLayer({
        url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Cities/FeatureServer/0",
        outFields: ["CITY_NAME", "POP", "CNTRY_NAME"],
        popupTemplate: POPUP, 
      });
      capitalCitiesLayer.definitionExpression =
        "status = 'National and provincial capital'";

      webmap.add(capitalCitiesLayer);
    });

    return () => {
      if (!!view) {
        view.destroy();
        view = null;
      }
    };
  });

  return <div style={{ height: "100vh" }} ref={MapRef}></div>;
}
