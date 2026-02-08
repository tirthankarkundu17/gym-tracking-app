import { Link } from 'react-router-dom';
import videoData from '../data/videos.json';

const LandingPage = () => {
    return (
        <div className="animate-fade-in">
            <h1>CHOOSE YOUR WORKOUT</h1>
            <div className="grid-container">
                {videoData.categories.map((category) => (
                    <Link key={category.id} to={`/category/${category.id}`} style={{ textDecoration: 'none' }}>
                        <div className="card">
                            {category.image ? (
                                <img src={category.image} alt={category.name} />
                            ) : (
                                <div style={{ height: '200px', background: 'var(--bg-surface-hover)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span>No Image</span>
                                </div>
                            )}
                            <h3>{category.name}</h3>
                            <p>{category.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;
