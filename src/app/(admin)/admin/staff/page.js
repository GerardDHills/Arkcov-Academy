'use client';

import { useCallback, useEffect, useState } from 'react';
import styles from '../admin.module.css';

const ROLES = [['professor', 'Professor'], ['advisor', 'Advisor'], ['tutor', 'Tutor']];
const when = (d) => (d ? new Date(d).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : '');

export default function StaffAdmin() {
  const [d, setD] = useState(null);
  const [o, setO] = useState(null);
  const [add, setAdd] = useState({ userId: '', staff_role: 'professor', staff_type: 'volunteer', staff_title: '' });
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    setD(await fetch('/api/admin/staff').then((x) => x.json()));
    setO(await fetch('/api/admin/oversight').then((x) => x.json()));
  }, []);
  useEffect(() => { load(); }, [load]);

  const save = async (body) => {
    setMsg('');
    const res = await fetch('/api/admin/staff', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const v = await res.json();
    if (!res.ok) setMsg(v.error); else load();
  };

  const cell = { padding: '10px 12px', borderBottom: '1px solid var(--warm-gray)', fontSize: 14, verticalAlign: 'top' };
  const th = { ...cell, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-muted)', textAlign: 'left' };

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', marginBottom: 6 }}>Faculty & Safety</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 24, maxWidth: 720 }}>Approve professors, advisors and tutors before they can work with cadets, and review every one-on-one, guardian notice and chat message.</p>

      {o && (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
          <span style={{ padding: '6px 12px', borderRadius: 999, background: o.videoOn ? '#E3F4EF' : '#FBEDEA', fontSize: 13, fontWeight: 700 }}>Live video: {o.videoOn ? 'connected' : 'not connected (add DAILY_API_KEY)'}</span>
          <span style={{ padding: '6px 12px', borderRadius: 999, background: o.emailOn ? '#E3F4EF' : '#FBEDEA', fontSize: 13, fontWeight: 700 }}>Guardian email: {o.emailOn ? 'sending' : 'saved here only (add RESEND_API_KEY)'}</span>
        </div>
      )}
      {msg && <p style={{ color: 'var(--crimson)' }}>{msg}</p>}

      <section style={{ marginBottom: 36 }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: 10 }}>Faculty</h2>
        <div style={{ overflowX: 'auto', background: '#fff', borderRadius: 14, boxShadow: 'var(--shadow-soft)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
            <thead><tr><th style={th}>Name</th><th style={th}>Role</th><th style={th}>Position</th><th style={th}>Title</th><th style={th}>Status</th><th style={th} /></tr></thead>
            <tbody>
              {(d?.staff || []).map((u) => (
                <tr key={u.id}>
                  <td style={cell}><b>{u.name}</b><br /><small style={{ color: 'var(--text-muted)' }}>{u.email}</small></td>
                  <td style={cell}><select defaultValue={u.staff_role} onChange={(e) => save({ ...u, userId: u.id, staff_role: e.target.value })}>{ROLES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></td>
                  <td style={cell}><select defaultValue={u.staff_type || 'volunteer'} onChange={(e) => save({ ...u, userId: u.id, staff_type: e.target.value })}><option value="volunteer">Volunteer</option><option value="hired">Hired</option></select></td>
                  <td style={cell}>{u.staff_title || '—'}</td>
                  <td style={cell}><b style={{ color: u.staff_status === 'approved' ? 'var(--accent-teal)' : u.staff_status === 'pending' ? 'var(--accent-orange)' : 'var(--crimson)' }}>{u.staff_status}</b></td>
                  <td style={{ ...cell, whiteSpace: 'nowrap' }}>
                    {u.staff_status !== 'approved' && <button className="btn btn-navy" style={{ padding: '6px 12px', fontSize: 13 }} onClick={() => save({ ...u, userId: u.id, staff_status: 'approved' })}>Approve</button>}{' '}
                    {u.staff_status === 'approved' && <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: 13 }} onClick={() => save({ ...u, userId: u.id, staff_status: 'suspended' })}>Suspend</button>}{' '}
                    <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: 13 }} onClick={() => confirm(`Remove ${u.name} from the faculty?`) && save({ userId: u.id, remove: true })}>Remove</button>
                  </td>
                </tr>
              ))}
              {d && d.staff.length === 0 && <tr><td style={cell} colSpan={6}>No faculty yet. Add someone below, or they can request access from the Faculty Hall.</td></tr>}
            </tbody>
          </table>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); save({ ...add, staff_status: 'approved' }); }} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'end', marginTop: 16, background: '#fff', padding: 16, borderRadius: 14, boxShadow: 'var(--shadow-soft)' }}>
          <label style={{ display: 'grid', gap: 4, fontSize: 13, fontWeight: 700 }}>Person
            <select required value={add.userId} onChange={(e) => setAdd({ ...add, userId: e.target.value })}>
              <option value="">Choose an account…</option>
              {(d?.users || []).map((u) => <option key={u.id} value={u.id}>{u.name} ({u.email})</option>)}
            </select>
          </label>
          <label style={{ display: 'grid', gap: 4, fontSize: 13, fontWeight: 700 }}>Role
            <select value={add.staff_role} onChange={(e) => setAdd({ ...add, staff_role: e.target.value })}>{ROLES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
          </label>
          <label style={{ display: 'grid', gap: 4, fontSize: 13, fontWeight: 700 }}>Position
            <select value={add.staff_type} onChange={(e) => setAdd({ ...add, staff_type: e.target.value })}><option value="volunteer">Volunteer</option><option value="hired">Hired</option></select>
          </label>
          <label style={{ display: 'grid', gap: 4, fontSize: 13, fontWeight: 700 }}>Title
            <input value={add.staff_title} onChange={(e) => setAdd({ ...add, staff_title: e.target.value })} placeholder="e.g., Pediatric nurse" />
          </label>
          <button className="btn btn-crimson" type="submit">Add and approve</button>
        </form>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>Approve someone only after your background check and training are complete.</p>
      </section>

      <section style={{ marginBottom: 36 }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: 10 }}>One-on-one log</h2>
        <div style={{ overflowX: 'auto', background: '#fff', borderRadius: 14, boxShadow: 'var(--shadow-soft)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
            <thead><tr><th style={th}>Opened</th><th style={th}>Faculty</th><th style={th}>Cadet</th><th style={th}>Class</th><th style={th}>Guardian</th><th style={th}>Recorded</th><th style={th}>Status</th></tr></thead>
            <tbody>
              {(o?.breakouts || []).map((b) => (
                <tr key={b.id}>
                  <td style={cell}>{when(b.opened_at)}</td><td style={cell}>{b.staff_name}</td><td style={cell}>{b.cadet_name}</td><td style={cell}>{b.session_title}</td>
                  <td style={cell}>{b.guardian_email}<br /><small>{b.guardian_notified ? 'Emailed' : 'Notice saved below'}</small></td>
                  <td style={cell}>{b.recorded ? 'Yes (Daily dashboard)' : 'No'}</td>
                  <td style={cell}>{b.status}{b.closed_at ? ` · closed ${when(b.closed_at)}` : ''}</td>
                </tr>
              ))}
              {o && o.breakouts.length === 0 && <tr><td style={cell} colSpan={7}>No one-on-ones yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ marginBottom: 36 }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: 10 }}>Guardian notices</h2>
        <div style={{ display: 'grid', gap: 10 }}>
          {(o?.notices || []).map((n) => (
            <details key={n.id} style={{ background: '#fff', borderRadius: 12, padding: '12px 16px', boxShadow: 'var(--shadow-soft)' }}>
              <summary style={{ cursor: 'pointer' }}><b>{n.to_email}</b> · {n.subject} · {when(n.created_at)} · {n.sent ? 'sent' : n.error ? `failed: ${n.error}` : 'not sent'}</summary>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: 14, marginTop: 10 }}>{n.body}</pre>
            </details>
          ))}
          {o && o.notices.length === 0 && <p style={{ color: 'var(--text-muted)' }}>None yet.</p>}
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: '1.2rem', marginBottom: 10 }}>All chat</h2>
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: 'var(--shadow-soft)', maxHeight: 420, overflowY: 'auto' }}>
          {(o?.messages || []).map((m) => (
            <div key={m.id} style={{ ...cell, display: 'grid', gridTemplateColumns: '130px 160px 1fr', gap: 10 }}>
              <span style={{ color: 'var(--text-muted)' }}>{when(m.created_at)}</span>
              <span><b>{m.name}</b><br /><small>{m.session_title}{m.breakout_id ? ' · one-on-one' : ''}</small></span>
              <span>{m.body}</span>
            </div>
          ))}
          {o && o.messages.length === 0 && <p style={{ ...cell, color: 'var(--text-muted)' }}>No messages yet.</p>}
        </div>
      </section>
    </div>
  );
}
