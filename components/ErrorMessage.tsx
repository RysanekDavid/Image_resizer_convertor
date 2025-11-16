// components/ErrorMessage.tsx

import React from "react";



interface ErrorMessageProps {

  message: string;

}



export const ErrorMessage = ({ message }: ErrorMessageProps): React.ReactElement => {

  return (

    <p

      style={{

        color: "#ff6b6b",

        backgroundColor: "#4a1a1a",

        border: "1px solid #6a2a2a",

        padding: "0.5rem 0.75rem",

        borderRadius: "8px",

        marginBottom: "1rem",

      }}

    >

      {message}

    </p>

  );

};

