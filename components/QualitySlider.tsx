// components/QualitySlider.tsx

import React from "react";



interface QualitySliderProps {

  quality: number;

  onQualityChange: (quality: number) => void;

}



export const QualitySlider = ({

  quality,

  onQualityChange,

}: QualitySliderProps): React.ReactElement => {

  const qualityPercent = Math.round(quality * 100);



  return (

    <div

      style={{

        marginBottom: "1.5rem",

        padding: "0.75rem 1rem",

        borderRadius: "10px",

        backgroundColor: "#252525",

        border: "1px solid #444444",

      }}

    >

      <div

        style={{

          display: "flex",

          justifyContent: "space-between",

          gap: "0.75rem",

          alignItems: "center",

          flexWrap: "wrap",

        }}

      >

        <div>

          <p

            style={{

              margin: 0,

              fontSize: "0.9rem",

              fontWeight: 600,

              color: "#c0c0c0",

            }}

          >

            Intenzita komprese

          </p>

          <p

            style={{

              margin: "0.15rem 0 0",

              fontSize: "0.8rem",

              color: "#b0b0b0",

            }}

          >

            {qualityPercent}% kvality – vyšší hodnota = lepší kvalita, větší

            velikost souboru. Použije se pro WebP a JPEG.

          </p>

        </div>

        <div style={{ flex: "0 0 220px" }}>

          <input

            type="range"

            min={0.1}

            max={1}

            step={0.05}

            value={quality}

            onChange={(e) => onQualityChange(parseFloat(e.target.value))}

            style={{ width: "100%" }}

          />

        </div>

      </div>

    </div>

  );

};

