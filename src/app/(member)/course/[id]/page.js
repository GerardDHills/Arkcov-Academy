'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { isYouTubeUrl, getYouTubeEmbedUrl } from '@/lib/youtube';
import styles from './course.module.css';

export default function CourseViewerPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentLesson, setCurrentLesson] = useState(null);
  const videoRef = useRef(null);
  const progressInterval = useRef(null);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const [contentRes, progressRes] = await Promise.all([
          fetch(`/api/content?type=course`),
          fetch(`/api/progress?contentId=${id}`),
        ]);
        const contentData = await contentRes.json();
        const progressData = await progressRes.json();

        const courseItem = (contentData.content || []).find(c => c.id === parseInt(id));
        setCourse(courseItem);
        setProgress(progressData.progress || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [id]);

  const saveProgress = useCallback(async (percent, position, completed = false) => {
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentId: parseInt(id),
          lessonId: currentLesson?.id || null,
          progressPercent: Math.round(percent),
          lastPositionSeconds: Math.round(position),
          completed,
        }),
      });
    } catch (err) {
      console.error('Failed to save progress:', err);
    }
  }, [id, currentLesson]);

  // Auto-save progress every 15 seconds
  useEffect(() => {
    if (!course?.media_url && !currentLesson) return;

    progressInterval.current = setInterval(() => {
      const video = videoRef.current;
      if (video && video.duration > 0) {
        const percent = (video.currentTime / video.duration) * 100;
        saveProgress(percent, video.currentTime);
      }
    }, 15000);

    return () => clearInterval(progressInterval.current);
  }, [course, currentLesson, saveProgress]);

  const handleVideoEnded = () => {
    saveProgress(100, 0, true);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration > 0) {
      const percent = (video.currentTime / video.duration) * 100;
      if (percent > 95) {
        saveProgress(100, video.currentTime, true);
      }
    }
  };

  const courseProgress = progress.find(p => !p.lesson_id);
  const overallPercent = courseProgress?.progress_percent || 0;
  const isCompleted = courseProgress?.completed || false;

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.loadingSpinner} />
        <p>Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className={styles.errorPage}>
        <h2>Course not found</h2>
        <Link href="/explore?type=course" className="btn btn-outline">Back to Courses</Link>
      </div>
    );
  }

  return (
    <div className={styles.viewer}>
      {/* Video Player */}
      <div className={styles.playerSection}>
        <div className={styles.videoWrap}>
          {course.media_url && isYouTubeUrl(course.media_url) ? (
            <iframe
              src={getYouTubeEmbedUrl(course.media_url)}
              className={styles.video}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: 'none', width: '100%', height: '100%' }}
            />
          ) : course.media_url ? (
            <video
              ref={videoRef}
              src={course.media_url}
              controls
              className={styles.video}
              onEnded={handleVideoEnded}
              onTimeUpdate={handleTimeUpdate}
            />
          ) : (
            <div className={styles.noVideo}>
              <span>📚</span>
              <p>Video content coming soon</p>
            </div>
          )}
        </div>
      </div>

      {/* Course Info */}
      <div className={styles.infoSection}>
        <div className={styles.courseHeader}>
          <div>
            <Link href="/explore?type=course" className={styles.backLink}>← Back to Courses</Link>
            <h1>{course.title}</h1>
            <div className={styles.meta}>
              {course.duration_minutes && <span>⏱ {course.duration_minutes} min</span>}
              {course.rating && <span>{course.rating}</span>}
              {course.category && <span>{course.category}</span>}
            </div>
          </div>
          <div className={styles.progressRing}>
            <svg viewBox="0 0 80 80" className={styles.ringSvg}>
              <circle cx="40" cy="40" r="35" fill="none" stroke="var(--warm-gray)" strokeWidth="6" />
              <circle
                cx="40" cy="40" r="35" fill="none"
                stroke={isCompleted ? 'var(--accent-teal)' : 'var(--crimson)'}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 35}`}
                strokeDashoffset={`${2 * Math.PI * 35 * (1 - overallPercent / 100)}`}
                transform="rotate(-90 40 40)"
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
            </svg>
            <div className={styles.ringText}>
              {isCompleted ? '✓' : `${Math.round(overallPercent)}%`}
            </div>
          </div>
        </div>

        <p className={styles.description}>{course.description}</p>

        {isCompleted && (
          <div className={styles.completedBanner}>
            <span className={styles.completedIcon}>🎉</span>
            <div>
              <h3>Course Completed!</h3>
              <p>Great work, warrior! You've finished this course.</p>
            </div>
          </div>
        )}

        {course.tags && course.tags.length > 0 && (
          <div className={styles.tags}>
            {course.tags.map((tag, i) => (
              <span key={i} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
