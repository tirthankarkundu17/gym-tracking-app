import { useParams, useNavigate } from 'react-router-dom';
import videoData from '../data/videos.json';
import { useEffect } from 'react';

const VideoGridPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const category = videoData.categories.find(c => c.id === id);

    useEffect(() => {
        if (!category) {
            // handle error if needed
        }
    }, [category]);

    if (!category) {
        return (
            <div style={{ textAlign: 'center', marginTop: '5rem' }}>
                <h1>Category Not Found</h1>
                <button onClick={() => navigate('/')} className="back-button">Go Home</button>
            </div>
        )
    }

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <button onClick={() => navigate('/')} className="back-button">
                    &larr; WORKOUTS
                </button>
                <h1 style={{ margin: 0, fontSize: '2.5rem', textAlign: 'right' }}>{category.name.toUpperCase()}</h1>
            </div>

            <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
                {category.videos.map((video) => (
                    <div
                        key={video.id}
                        className="card video-card"
                        onClick={() => navigate(`/watch/${video.id}`)}
                        style={{ padding: '1rem', cursor: 'pointer' }}
                    >
                        <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'var(--bg-surface)' }}>
                            {video.thumbnailUrl ? (
                                <img
                                    src={video.thumbnailUrl}
                                    alt={video.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        opacity: 0.9,
                                        transition: 'transform 0.3s'
                                    }}
                                />
                            ) : (
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'var(--video-placeholder-bg)'
                                }}>
                                    <span style={{ fontSize: '3rem', opacity: 0.5 }}>🎬</span>
                                </div>
                            )}

                            {/* Play Overlay */}
                            <div className="play-overlay">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                                </svg>
                            </div>
                        </div>

                        <div className="video-title" style={{ marginTop: '1rem', marginBottom: '0.2rem' }}>{video.title}</div>
                    </div>
                ))}
            </div>

            {category.videos.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '3rem' }}>
                    No videos available for this category yet.
                </div>
            )}
        </div>
    );
};

export default VideoGridPage;
