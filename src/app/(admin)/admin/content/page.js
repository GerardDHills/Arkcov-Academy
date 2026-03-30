'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './content.module.css';

const CONTENT_TYPES = [
  { key: 'all', label: 'All Content', icon: '📋' },
  { key: 'course', label: 'Courses', icon: '📚' },
  { key: 'podcast', label: 'Podcasts', icon: '🎙️' },
  { key: 'movie', label: 'Movies', icon: '🎬' },
  { key: 'tv_show', label: 'TV Shows', icon: '📺' },
  { key: 'animated_short', label: 'Animated Shorts', icon: '✨' },
  { key: 'interactive_game', label: 'Games', icon: '🎮' },
];

const ACCESS_LEVELS = [
  { value: 'free', label: 'Free — Everyone' },
  { value: 'member', label: 'Member — $9/mo' },
  { value: 'family', label: 'Family — $14/mo' },
];

const EMPTY_FORM = {
  title: '', description: '', type: 'course', thumbnail_url: '', media_url: '',
  trailer_url: '', access_level: 'member', category: '', tags: '',
  duration_minutes: '', release_year: '', rating: '', featured: false,
  sort_order: 0, published: false,
};

export default function ContentManagerPage() {
  const [content, setContent] = useState([]);
  const [activeType, setActiveType] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/content?type=${activeType}`);
      const data = await res.json();
      if (res.ok) setContent(data.content || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [activeType]);

  useEffect(() => { fetchContent(); }, [fetchContent]);

  const openNew = (type) => {
    setForm({ ...EMPTY_FORM, type: type === 'all' ? 'course' : type });
    setEditingId(null);
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const openEdit = (item) => {
    setForm({
      title: item.title || '',
      description: item.description || '',
      type: item.type,
      thumbnail_url: item.thumbnail_url || '',
      media_url: item.media_url || '',
      trailer_url: item.trailer_url || '',
      access_level: item.access_level || 'member',
      category: item.category || '',
      tags: (item.tags || []).join(', '),
      duration_minutes: item.duration_minutes || '',
      release_year: item.release_year || '',
      rating: item.rating || '',
      featured: item.featured || false,
      sort_order: item.sort_order || 0,
      published: item.published || false,
    });
    setEditingId(item.id);
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      duration_minutes: form.duration_minutes ? parseInt(form.duration_minutes) : null,
      release_year: form.release_year ? parseInt(form.release_year) : null,
      sort_order: parseInt(form.sort_order) || 0,
    };

    try {
      const url = editingId ? `/api/admin/content/${editingId}` : '/api/admin/content';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess(editingId ? 'Content updated!' : 'Content created!');
      setShowForm(false);
      fetchContent();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/content/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      fetchContent();
      setSuccess('Content deleted');
    } catch (err) {
      setError(err.message);
    }
  };

  const updateField = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const filteredContent = activeType === 'all' ? content : content.filter(c => c.type === activeType);
  const typeInfo = CONTENT_TYPES.find(t => t.key === activeType);

  return (
    <div className={styles.manager}>
      <div className={styles.header}>
        <div>
          <h1>Content Manager</h1>
          <p>Upload and manage all Arkcov Academy content</p>
        </div>
        <button className="btn btn-crimson" onClick={() => openNew(activeType)}>
          + Add Content
        </button>
      </div>

      {success && <div className="message message-success">{success}</div>}
      {error && !showForm && <div className="message message-error">{error}</div>}

      <div className={styles.typeBar}>
        {CONTENT_TYPES.map((type) => (
          <button
            key={type.key}
            className={`${styles.typeBtn} ${activeType === type.key ? styles.active : ''}`}
            onClick={() => setActiveType(type.key)}
          >
            <span>{type.icon}</span> {type.label}
          </button>
        ))}
      </div>

      {/* Content Form Modal */}
      {showForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{editingId ? 'Edit Content' : 'Add New Content'}</h2>
              <button className={styles.closeBtn} onClick={() => setShowForm(false)}>✕</button>
            </div>

            {error && <div className="message message-error">{error}</div>}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className="form-group" style={{ flex: 2 }}>
                  <label className="form-label">Title *</label>
                  <input className="form-input" value={form.title} onChange={e => updateField('title', e.target.value)} required placeholder="Enter content title" />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Type *</label>
                  <select className="form-input" value={form.type} onChange={e => updateField('type', e.target.value)}>
                    {CONTENT_TYPES.filter(t => t.key !== 'all').map(t => (
                      <option key={t.key} value={t.key}>{t.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input" value={form.description} onChange={e => updateField('description', e.target.value)} rows={3} placeholder="Describe this content..." style={{ resize: 'vertical' }} />
              </div>

              <div className={styles.formRow}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Thumbnail URL</label>
                  <input className="form-input" value={form.thumbnail_url} onChange={e => updateField('thumbnail_url', e.target.value)} placeholder="https://..." />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Media URL (Video/Audio)</label>
                  <input className="form-input" value={form.media_url} onChange={e => updateField('media_url', e.target.value)} placeholder="https://..." />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Trailer URL</label>
                  <input className="form-input" value={form.trailer_url} onChange={e => updateField('trailer_url', e.target.value)} placeholder="https://..." />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Access Level</label>
                  <select className="form-input" value={form.access_level} onChange={e => updateField('access_level', e.target.value)}>
                    {ACCESS_LEVELS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Category</label>
                  <input className="form-input" value={form.category} onChange={e => updateField('category', e.target.value)} placeholder="e.g., Sickle Cell, Wellness" />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Tags (comma-separated)</label>
                  <input className="form-input" value={form.tags} onChange={e => updateField('tags', e.target.value)} placeholder="e.g., scd, education, kids" />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Duration (minutes)</label>
                  <input className="form-input" type="number" value={form.duration_minutes} onChange={e => updateField('duration_minutes', e.target.value)} placeholder="e.g., 45" />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Release Year</label>
                  <input className="form-input" type="number" value={form.release_year} onChange={e => updateField('release_year', e.target.value)} placeholder="e.g., 2025" />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Rating</label>
                  <input className="form-input" value={form.rating} onChange={e => updateField('rating', e.target.value)} placeholder="e.g., G, PG" />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Sort Order</label>
                  <input className="form-input" type="number" value={form.sort_order} onChange={e => updateField('sort_order', e.target.value)} />
                </div>
              </div>

              <div className={styles.checkRow}>
                <label className={styles.checkLabel}>
                  <input type="checkbox" checked={form.featured} onChange={e => updateField('featured', e.target.checked)} />
                  <span className={styles.checkBox} />
                  Featured Content
                </label>
                <label className={styles.checkLabel}>
                  <input type="checkbox" checked={form.published} onChange={e => updateField('published', e.target.checked)} />
                  <span className={styles.checkBox} />
                  Published (visible to members)
                </label>
              </div>

              <div className={styles.formActions}>
                <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-crimson" disabled={saving}>
                  {saving ? <><div className="spinner" /> Saving...</> : (editingId ? 'Update Content' : 'Create Content')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Content Table */}
      {loading ? (
        <div className={styles.loadingState}>
          <div className="spinner" style={{ borderColor: 'var(--warm-gray)', borderTopColor: 'var(--crimson)', width: 32, height: 32 }} />
          <p>Loading content...</p>
        </div>
      ) : filteredContent.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>{typeInfo?.icon || '📋'}</div>
          <h3>No {typeInfo?.label || 'content'} yet</h3>
          <p>Add your first piece of content to get started</p>
          <button className="btn btn-crimson btn-sm" onClick={() => openNew(activeType)}>
            + Add {typeInfo?.label || 'Content'}
          </button>
        </div>
      ) : (
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.colTitle}>Title</div>
            <div className={styles.colType}>Type</div>
            <div className={styles.colAccess}>Access</div>
            <div className={styles.colStatus}>Status</div>
            <div className={styles.colActions}>Actions</div>
          </div>
          {filteredContent.map((item) => (
            <div key={item.id} className={styles.tableRow}>
              <div className={styles.colTitle}>
                <div className={styles.titleInfo}>
                  {item.thumbnail_url && (
                    <img src={item.thumbnail_url} alt="" className={styles.thumb} />
                  )}
                  <div>
                    <div className={styles.itemTitle}>{item.title}</div>
                    <div className={styles.itemMeta}>
                      {item.category && <span>{item.category}</span>}
                      {item.duration_minutes && <span>{item.duration_minutes} min</span>}
                      {item.featured && <span className={styles.featuredTag}>★ Featured</span>}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.colType}>
                <span className={styles.typePill}>
                  {CONTENT_TYPES.find(t => t.key === item.type)?.icon} {CONTENT_TYPES.find(t => t.key === item.type)?.label}
                </span>
              </div>
              <div className={styles.colAccess}>
                <span className={`${styles.accessPill} ${styles[item.access_level]}`}>
                  {item.access_level}
                </span>
              </div>
              <div className={styles.colStatus}>
                <span className={`${styles.statusDot} ${item.published ? styles.published : styles.draft}`} />
                {item.published ? 'Published' : 'Draft'}
              </div>
              <div className={styles.colActions}>
                <button className={styles.editBtn} onClick={() => openEdit(item)}>Edit</button>
                <button className={styles.deleteBtn} onClick={() => handleDelete(item.id, item.title)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
