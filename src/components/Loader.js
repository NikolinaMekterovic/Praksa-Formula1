import React, { useState } from "react";
import { CircleLoader } from "react-spinners";

const Loader = () => {
    const [isLoading, setIsLoading] = useState(true);

    const getLoader = () => {
        setIsLoading(false)
    }
    if (isLoading) {
        return (<div className="loaderClass"><CircleLoader size={150} color="yellow" /></div> )
    }

    return (
        <div>{getLoader}</div>
    )
}

export default Loader;