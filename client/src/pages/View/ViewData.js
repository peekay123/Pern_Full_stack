import React from 'react';
import "./ViewData.css";
import DataDetails from '../../components/Table/DataTable/data';

const ViewData = () => {
  return (
    <>
    <section className="data" id="data">
    <div className="content">
            <h3>Uploaded Data</h3>
        </div>
       <DataDetails/>
    </section>
    </>
  )
}

export default ViewData;
