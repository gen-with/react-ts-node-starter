import React, { forwardRef } from 'react';

type MainCardProps = {
    children: React.ReactNode;
};

const MainCard = forwardRef<HTMLDivElement, MainCardProps>(({
    border, boxShadow, children, subheader, content, contentSX, darkTitle, divider, elevation, secondary, shadow, sx, title, codeString, modal, ...others
}, ref) => {
    // ... component logic ...
});

export default MainCard; 