// components/Layout.tsx

import React, { ReactNode } from "react";



interface LayoutProps {

  title?: string;

  children: ReactNode;

}



export const Layout = ({ title, children }: LayoutProps): React.ReactElement => {

  return (

    <main

      style={{

        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "flex-start",

        padding: "2rem 1rem",

        backgroundColor: "#1a1a1a",

        fontFamily:

          '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',

        color: "#e5e5e5",

        fontSize: "16px",

      }}

    >

      <div

        style={{

          width: "100%",

          maxWidth: "960px",

          backgroundColor: "#2d2d2d",

          borderRadius: "12px",

          padding: "1.75rem",

          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",

        }}

      >

        {title && (

          <header style={{ marginBottom: "1.5rem" }}>

            <h1

              style={{

                fontSize: "1.9rem",

                fontWeight: 700,

                margin: 0,

                marginBottom: "0.25rem",

              }}

            >

              {title}

            </h1>

            <p

              style={{

                margin: 0,

                color: "#a0a0a0",

                fontSize: "0.95rem",

              }}

            >

              Nahrávej více obrázků a převáděj je mezi formáty WebP, JPEG a PNG.

            </p>

          </header>

        )}



        {children}

      </div>

    </main>

  );

};

