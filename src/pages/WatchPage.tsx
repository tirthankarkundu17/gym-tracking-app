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
        <div className="animate-fade-in watch-container">
            {/* Navigation Header */}
            <div className="flex items-center justify-between mb-4 px-2">
                <button
                    onClick={() => navigate(`/category/${category?.id}`)}
                    className="back-button"
                    style={{ margin: 0 }}
                >
                    &larr; {category?.name.toUpperCase()}
                </button>
            </div>

            {/* Main Video Player */}
            <div className="video-wrapper relative">
                <video
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                    poster={video.thumbnailUrl ? getAssetUrl(video.thumbnailUrl) : undefined}
                >
                    <source src={getAssetUrl(video.videoUrl)} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Video Details */}
            <div className="video-info px-2">
                <h1>{video.title}</h1>

                {/* Related Videos (Same Category) */}
                <div className="mt-12">
                    <h3 className="section-title">
                        More from {category?.name}
                    </h3>
                    <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
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
                                            <img src={getAssetUrl(v.thumbnailUrl)} alt={v.title} className="w-full h-full object-cover" style={{ borderRadius: '8px' }} />
                                        ) : (
                                            <div className="placeholder-video">
                                                <span style={{ fontSize: '2rem' }}>🎬</span>
                                            </div>
                                        )}
                                        <div className="play-overlay" style={{ width: '40px', height: '40px', fontSize: '1.2rem', borderWidth: '1.5px' }}>
                                            ▶
                                        </div>
                                    </div>
                                    <h4 style={{
                                        margin: '0.5rem 0',
                                        color: 'var(--text-main)',
                                        fontSize: '0.9rem',
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
