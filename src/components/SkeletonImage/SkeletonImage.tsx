import React, { useEffect } from 'react';
import { Skeleton } from "@mui/lab";
import { useState } from "react";

const SkeletonImage = (props: any) => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const imgElement: any = React.useRef(null);

    useEffect(() => {
        setLoaded(false);
    }, [props?.src]);

    const handleLoadImage = () => {
        setLoaded(false);
    }

    return (
        <span>
            {!loaded && <Skeleton variant="rectangular" width={imgElement?.current?.width} height={imgElement?.current?.height} />}
            <img
                ref={imgElement}
                {...props}
                src={imgElement?.current?.width !== 0 ? props.src : 'non'}
                style={{ display: loaded ? 'unset' : 'none' }}
                onLoad={handleLoadImage}
            />
        </span>
    );
}

export default  SkeletonImage;