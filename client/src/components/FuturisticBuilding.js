import React, { useState, useEffect } from 'react';
import { FuturisticDoor } from './FuturisticDoor';

/**
 * FuturisticBuilding component - An interactive building visualization with floating UFOs (doors)
 * 
 * @param {Object} props - Component properties
 * @param {Array} props.doors - Array of door data objects
 * @param {number} props.width - Width of the container
 * @param {number} props.height - Height of the container
 */
const FuturisticBuilding = ({ doors = [], width = '100%', height = '80vh' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(true);

  console.log("Số lượng phi thuyền:", doors.length);
  console.log("Chi tiết phi thuyền:", doors);

  useEffect(() => {
    // Staggered animation for doors to appear
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseInfo = () => {
    setShowInfoModal(false);
  };

  return (
    <div 
      className="futuristic-building relative overflow-hidden bg-slate-900 transition-all duration-700"
      style={{ 
        width: width, 
        height: height,
        background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)'
      }}
    >
      {/* Star field background */}
      <div className="stars absolute inset-0">
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite ${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Grid lines */}
      <div className="grid-lines absolute inset-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`h-line-${i}`}
            className="absolute h-px w-full bg-cyan-900/20"
            style={{
              top: `${i * 10 + 5}%`,
              animation: 'gridFade 8s infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`v-line-${i}`}
            className="absolute w-px h-full bg-cyan-900/20"
            style={{
              left: `${i * 10 + 5}%`,
              animation: 'gridFade 8s infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Floating UFOs */}
      <div className="doors-container absolute inset-0">
        {/* Hiển thị phi thuyền từ dữ liệu */}
        {doors.map((door, index) => (
          <FuturisticDoor
            key={door._id || `door-${index}`}
            id={door._id || `door-${index}`}
            content={door.content}
            date={door.date}
            imageUrl={door.imageUrl}
            initialX={door.initialX}
            initialY={door.initialY}
            initialVelocityX={door.initialVelocityX}
            initialVelocityY={door.initialVelocityY}
            isFloating={true}
            className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transitionDelay: `${index * 200}ms`,
            }}
          />
        ))}
        
        {/* Phi thuyền mẫu luôn hiển thị nếu không có dữ liệu */}
        {doors.length === 0 && (
          <>
            <FuturisticDoor
              id="static-door-1"
              content="Sáng tạo là chìa khóa của đổi mới"
              date="Th 12"
              imageUrl="/logo.svg"
              initialX={100}
              initialY={200}
              initialVelocityX={2.0}
              initialVelocityY={-1.5}
              isFloating={true}
              className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
            <FuturisticDoor
              id="static-door-2"
              content="Học hỏi không bao giờ ngừng lại"
              date="Th 1"
              imageUrl="/logo.svg"
              initialX={500}
              initialY={300}
              initialVelocityX={-2.0}
              initialVelocityY={1.2}
              isFloating={true}
              className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
            <FuturisticDoor
              id="static-door-3"
              content="Công nghệ phải trao quyền cho con người"
              date="Th 3"
              imageUrl="/logo.svg"
              initialX={800}
              initialY={150}
              initialVelocityX={-1.5}
              initialVelocityY={-1.8}
              isFloating={true}
              className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </>
        )}
      </div>
      
      {/* Info Modal */}
      {showInfoModal && (
        <div className="info-modal absolute left-1/2 bottom-10 transform -translate-x-1/2 bg-black/80 text-white p-5 rounded-lg border border-cyan-500/30 max-w-sm backdrop-blur-lg animate-fade-in">
          <h3 className="text-cyan-400 text-lg font-bold mb-2">Welcome to the Thought Space</h3>
          <p className="text-sm text-gray-300 mb-3">
            Explore the floating UFOs to discover thoughts and values. Each UFO contains a unique perspective or idea.
          </p>
          <button 
            onClick={handleCloseInfo}
            className="px-4 py-2 bg-cyan-700 hover:bg-cyan-600 text-white rounded-md transition-colors duration-200 shadow-lg shadow-cyan-900/50"
          >
            Got it
          </button>
        </div>
      )}
      
      {/* Style for animations */}
      <style jsx="true">{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        
        @keyframes gridFade {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FuturisticBuilding;
