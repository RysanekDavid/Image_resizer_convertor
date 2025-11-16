// components/EmptyState.tsx

import React from "react";



export const EmptyState = (): React.ReactElement => {

  return (

    <p style={{ color: "#b0b0b0", fontSize: "0.95rem" }}>

      Zatím nejsou nahrané žádné obrázky. Nahraj alespoň jeden, zvol cílový

      formát (WebP / JPEG / PNG), případně uprav intenzitu komprese a

      rozměry.

    </p>

  );

};

