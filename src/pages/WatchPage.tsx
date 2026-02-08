import { useNavigate, useParams } from 'react-router-dom';
import videoData from '../data/videos.json';
import { getAssetUrl } from '../utils/assetUtils';

const WatchPage = () => {
    const { videoId } = useParams<{ videoId: string }>();
    const navigate = useNavigate();

    // Find the video and its category
    let video = null;
    let category = null;

    for (const cat of videoData.categories) {
        const v = cat.videos.find(v => v.id === videoId);
        if (v) {
            video = v;
            category = cat;
            break;
        }
    }

    if (!video) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center" style={{ minHeight: '60vh' }}>
                <h2 className="text-2xl mb-4" style={{ color: 'var(--text-main)' }}>Video Not Found</h2>
                <button onClick={() => navigate('/')} className="back-button">
                    Return Home
                </button>
            </div>
        );
    }

    return (
        <div
            key={video.id} // Force re-render when video changes to reset scroll and reload video
            className="animate-fade-in"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 9999,
                backgroundColor: 'var(--bg-body)',
                backgroundImage: 'var(--bg-gradient)',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* Main Video Player - Taking up full screen */}
            <div className="video-wrapper relative" style={{
                width: '100%',
                height: '80dvh', // Use dvh for mobile address bar handling
                flexShrink: 0,
                position: 'relative',
                background: '#000',
                borderRadius: 0, // Override default border radius
                aspectRatio: 'unset' // Remove aspect ratio constraint
            }}>
                <video
                    controls
                    autoPlay
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    poster={video.thumbnailUrl ? getAssetUrl(video.thumbnailUrl) : undefined}
                >
                    <source src={getAssetUrl(video.videoUrl)} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Overlay Back Button */}
                <button
                    onClick={() => navigate(`/category/${category?.id}`)}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        zIndex: 20,
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(4px)',
                        padding: 0
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {/* Video Details & Related Content */}
            <div className="video-info px-4 py-6" style={{ minHeight: '30vh' }}>
                <h1 style={{ fontSize: '1.5rem', textAlign: 'left', marginBottom: '2rem' }}>{video.title}</h1>

                {/* Related Videos (Same Category) */}
                <div className="mt-8">
                    <h3 className="section-title">
                        More from {category?.name}
                    </h3>
                    <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem' }}>
                        {category?.videos
                            .filter(v => v.id !== video.id)
                            .map(v => (
                                <div
                                    key={v.id}
                                    className="card video-card"
                                    onClick={() => navigate(`/watch/${v.id}`)}
                                    style={{ padding: '0.75rem', cursor: 'pointer', minHeight: 'auto' }}
                                >
                                    <div className="aspect-video rounded-xl overflow-hidden relative mb-2" style={{ aspectRatio: '16/9' }}>
                                        {v.thumbnailUrl ? (
                                            <img src={getAssetUrl(v.thumbnailUrl)} alt={v.title} className="w-full h-full object-cover" style={{ borderRadius: '8px', height: '100%' }} />
                                        ) : (
                                            <div className="placeholder-video">
                                                <span style={{ fontSize: '2rem' }}>🎬</span>
                                            </div>
                                        )}
                                        <div className="play-overlay" style={{ width: '30px', height: '30px', fontSize: '1rem', borderWidth: '1.5px' }}>
                                            ▶
                                        </div>
                                    </div>
                                    <h4 style={{
                                        margin: '0.5rem 0',
                                        color: 'var(--text-main)',
                                        fontSize: '0.85rem',
                                        lineHeight: '1.3'
                                    }}>
                                        {v.title}
                                    </h4>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchPage;
