'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/app/lib/api';
import styles from './page.module.css';

const LoginPage: React.FC = () => {
  const [account_name, setAccountName] = useState('');
  const [account_password, setAccountPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post<{ token: string }>('accounts/login', { account_name, account_password });
      localStorage.setItem('token', response.token);

      router.push('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        console.error('ログインエラー:', err.message);
        setError('ログインに失敗しました。');
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor='account_name' className={styles.label}>ユーザー名</label>
          <input
            type='text'
            id='account_name'
            value={account_name}
            onChange={(e) => setAccountName(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor='account_password' className={styles.label}>パスワード</label>
          <input
            type='password'
            id='account_password'
            value={account_password}
            onChange={(e) => setAccountPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <button type='submit' className={styles.submitButton}>ログイン</button>
      </form>
    </div>
  );
};

export default LoginPage;
