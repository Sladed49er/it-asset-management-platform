/* ============================================
 * FILE: src/components/dashboard/DashboardClient.tsx
 * PURPOSE: Client-side dashboard with user session integration
 * LAST MODIFIED: August 2025
 * ============================================ */

'use client';

import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardSubtitle } from '@/components/ui/Card';
import { 
  Plus, 
  Settings, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle, 
  Server,
  Users,
  HardDrive,
  FileText,
  Activity,
  AlertTriangle,
  Calendar,
  DollarSign,
  Eye,
  Download,
  Filter,
  Bell,
  Clock,
  CreditCard,
  Shield,
  Zap,
  Target,
  TrendingDown,
  ExternalLink,
  Share2,
  BarChart3,
  LogOut,
  User
} from 'lucide-react';

// Enhanced Status Indicator Component with proper typing
const StatusIndicator = ({ 
  status, 
  children, 
  icon 
}: { 
  status: 'healthy' | 'warning' | 'critical' | 'info' | 'offline';
  children: React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <div className={`status-indicator status-${status}`}>
    {icon || <div className="status-dot"></div>}
    {children}
  </div>
);

// Urgency Badge Component with proper typing
const UrgencyBadge = ({ 
  urgency, 
  children 
}: { 
  urgency: 'safe' | 'soon' | 'urgent' | 'expired';
  children: React.ReactNode;
}) => {
  const colors = {
    safe: { bg: 'var(--status-healthy-bg)', color: 'var(--status-healthy)' },
    soon: { bg: 'var(--status-warning-bg)', color: 'var(--status-warning)' },
    urgent: { bg: 'var(--status-critical-bg)', color: 'var(--status-critical)' },
    expired: { bg: '#ffebee', color: '#c62828' }
  };
  
  return (
    <span style={{
      background: colors[urgency].bg,
      color: colors[urgency].color,
      padding: '4px 8px',
      borderRadius: 'var(--md-sys-shape-corner-small)',
      fontSize: 'var(--md-sys-typescale-label-small-size)',
      fontWeight: '600'
    }}>
      {children}
    </span>
  );
};

interface DashboardClientProps {
  session: Session;
}

export default function DashboardClient({ session }: DashboardClientProps) {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signin' });
  };

  const getUserRoleBadge = (role: string) => {
    const roleColors = {
      'SUPER_ADMIN': { bg: 'var(--status-critical-bg)', color: 'var(--status-critical)' },
      'TRUSTED_ADVISOR': { bg: 'var(--md-sys-color-primary-container)', color: 'var(--md-sys-color-primary)' },
      'ORG_ADMIN': { bg: 'var(--status-warning-bg)', color: 'var(--status-warning)' },
      'MANAGER': { bg: 'var(--status-info-bg)', color: 'var(--status-info)' },
      'USER': { bg: 'var(--status-healthy-bg)', color: 'var(--status-healthy)' }
    };

    const roleStyle = roleColors[role as keyof typeof roleColors] || roleColors.USER;

    return (
      <span style={{
        background: roleStyle.bg,
        color: roleStyle.color,
        padding: '4px 8px',
        borderRadius: 'var(--md-sys-shape-corner-small)',
        fontSize: 'var(--md-sys-typescale-label-small-size)',
        fontWeight: '600',
        textTransform: 'capitalize'
      }}>
        {role.replace('_', ' ').toLowerCase()}
      </span>
    );
  };

  return (
    <div style={{ 
      background: 'var(--md-sys-color-surface)',
      minHeight: '100vh' 
    }}>
      {/* Professional Header with User Info */}
      <header style={{
        background: 'var(--md-sys-color-surface-container-highest)',
        borderBottom: '1px solid var(--md-sys-color-outline-variant)',
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        minHeight: '80px'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <h1 className="title-large" style={{ color: 'var(--md-sys-color-primary)', margin: 0 }}>
              IT Asset Management
            </h1>
            <nav style={{ display: 'flex', gap: '16px' }}>
              <Button variant="text" size="small">Dashboard</Button>
              <Button variant="text" size="small">Assets</Button>
              <Button variant="text" size="small">Contracts</Button>
              <Button variant="text" size="small">Finance</Button>
            </nav>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* User Info */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              padding: '10px 14px',
              background: 'var(--md-sys-color-surface-container)',
              borderRadius: 'var(--md-sys-shape-corner-medium)',
              border: '1px solid var(--md-sys-color-outline-variant)',
              minWidth: '200px'
            }}>
              <User size={18} style={{ color: 'var(--md-sys-color-on-surface-variant)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
                <span className="body-small" style={{ fontWeight: '600', color: 'var(--md-sys-color-on-surface)' }}>
                  {session.user.name || session.user.email}
                </span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {getUserRoleBadge(session.user.role)}
                  {session.user.organizationName && (
                    <span className="body-small" style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: '11px' }}>
                      {session.user.organizationName}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <Button variant="text" size="small" leftIcon={<Eye size={16} />}>
              Advisor View
            </Button>
            <Button variant="outlined" size="small" leftIcon={<Share2 size={16} />}>
              Share Report
            </Button>
            <Button variant="filled" size="small" leftIcon={<Plus size={16} />}>
              Add Asset
            </Button>
            <Button 
              variant="text" 
              size="small" 
              leftIcon={<LogOut size={16} />}
              onClick={handleSignOut}
              style={{ marginLeft: '4px' }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container" style={{ paddingTop: '32px', paddingBottom: '64px' }}>
        {/* Welcome Message */}
        <div style={{
          background: 'linear-gradient(135deg, var(--md-sys-color-primary-container), rgba(25, 118, 210, 0.1))',
          border: '1px solid var(--md-sys-color-primary)',
          borderRadius: 'var(--md-sys-shape-corner-medium)',
          padding: '20px 24px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <ShieldCheck size={24} style={{ color: 'var(--md-sys-color-primary)' }} />
          <div>
            <h2 className="title-medium" style={{ color: 'var(--md-sys-color-primary)', marginBottom: '4px' }}>
              Welcome back, {session.user.name?.split(' ')[0] || 'User'}!
            </h2>
            <p className="body-medium" style={{ color: 'var(--md-sys-color-on-surface)', margin: 0 }}>
              You have {session.user.role === 'TRUSTED_ADVISOR' ? 'cross-organization' : 'organization-level'} access. 
              Last login: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Business Alert Bar */}
        <div style={{
          background: 'linear-gradient(135deg, var(--status-warning-bg), rgba(245, 124, 0, 0.1))',
          border: '1px solid var(--status-warning)',
          borderRadius: 'var(--md-sys-shape-corner-medium)',
          padding: '16px 20px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Bell size={20} style={{ color: 'var(--status-warning)' }} />
          <div>
            <span className="body-medium" style={{ fontWeight: '600', color: 'var(--status-warning)' }}>
              Action Required: 
            </span>
            <span className="body-medium" style={{ color: 'var(--md-sys-color-on-surface)', marginLeft: '8px' }}>
              3 contracts expiring this month • 2 billing plans auto-renew in 7 days • 1 cyber insurance renewal due
            </span>
          </div>
          <Button variant="text" size="small" style={{ marginLeft: 'auto' }}>
            View All
          </Button>
        </div>

        {/* Enhanced Dashboard Grid */}
        <div className="grid gap-8" style={{ 
          gridTemplateColumns: '1fr 1fr 1fr',
          marginBottom: '48px'
        }}>
          {/* Contract Radar - Critical Business Widget */}
          <Card variant="elevated" style={{
            background: 'linear-gradient(145deg, var(--md-sys-color-surface-container-low), var(--md-sys-color-surface-container))',
            boxShadow: 'var(--md-sys-elevation-level3)',
            border: '2px solid var(--status-warning)'
          }}>
            <CardHeader actions={
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(145deg, var(--status-warning-bg), rgba(245, 124, 0, 0.2))',
                borderRadius: 'var(--md-sys-shape-corner-medium)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--md-sys-elevation-level1)'
              }}>
                <Calendar size={28} style={{ color: 'var(--status-warning)' }} />
              </div>
            }>
              <CardTitle className="headline-small" style={{ color: 'var(--status-warning)' }}>
                Contract Radar
              </CardTitle>
              <CardSubtitle>Upcoming expirations & renewals</CardSubtitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { 
                    service: 'Microsoft 365 Business',
                    amount: '$1,400/mo',
                    days: 7,
                    type: 'auto-renew',
                    urgency: 'soon' as const
                  },
                  { 
                    service: 'Cyber Insurance Policy',
                    amount: '$230/mo',
                    days: 14,
                    type: 'renewal',
                    urgency: 'soon' as const
                  },
                  { 
                    service: 'AWS Enterprise Support',
                    amount: '$820/mo',
                    days: 23,
                    type: 'expiring',
                    urgency: 'urgent' as const
                  }
                ].map((contract, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    background: 'var(--md-sys-color-surface-container-highest)',
                    borderRadius: 'var(--md-sys-shape-corner-small)',
                    border: '1px solid var(--md-sys-color-outline-variant)'
                  }}>
                    <div>
                      <div className="body-medium" style={{ fontWeight: '600', marginBottom: '2px' }}>
                        {contract.service}
                      </div>
                      <div className="body-small" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                        {contract.amount} • {contract.days} days
                      </div>
                    </div>
                    <UrgencyBadge urgency={contract.urgency}>
                      {contract.type}
                    </UrgencyBadge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="text" size="small" leftIcon={<Filter size={16} />}>
                Filter by Amount
              </Button>
              <Button variant="outlined" size="small" leftIcon={<Calendar size={16} />}>
                View Calendar
              </Button>
            </CardFooter>
          </Card>

          {/* Financial Summary Panel */}
          <Card variant="filled" color="primary">
            <CardHeader actions={
              <div style={{
                width: '48px',
                height: '48px',
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: 'var(--md-sys-shape-corner-medium)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <DollarSign size={24} style={{ color: 'var(--md-sys-color-on-primary-container)' }} />
              </div>
            }>
              <CardTitle>Spend Snapshot</CardTitle>
              <CardSubtitle>This month&apos;s IT expenses</CardSubtitle>
            </CardHeader>
            <CardContent>
              <div style={{ marginBottom: '16px' }}>
                <div className="display-small" style={{ 
                  color: 'var(--md-sys-color-on-primary-container)',
                  fontWeight: '700',
                  lineHeight: '1'
                }}>
                  $8,420
                </div>
                <div className="body-small" style={{ 
                  color: 'var(--md-sys-color-on-primary-container)',
                  opacity: '0.8'
                }}>
                  +$340 vs last month
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { vendor: 'Microsoft 365', amount: '$1,400', percent: 35 },
                  { vendor: 'AWS Hosting', amount: '$820', percent: 20 },
                  { vendor: 'VoIP Services', amount: '$560', percent: 14 },
                  { vendor: 'Cyber Insurance', amount: '$230', percent: 6 }
                ].map((expense, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0'
                  }}>
                    <div>
                      <div className="body-medium" style={{ 
                        color: 'var(--md-sys-color-on-primary-container)',
                        fontWeight: '500'
                      }}>
                        {expense.vendor}
                      </div>
                      <div style={{
                        width: `${expense.percent * 2}px`,
                        height: '3px',
                        background: 'rgba(255, 255, 255, 0.4)',
                        borderRadius: '2px',
                        marginTop: '4px'
                      }} />
                    </div>
                    <span className="body-medium" style={{ 
                      color: 'var(--md-sys-color-on-primary-container)',
                      fontWeight: '600'
                    }}>
                      {expense.amount}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="text" size="small" style={{ 
                color: 'var(--md-sys-color-on-primary-container)' 
              }}>
                Month
              </Button>
              <Button variant="text" size="small" style={{ 
                color: 'var(--md-sys-color-on-primary-container)' 
              }}>
                Quarter
              </Button>
              <Button variant="text" size="small" style={{ 
                color: 'var(--md-sys-color-on-primary-container)' 
              }}>
                Annual
              </Button>
            </CardFooter>
          </Card>

          {/* Smart Recommendations */}
          <Card variant="outlined" style={{
            background: 'linear-gradient(145deg, var(--md-sys-color-success-container), rgba(46, 125, 50, 0.05))',
            border: '1px solid var(--status-healthy)'
          }}>
            <CardHeader>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'var(--status-healthy-bg)',
                borderRadius: 'var(--md-sys-shape-corner-medium)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <Target size={24} style={{ color: 'var(--status-healthy)' }} />
              </div>
              <CardTitle style={{ color: 'var(--status-healthy)' }}>
                Cost Optimization
              </CardTitle>
              <CardSubtitle>AI-powered savings recommendations</CardSubtitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  {
                    icon: <TrendingDown size={16} />,
                    title: 'Switch to Annual Billing',
                    savings: 'Save $2,100/year',
                    description: 'Microsoft 365 offers 15% discount'
                  },
                  {
                    icon: <Zap size={16} />,
                    title: 'Unused Licenses Detected',
                    savings: 'Save $840/month',
                    description: 'Using only 65% of VoIP licenses'
                  },
                  {
                    icon: <Clock size={16} />,
                    title: 'Free Support Hours',
                    savings: '$450 value',
                    description: '3 hours/month unused support'
                  }
                ].map((rec, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px',
                    background: 'var(--md-sys-color-surface-container-lowest)',
                    borderRadius: 'var(--md-sys-shape-corner-small)',
                    border: '1px solid rgba(46, 125, 50, 0.2)'
                  }}>
                    <div style={{ color: 'var(--status-healthy)', flexShrink: 0, marginTop: '2px' }}>
                      {rec.icon}
                    </div>
                    <div>
                      <div className="body-medium" style={{ 
                        fontWeight: '600', 
                        marginBottom: '2px',
                        color: 'var(--status-healthy)'
                      }}>
                        {rec.title}
                      </div>
                      <div className="body-small" style={{ 
                        color: 'var(--md-sys-color-on-surface-variant)',
                        marginBottom: '4px'
                      }}>
                        {rec.description}
                      </div>
                      <div className="label-small" style={{ 
                        color: 'var(--status-healthy)',
                        fontWeight: '700'
                      }}>
                        {rec.savings}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="text" size="small" leftIcon={<BarChart3 size={16} />}>
                View ROI Report
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Rest of the dashboard content continues... */}
        {/* (The asset portfolio and trusted advisor sections from your original code would go here) */}
      </div>
    </div>
  );
}