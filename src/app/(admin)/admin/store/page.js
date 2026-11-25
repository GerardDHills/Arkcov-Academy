'use client';

import { useEffect, useState } from 'react';
import { upload } from '@vercel/blob/client';

export default function AdminStoreFiles() {
  const [data, setData] = useState(null);
  const [busy, setBusy] = useState('');
  const [msg, setMsg] = useState('');

  async function load() {
    const res = await fetch('/api/admin/store-files');
    setData(await res.json());
  }
  useEffect(() => { load(); }, []);

  async function onFile(slug, file) {
    if (!file) return;
    setBusy(slug);
    setMsg('');
    try {
      const blob = await upload(`store/${slug}.pdf`, file, {
        access: 'public',
        handleUploadUrl: '/api/admin/store-files/upload',
        clientPayload: slug,
        contentType: 'application/pdf',
      });
      const res = await fetch('/api/admin/store-files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, url: blob.url }),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Save failed');
      setMsg(`Uploaded ${file.name}.`);
      await load();
    } catch (e) {
      setMsg(`Upload failed: ${e.message}`);
    } finally {
      setBusy('');
    }
  }

  return (
    <div style={{ maxWidth: 760 }}>
      <h1 style={{ color: 'var(--navy)' }}>Store files</h1>
      <p>Upload the PDF buyers receive for each digital product. Files go to Vercel Blob; buyers only get the link after Stripe confirms payment.</p>
      {data && !data.blobReady && (
        <p role="alert" style={{ color: 'var(--crimson)', fontWeight: 700 }}>
          Vercel Blob is not connected yet. In Vercel, open Storage, create a Blob store, connect it to this project, and redeploy.
        </p>
      )}
      {!data ? <p>Loading…</p> : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 14 }}>
          {data.files.map((f) => (
            <li key={f.slug} style={{ background: '#fff', borderRadius: 14, padding: '16px 18px', boxShadow: 'var(--shadow-soft)' }}>
              <strong>{f.name}</strong>
              <p style={{ margin: '4px 0 10px', fontSize: 14 }}>
                {f.uploaded ? `Uploaded ${new Date(f.uploadedAt).toLocaleString()}` : f.envSet ? 'Using the file set in Vercel settings' : 'No file yet: buyers cannot download'}
              </p>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, minHeight: 44 }}>
                <span className="btn btn-outline">{busy === f.slug ? 'Uploading…' : f.uploaded ? 'Replace PDF' : 'Upload PDF'}</span>
                <input id={`file-${f.slug}`} type="file" accept="application/pdf" disabled={!!busy || !data.blobReady}
                  onChange={(e) => onFile(f.slug, e.target.files?.[0])} style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }} />
              </label>
            </li>
          ))}
        </ul>
      )}
      {msg && <p role="status" style={{ fontWeight: 700 }}>{msg}</p>}
    </div>
  );
}
