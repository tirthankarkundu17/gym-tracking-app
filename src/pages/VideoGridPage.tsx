import { useParams, useNavigate } from 'react-router-dom';
import videoData from '../data/videos.json';
import { useEffect } from 'react';

const VideoGridPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const category = videoData.categories.find(c => c.id === id);

    useEffect(() => {
        if (!category) {
            // Create a timer to redirect back or just show message
        }
    }, [category, navigate]);

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

            <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
                {category.videos.map((video) => (
                    <div key={video.id} className="card" style={{ cursor: 'default', padding: '1.5rem' }}>
                        <video
                            controls
                            width="100%"
                            poster={video.thumbnailUrl || undefined}
                            preload="metadata"
                            style={{ borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)', backgroundColor: '#000' }}
                        >
                            <source src={video.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="video-title">{video.title}</div>
                    </div>
                ))}
            </div>

            {category.videos.length === 0 && (
                <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '3rem' }}>
                    No videos available for this category yet.
                </div>
            )}
        </div>
    );
};

export default VideoGridPage;
