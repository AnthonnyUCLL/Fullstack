import React, { ReactNode, CSSProperties } from 'react';

interface ChatboxProps {
  children: ReactNode;
  style?: CSSProperties;
}

const Chatbox: React.FC<ChatboxProps> = ({ children, style }) => {
  const defaultStyles: CSSProperties = {
    backgroundColor: 'lightGrey',
    padding: '12px 10px 12px 10px',
    borderRadius: '20px',
    marginRight: 'auto',
    width: 'fit-content',
    textAlign: 'left',
    gridColumn: 1,
    maxWidth: '400px',
    alignSelf: 'flex-start',
    ...style,
  };

  return <div style={defaultStyles}>{children}</div>;
};

export default Chatbox;