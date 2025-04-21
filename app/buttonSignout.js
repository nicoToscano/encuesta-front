import React from 'react';

const ButtonSignout = ({ onSignout }) => {
    const handleSignout = () => {
        if (onSignout) {
            onSignout();
        }
    };

    return (
        <button onClick={handleSignout} style={styles.button}>
            Cerrar Sesión
        </button>
    );
};

const styles = {
    button: {
        padding: '10px 20px',
        backgroundColor: '#ff4d4f',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default ButtonSignout;