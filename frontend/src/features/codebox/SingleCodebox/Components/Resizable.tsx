import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import React, { useLayoutEffect, useState } from 'react';
import { reactResizableProps } from 'Types';

const Resizable = ({ minWidthPercent, children }: reactResizableProps) => {
    const [innerWidth, setInnerWidth] = useState(() => window.innerWidth);
    const [width, setWidth] = useState(() => window.innerWidth * 0.5);
    const [minWidth, setMinWidth] = useState(
        () => (window.innerWidth * minWidthPercent) / 100,
    );
    const [innerHeight, setInnerHeight] = useState(
        () => window.innerHeight - 62,
    );

    useLayoutEffect(() => {
        const listener = () => {
            setInnerWidth(window.innerWidth);
            if (width > window.innerWidth * 0.55) {
                setWidth(window.innerWidth * 0.55);
                setMinWidth((window.innerHeight * minWidthPercent) / 100);
            }
        };
        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);

    useLayoutEffect(() => {
        setWidth(window.innerWidth * 0.55);
        setMinWidth((window.innerWidth * minWidthPercent) / 100);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.innerWidth]);

    useLayoutEffect(() => {
        setInnerHeight(window.innerHeight - 62);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.innerHeight, width]);

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
                maxConstraints={[innerWidth * 0.55, Infinity]}
                width={width}
                height={innerHeight}
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
