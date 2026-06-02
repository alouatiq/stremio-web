// Copyright (C) 2017-2024 Smart code 203358507

const React = require('react');
const styles = require('./styles');

const SESSION_KEY = 'pin_unlocked';
const REQUIRED_PIN = process.env.PIN_CODE;

const PinGate = ({ children }) => {
    const [unlocked, setUnlocked] = React.useState(() => {
        if (!REQUIRED_PIN) return true;
        return sessionStorage.getItem(SESSION_KEY) === '1';
    });
    const [pin, setPin] = React.useState('');
    const [error, setError] = React.useState(false);

    const handleSubmit = React.useCallback((e) => {
        e.preventDefault();
        if (pin === REQUIRED_PIN) {
            sessionStorage.setItem(SESSION_KEY, '1');
            setUnlocked(true);
        } else {
            setError(true);
            setPin('');
        }
    }, [pin]);

    const handleChange = React.useCallback((e) => {
        setError(false);
        setPin(e.target.value);
    }, []);

    if (unlocked) return children;

    return (
        <div className={styles['pin-gate']}>
            <div className={styles['pin-gate-box']}>
                <div className={styles['pin-gate-logo']} />
                <p className={styles['pin-gate-title']}>Enter PIN to continue</p>
                <form className={styles['pin-gate-form']} onSubmit={handleSubmit}>
                    <input
                        className={`${styles['pin-gate-input']} ${error ? styles['pin-gate-input-error'] : ''}`}
                        type="password"
                        inputMode="numeric"
                        autoComplete="off"
                        autoFocus
                        maxLength={16}
                        value={pin}
                        placeholder="••••"
                        onChange={handleChange}
                    />
                    {error && <p className={styles['pin-gate-error']}>Incorrect PIN</p>}
                    <button className={styles['pin-gate-button']} type="submit">Unlock</button>
                </form>
            </div>
        </div>
    );
};

module.exports = PinGate;
