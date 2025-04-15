import SwingingTag from "./SwingingTag";
import React from "react";

interface CollarWithTagProps {
    name: string;
}

const CollarWithTag: React.FC<CollarWithTagProps> = ({ name }) => {

    return (
        <div className="collar-wrapper">
            <div className="collar-band" />
            <div className="collar-ring" />
            <SwingingTag name={name} />
        </div>
    );
};

export default CollarWithTag;