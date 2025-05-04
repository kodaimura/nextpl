'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HttpError } from '@/lib/api/common';
import { api } from '@/lib/api/api.client';
import styles from './login-form.module.css';

const LoginForm: React.FC = () => {
  const [account_name, setAccountName] = useState<string>('');
  const [account_password, setAccountPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response: any = await api.post('accounts/login', { account_name, account_password });
      router.push('/dashboard');
    } catch (err) {
      if (err instanceof HttpError && err.status === 401) {
        setError('ユーザ名又はパスワードが異なります。');
      } else {
        if (err instanceof Error) {
          console.error('ログインエラー:', err.message);
        }
        setError('ログインに失敗しました。');
      }
    }
  };

  return (
    <>
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
    </>
  );
};

export default LoginForm;
