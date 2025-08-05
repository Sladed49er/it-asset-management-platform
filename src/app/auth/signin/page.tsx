/* ============================================
 * FILE: src/app/auth/signin/page.tsx
 * PURPOSE: Professional sign-in page with MD3 styling
 * LAST MODIFIED: August 2025
 * ============================================ */

'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardSubtitle } from '@/components/ui/Card';
import { Shield, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const error = searchParams.get('error');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError(null);

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setFormError('Invalid email or password');
      } else {
        // Get the session to check user role
        const session = await getSession();
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      setFormError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'CredentialsSignin':
        return 'Invalid email or password';
      case 'AccessDenied':
        return 'Your account has been deactivated';
      default:
        return error ? 'An error occurred during sign in' : null;
    }
  };

  const displayError = formError || getErrorMessage(error);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--md-sys-color-primary-container), var(--md-sys-color-surface))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        {/* Professional Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(145deg, var(--md-sys-color-primary), var(--md-sys-color-secondary))',
            borderRadius: 'var(--md-sys-shape-corner-large)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: 'var(--md-sys-elevation-level3)'
          }}>
            <Shield size={40} style={{ color: 'white' }} />
          </div>
          <h1 className="headline-medium" style={{ 
            color: 'var(--md-sys-color-on-surface)',
            marginBottom: '8px'
          }}>
            IT Asset Management
          </h1>
          <p className="body-medium" style={{ 
            color: 'var(--md-sys-color-on-surface-variant)',
            margin: 0
          }}>
            Sign in to access your dashboard
          </p>
        </div>

        {/* Sign In Card */}
        <Card variant="elevated" style={{
          background: 'var(--md-sys-color-surface-container-lowest)',
          boxShadow: 'var(--md-sys-elevation-level3)',
          border: '1px solid var(--md-sys-color-outline-variant)'
        }}>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardSubtitle>Enter your credentials to continue</CardSubtitle>
          </CardHeader>

          <CardContent>
            {displayError && (
              <div style={{
                background: 'var(--status-critical-bg)',
                color: 'var(--status-critical)',
                padding: '12px 16px',
                borderRadius: 'var(--md-sys-shape-corner-small)',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid var(--status-critical)'
              }}>
                <AlertCircle size={16} />
                <span className="body-small">{displayError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Email Input */}
              <div>
                <label 
                  htmlFor="email" 
                  className="label-large" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '8px',
                    color: 'var(--md-sys-color-on-surface)'
                  }}
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid var(--md-sys-color-outline)',
                    borderRadius: 'var(--md-sys-shape-corner-small)',
                    background: 'var(--md-sys-color-surface)',
                    color: 'var(--md-sys-color-on-surface)',
                    fontSize: 'var(--md-sys-typescale-body-large-size)',
                    fontFamily: 'var(--md-sys-typescale-body-large-font)',
                    transition: 'border-color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--md-sys-color-primary)';
                    e.target.style.outline = '1px solid var(--md-sys-color-primary)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--md-sys-color-outline)';
                    e.target.style.outline = 'none';
                  }}
                />
              </div>

              {/* Password Input */}
              <div>
                <label 
                  htmlFor="password" 
                  className="label-large" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '8px',
                    color: 'var(--md-sys-color-on-surface)'
                  }}
                >
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      paddingRight: '48px',
                      border: '1px solid var(--md-sys-color-outline)',
                      borderRadius: 'var(--md-sys-shape-corner-small)',
                      background: 'var(--md-sys-color-surface)',
                      color: 'var(--md-sys-color-on-surface)',
                      fontSize: 'var(--md-sys-typescale-body-large-size)',
                      fontFamily: 'var(--md-sys-typescale-body-large-font)',
                      transition: 'border-color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--md-sys-color-primary)';
                      e.target.style.outline = '1px solid var(--md-sys-color-primary)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--md-sys-color-outline)';
                      e.target.style.outline = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--md-sys-color-on-surface-variant)',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="filled"
                size="large"
                fullWidth
                loading={isLoading}
                leftIcon={isLoading ? <Loader2 size={16} className="animate-spin" /> : undefined}
                style={{ marginTop: '8px' }}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>

          <CardFooter centered>
            <p className="body-small" style={{ 
              color: 'var(--md-sys-color-on-surface-variant)',
              margin: 0
            }}>
              Need an account?{' '}
              <Link 
                href="/auth/signup"
                style={{
                  color: 'var(--md-sys-color-primary)',
                  textDecoration: 'none',
                  fontWeight: '600'
                }}
              >
                Contact your administrator
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Security Notice */}
        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: 'var(--status-info-bg)',
          borderRadius: 'var(--md-sys-shape-corner-small)',
          border: '1px solid var(--status-info)',
          textAlign: 'center'
        }}>
          <p className="body-small" style={{ 
            color: 'var(--status-info)',
            margin: 0,
            lineHeight: '1.4'
          }}>
            Your session is secured with enterprise-grade encryption.<br />
            This platform is for authorized personnel only.
          </p>
        </div>
      </div>
    </div>
  );
}