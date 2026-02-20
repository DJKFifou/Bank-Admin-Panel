const LineSkeleton = ({ 
  height = '16px',
  width = '100%',
  maxWidth = '1000px',
}) => (
  <p 
    className="skeleton-list-item" 
    style={{ height, width, maxWidth }}
  ></p>
);

export default LineSkeleton;