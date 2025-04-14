import React from 'react';

const Header = ({ onSignOut }) => {
    return (
        <header style={styles.header}>
            <h1 style={styles.title}>My App</h1>
            <button style={styles.signOutButton} onClick={onSignOut}>
                Sign Out
            </button>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #ddd',
    },
    title: {
        margin: 0,
        fontSize: '1.5rem',
        color: '#333',
    },
    signOutButton: {
        padding: '8px 16px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default Header;