import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import React, { useEffect, useState } from 'react';
import { reactResizableProps } from 'Types';

const Resizable = ({ minWidthPercent, children }: reactResizableProps) => {
    const [innerWidth, setInnerWidth] = useState(() => window.innerWidth);
    const [width, setWidth] = useState(() => window.innerWidth * 0.75);
    const [minWidth, setMinWidth] = useState(
        () => (window.innerWidth * minWidthPercent) / 100,
    );

    useEffect(() => {
        const listener = () => {
            setInnerWidth(window.innerWidth);
            if (window.innerWidth * 0.75 < width) {
                setWidth(window.innerWidth * 0.75);
            }
            setMinWidth((window.innerHeight * minWidthPercent) / 100);
        };
        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);

    const handleResize = (
        event: React.SyntheticEvent<Element, Event>,
        data: ResizeCallbackData,
    ) => {
        setWidth(data.size.width);
    };

    return (
        <>
            <ResizableBox
                className="resize-box"
                minConstraints={[minWidth, Infinity]}
                maxConstraints={[innerWidth * 0.75, Infinity]}
                width={width}
                height={Infinity}
                resizeHandles={['e']}
                axis="x"
                onResizeStop={handleResize}
            >
                {children}
            </ResizableBox>
        </>
    );
};

export default Resizable;
