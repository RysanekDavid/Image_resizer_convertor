// pages/index.tsx

import React from "react";

import { Layout } from "../components/Layout";

import { ImageConverter } from "../components/ImageConverter";



const HomePage = (): JSX.Element => {

  return (

    <Layout title="Víceformátový konvertor obrázků">

      <ImageConverter />

    </Layout>

  );

};



export default HomePage;
