const ListSkeleton = ({ 
  lines = 20,
  height = '16px',
  width = '100%',
  maxWidth = '1000px',
}) => (
  <ul>
    { Array.from({ length: lines }).map((_, index) => (
      <li 
        className="skeleton-list-item" 
        key={index} 
        style={{ height, width, maxWidth }}
      ></li>
    )) }
  </ul>
);

export default ListSkeleton;