'use client';

import { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { isYouTubeUrl, getYouTubeEmbedUrl, getYouTubeThumbnail } from '@/lib/youtube';
import styles from './explore.module.css';

const contentTypes = [
  { key: 'all', label: 'All', icon: '📋' },
  { key: 'course', label: 'Courses', icon: '📚' },
  { key: 'podcast', label: 'Podcasts', icon: '🎙️' },
  { key: 'movie', label: 'Movies', icon: '🎬' },
  { key: 'tv_show', label: 'TV Shows', icon: '📺' },
  { key: 'animated_short', label: 'Animated Shorts', icon: '✨' },
  { key: 'interactive_game', label: 'Games', icon: '🎮' },
];

function ExploreContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') || 'all';
  const [activeType, setActiveType] = useState(typeParam);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [heroItem, setHeroItem] = useState(null);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/content?type=${activeType}`);
      const data = await res.json();
      if (res.ok) {
        setContent(data.content || []);
        // Set featured item as hero
        const featured = (data.content || []).find(c => c.featured);
        setHeroItem(featured || (data.content || [])[0] || null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [activeType]);

  useEffect(() => { fetchContent(); }, [fetchContent]);

  // Group content by type for rows
  const grouped = {};
  content.forEach(item => {
    const typeLabel = contentTypes.find(t => t.key === item.type)?.label || item.type;
    if (!grouped[typeLabel]) grouped[typeLabel] = [];
    grouped[typeLabel].push(item);
  });

  // Also group by category if available
  const byCategory = {};
  content.forEach(item => {
    if (item.category) {
      if (!byCategory[item.category]) byCategory[item.category] = [];
      byCategory[item.category].push(item);
    }
  });

  const featuredItems = content.filter(c => c.featured);

  return (
    <div className={styles.explore}>
      {/* Filters */}
      <div className={styles.filters}>
        {contentTypes.map((type) => (
          <button
            key={type.key}
            className={`${styles.chip} ${activeType === type.key ? styles.active : ''}`}
            onClick={() => setActiveType(type.key)}
          >
            {type.icon} {type.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner} />
          <p>Loading content...</p>
        </div>
      ) : content.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🎬</div>
          <h3>Content Coming Soon</h3>
          <p>New content is being added to the library. Check back soon!</p>
          {user?.role === 'admin' && (
            <a href="/admin/content" className="btn btn-crimson btn-sm" style={{ marginTop: '1rem' }}>Upload Content</a>
          )}
        </div>
      ) : (
        <>
          {/* Hero Banner */}
          {heroItem && (
            <div className={styles.hero}>
              <div className={styles.heroBg}>
                {heroItem.thumbnail_url ? (
                  <img src={heroItem.thumbnail_url} alt="" className={styles.heroBgImg} />
                ) : (
                  <div className={styles.heroBgFallback} />
                )}
                <div className={styles.heroGradient} />
              </div>
              <div className={styles.heroContent}>
                <div className={styles.heroTag}>
                  {heroItem.featured && <span className={styles.heroFeatured}>★ Featured</span>}
                  <span className={styles.heroType}>
                    {contentTypes.find(t => t.key === heroItem.type)?.icon} {contentTypes.find(t => t.key === heroItem.type)?.label}
                  </span>
                </div>
                <h1 className={styles.heroTitle}>{heroItem.title}</h1>
                <p className={styles.heroDesc}>
                  {heroItem.description?.slice(0, 200)}{heroItem.description?.length > 200 ? '...' : ''}
                </p>
                <div className={styles.heroMeta}>
                  {heroItem.release_year && <span>{heroItem.release_year}</span>}
                  {heroItem.rating && <span className={styles.heroRating}>{heroItem.rating}</span>}
                  {heroItem.duration_minutes && <span>{heroItem.duration_minutes} min</span>}
                </div>
                <div className={styles.heroBtns}>
                  <button className={styles.playHeroBtn} onClick={() => setSelectedItem(heroItem)}>
                    ▶ Play Now
                  </button>
                  <button className={styles.infoHeroBtn} onClick={() => setSelectedItem(heroItem)}>
                    ℹ️ More Info
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Featured Row */}
          {featuredItems.length > 1 && (
            <ContentRow
              title="Featured"
              items={featuredItems}
              onSelect={setSelectedItem}
              size="large"
            />
          )}

          {/* Content Rows by Type */}
          {activeType === 'all' ? (
            Object.entries(grouped).map(([typeLabel, items]) => (
              <ContentRow key={typeLabel} title={typeLabel} items={items} onSelect={setSelectedItem} />
            ))
          ) : (
            <>
              {Object.entries(byCategory).length > 0 ? (
                Object.entries(byCategory).map(([cat, items]) => (
                  <ContentRow key={cat} title={cat} items={items} onSelect={setSelectedItem} />
                ))
              ) : (
                <ContentRow
                  title={contentTypes.find(t => t.key === activeType)?.label || 'Content'}
                  items={content}
                  onSelect={setSelectedItem}
                />
              )}
            </>
          )}
        </>
      )}

      {/* Detail Modal */}
      {selectedItem && (
        <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense>
      <ExploreContent />
    </Suspense>
  );
}

function ContentRow({ title, items, onSelect, size = 'normal' }) {
  const rowRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = rowRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir) => {
    const el = rowRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = rowRef.current;
    if (el) {
      checkScroll();
      el.addEventListener('scroll', checkScroll);
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, [items]);

  return (
    <div className={styles.rowSection}>
      <div className={styles.rowHeader}>
        <h2 className={styles.rowTitle}>{title}</h2>
        <div className={styles.scrollBtns}>
          {canScrollLeft && (
            <button className={styles.scrollBtn} onClick={() => scroll('left')}>‹</button>
          )}
          {canScrollRight && (
            <button className={styles.scrollBtn} onClick={() => scroll('right')}>›</button>
          )}
        </div>
      </div>
      <div className={`${styles.scrollRow} ${size === 'large' ? styles.scrollRowLarge : ''}`} ref={rowRef}>
        {items.map(item => (
          <ContentCard key={item.id} item={item} onSelect={onSelect} size={size} />
        ))}
      </div>
    </div>
  );
}

function ContentCard({ item, onSelect, size }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);
  const typeInfo = contentTypes.find(t => t.key === item.type);
  const mediaUrl = item.media_url || item.trailer_url;
  const isYT = isYouTubeUrl(mediaUrl);
  const thumbUrl = item.thumbnail_url || (isYT ? getYouTubeThumbnail(mediaUrl) : null);

  // Auto-play trailer preview on hover
  useEffect(() => {
    if (hovered && videoRef.current && item.trailer_url) {
      videoRef.current.play().catch(() => {});
    } else if (!hovered && videoRef.current) {
      videoRef.current.pause();
      if (videoRef.current) videoRef.current.currentTime = 0;
    }
  }, [hovered, item.trailer_url]);

  return (
    <div
      className={`${styles.card} ${size === 'large' ? styles.cardLarge : ''}`}
      onClick={() => onSelect(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.cardThumb}>
        {hovered && item.trailer_url && !isYouTubeUrl(item.trailer_url) ? (
          <video ref={videoRef} src={item.trailer_url} muted loop playsInline className={styles.cardVideo} />
        ) : thumbUrl ? (
          <img src={thumbUrl} alt={item.title} />
        ) : (
          <div className={styles.thumbPlaceholder}>{typeInfo?.icon || '🎬'}</div>
        )}
        <div className={`${styles.cardOverlay} ${hovered ? styles.cardOverlayVisible : ''}`}>
          <div className={styles.playBtn}>▶</div>
        </div>
        {item.featured && <div className={styles.featuredBadge}>★ Featured</div>}
        <div className={styles.accessBadge} data-level={item.access_level}>
          {item.access_level === 'free' ? 'FREE' : item.access_level.toUpperCase()}
        </div>
        {item.duration_minutes && (
          <div className={styles.durationBadge}>{item.duration_minutes} min</div>
        )}
      </div>
      <div className={styles.cardBody}>
        <h3>{item.title}</h3>
        <div className={styles.cardMeta}>
          <span className={styles.cardType}>{typeInfo?.icon} {typeInfo?.label}</span>
          {item.rating && <span>{item.rating}</span>}
          {item.release_year && <span>{item.release_year}</span>}
        </div>
      </div>
    </div>
  );
}

function DetailModal({ item, onClose }) {
  const typeInfo = contentTypes.find(t => t.key === item.type);
  const videoRef = useRef(null);
  const mediaUrl = item.media_url || item.trailer_url;
  const isYT = isYouTubeUrl(mediaUrl);

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalCard} onClick={e => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>✕</button>

        {/* Video/Thumbnail Hero */}
        <div className={styles.modalHero}>
          {isYT ? (
            <iframe
              src={getYouTubeEmbedUrl(mediaUrl)}
              className={styles.modalVideo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: 'none', width: '100%', height: '100%' }}
            />
          ) : mediaUrl ? (
            <video
              ref={videoRef}
              src={mediaUrl}
              controls
              autoPlay
              className={styles.modalVideo}
            />
          ) : item.thumbnail_url ? (
            <img src={item.thumbnail_url} alt={item.title} className={styles.modalThumb} />
          ) : (
            <div className={styles.modalThumbFallback}>{typeInfo?.icon || '🎬'}</div>
          )}
        </div>

        {/* Info */}
        <div className={styles.modalInfo}>
          <div className={styles.modalTags}>
            {item.featured && <span className={styles.modalFeaturedTag}>★ Featured</span>}
            <span className={styles.modalTypeTag}>{typeInfo?.icon} {typeInfo?.label}</span>
            {item.access_level !== 'free' && (
              <span className={styles.modalAccessTag}>{item.access_level}</span>
            )}
          </div>
          <h1 className={styles.modalTitle}>{item.title}</h1>
          <div className={styles.modalMeta}>
            {item.release_year && <span>{item.release_year}</span>}
            {item.rating && <span className={styles.modalRating}>{item.rating}</span>}
            {item.duration_minutes && <span>{item.duration_minutes} min</span>}
            {item.category && <span>{item.category}</span>}
          </div>
          <p className={styles.modalDesc}>{item.description}</p>
          {item.tags && item.tags.length > 0 && (
            <div className={styles.modalTagsList}>
              {item.tags.map((tag, i) => (
                <span key={i} className={styles.modalTag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
