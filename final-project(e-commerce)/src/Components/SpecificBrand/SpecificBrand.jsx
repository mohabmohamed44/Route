import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Bars } from "react-loader-spinner";
import { cartContext } from "../../Context/CartContext";

export default function SpecificBrand() {
  const { brandId } = useParams();
  const { getBrandDetail } = useContext(cartContext);

  const { data: brand, error, isLoading } = useQuery({
    queryKey: ["brand", brandId],  
    queryFn: () => getBrandDetail(brandId), 
    enabled: !!brandId,
  });

  return (
    <div className="container">
      <h2 className="text-2xl text-center mb-10 mt-12">Specific Brand</h2>

      {/* Loading State */}
      {isLoading && (
        <div className="d-flex justify-content-center align-items-center h-screen">
          <Bars />
        </div>
      )}

      {/* Error State */}
      {error && <p className="text-center text-danger">Failed to fetch brand data.</p>}

      {/* Brand Data */}
      {!isLoading && !error && brand && (
        <div className='row d-flex justify-content-evenly mt-4'>
          <div className='col-11 col-md-3 mt-2 card'>
            <img 
              className='w-100 pt-2' 
              src={data.image} 
              alt={`${data.name} logo`} 
            />
            <h1 className='ms-2 text-center'>{data.name}</h1>
          </div>
        </div>
      )}
    </div>
  );
}