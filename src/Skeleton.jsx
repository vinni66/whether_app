import './Skeleton.css';

const Skeleton = ({ width, height, className = '', style = {} }) => {
    return (
        <div
            className={`skeleton-glass ${className}`}
            style={{ width, height, ...style }}
        >
            <div className="skeleton-shimmer"></div>
        </div>
    );
};

export default Skeleton;
