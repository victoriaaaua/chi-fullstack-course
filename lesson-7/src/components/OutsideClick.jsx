import { useEffect } from "react";

const OutsideClick = ({ elementRef, onClose }) => {
    useEffect(() => {
        if (!elementRef || !elementRef.current) return;

        const handleClick = event => {
            if (elementRef.current && !elementRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClick); 

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [elementRef, onClose]);

    return null; 
};

export default OutsideClick;