import React from "react";
import logoSrc from "../assets/undraw_fantasy-writer_fx3f.svg";

export default function Logo({width = '100px'}){
    return (
        <div>
            <img
                className="inline-block"
                src={logoSrc}
                alt="Logo"
                style={{ width }}
            />
        </div>
    )

}