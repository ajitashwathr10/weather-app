import {cn} from '@/utils/cn';
import React from 'react';

export default function Container(props: Readonly<React.HTMLProps<HTMLDivElement>>) {
    return (
        <div 
            {...props}
            className = {cn(
                "w-full bg-white border rounded-x1 flex py-4 shadow-sm",
                props.className
            )}
        />
    );
}