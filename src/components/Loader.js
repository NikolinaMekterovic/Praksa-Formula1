import React, { useState } from "react";
import { CircleLoader } from "react-spinners";

const Loader = () => {
    const [isLoading, setIsLoading] = useState(true);

    const getLoader = () => {
        setIsLoading(false)
    }
    if (isLoading) {
        return (<CircleLoader size={70} color="green" />)
    }

    return (
        <div>{getLoader}</div>
    )
}

export default Loader;