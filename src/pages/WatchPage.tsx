import { useNavigate, useParams } from 'react-router-dom';
import videoData from '../data/videos.json';

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
                <h2 className="text-2xl mb-4 text-slate-200">Video Not Found</h2>
                <button onClick={() => navigate('/')} className="back-button">
                    Return Home
                </button>
            </div>
        );
    }

    return (
        <div className="animate-fade-in w-full max-w-4xl mx-auto">
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
            <div className="w-full bg-black rounded-xl overflow-hidden shadow-2xl relative" style={{ aspectRatio: '16/9' }}>
                <video
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                    poster={video.thumbnailUrl || undefined}
                >
                    <source src={video.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Video Details */}
            <div className="mt-6 px-2">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">
                    {video.title}
                </h1>

                {/* Related Videos (Same Category) */}
                <div className="mt-12">
                    <h3 className="text-lg font-semibold text-slate-400 mb-4 border-b border-slate-700 pb-2">
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
                                    <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden relative mb-2" style={{ aspectRatio: '16/9' }}>
                                        {v.thumbnailUrl ? (
                                            <img src={v.thumbnailUrl} alt={v.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-2xl">🎬</div>
                                        )}
                                        <div className="play-overlay" style={{ width: '40px', height: '40px', fontSize: '1.2rem', borderWidth: '1.5px' }}>
                                            ▶
                                        </div>
                                    </div>
                                    <h4 className="text-sm font-medium text-slate-300 line-clamp-2 md:text-base">
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
