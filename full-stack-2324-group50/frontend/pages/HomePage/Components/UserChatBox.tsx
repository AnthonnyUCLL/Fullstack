import React, { ReactNode, CSSProperties } from 'react';

interface UserChatboxProps {
  children: ReactNode;
  style?: CSSProperties;
}

const UserChatbox: React.FC<UserChatboxProps> = ({ children, style }) => {
  const defaultStyles: CSSProperties = {
    backgroundColor: '#00B2FF',
    padding: '12px 10px 12px 10px',
    borderRadius: '20px',
    marginLeft: 'auto',
    width: 'fit-content',
    maxWidth: '400px',
    gridColumn: 2,
    ...style,
  };

  return <div style={defaultStyles}>{children}</div>;
};

export default UserChatbox;