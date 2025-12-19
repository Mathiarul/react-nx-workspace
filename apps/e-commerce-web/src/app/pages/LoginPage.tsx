import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm, RegisterForm } from '@react-demo/auth';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);

  const handleSuccess = () => {
    navigate('/');
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        {showRegister ? (
          <RegisterForm
            onSuccess={handleSuccess}
            onLoginClick={() => setShowRegister(false)}
          />
        ) : (
          <LoginForm
            onSuccess={handleSuccess}
            onRegisterClick={() => setShowRegister(true)}
          />
        )}
      </div>
    </div>
  );
}

