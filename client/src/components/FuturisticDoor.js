'use client'

import React, { useState, useEffect, useRef } from 'react';

/**
 * @typedef {Object} FuturisticDoorProps
 * @property {string} id - Định danh duy nhất cho phi thuyền
 * @property {string} content - Nội dung văn bản bên trong phi thuyền
 * @property {string} date - Ngày tháng liên quan đến nội dung
 * @property {string} imageUrl - Đường dẫn đến hình ảnh minh họa
 * @property {number} [initialX=0] - Vị trí X ban đầu
 * @property {number} [initialY=0] - Vị trí Y ban đầu
 * @property {number} [initialVelocityX=0] - Vận tốc X ban đầu
 * @property {number} [initialVelocityY=0] - Vận tốc Y ban đầu
 * @property {boolean} [isFloating=false] - Liệu phi thuyền có đang bay không
 * @property {Function} [onDragStart] - Xử lý khi bắt đầu kéo
 * @property {string} [className=""] - Các lớp CSS bổ sung
 */

export function FuturisticDoor({
  id,
  content,
  date,
  imageUrl,
  initialX = 0,
  initialY = 0,
  initialVelocityX = 0.8,  // Mặc định có giá trị để luôn di chuyển
  initialVelocityY = -0.5, // Mặc định có giá trị để luôn di chuyển
  isFloating = false,
  onDragStart,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [velocity, setVelocity] = useState({ x: initialVelocityX, y: initialVelocityY });
  
  const doorRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  // Xử lý hiệu ứng bay của phi thuyền
  useEffect(() => {
    // Chỉ áp dụng nếu phi thuyền được thiết lập bay và container đã được tạo
    if (!isFloating || !containerRef.current || !doorRef.current) return;
    
    console.log(`Phi thuyền ${id} bắt đầu di chuyển. Vận tốc X: ${velocity.x}, Y: ${velocity.y}`);
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const doorWidth = doorRef.current.offsetWidth || 140; // Mặc định nếu không xác định được
    const doorHeight = doorRef.current.offsetHeight || 100; // Mặc định nếu không xác định được
    
    // Tính toán giới hạn để đảm bảo phi thuyền không ra khỏi vùng hiển thị
    const maxX = Math.max(10, containerRect.width - doorWidth - 10);
    const maxY = Math.max(10, containerRect.height - doorHeight - 10);
    
    const animate = () => {
      // Nếu phi thuyền đang được mở hoặc hover, dừng animation
      if (isOpen || isHovered) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      setPosition(prevPos => {
        let newX = prevPos.x + velocity.x;
        let newY = prevPos.y + velocity.y;
        let newVelX = velocity.x;
        let newVelY = velocity.y;
        
        // Đổi hướng khi chạm biên
        if (newX <= 0 || newX >= maxX) {
          newVelX = -newVelX;
          // Thêm một chút nhiễu để tránh chuyển động đều
          newVelX += (Math.random() - 0.5) * 0.2;
        }
        
        if (newY <= 0 || newY >= maxY) {
          newVelY = -newVelY;
          // Thêm một chút nhiễu để tránh chuyển động đều
          newVelY += (Math.random() - 0.5) * 0.2;
        }
        
        // Giữ phi thuyền trong vùng hiển thị
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
        
        if (newVelX !== velocity.x || newVelY !== velocity.y) {
          setVelocity({ x: newVelX, y: newVelY });
        }
        
        return { x: newX, y: newY };
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Luôn bắt đầu animation nếu phi thuyền đang bay
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        console.log(`Phi thuyền ${id} dừng di chuyển.`);
      }
    };
  }, [velocity, isHovered, isOpen, isFloating]);

  // Xử lý khi click vào phi thuyền
  const handleClick = () => {
    console.log(`Phi thuyền ${id} được click. Nội dung: ${content}`);
    setIsOpen(!isOpen);
    
    // Phát âm thanh khi click (tuỳ chọn)
    try {
      const audio = new Audio();
      audio.src = isOpen ? '/click-close.mp3' : '/click-open.mp3';
      audio.volume = 0.2;
      audio.play().catch(e => console.log('Không thể phát âm thanh:', e));
    } catch (e) {
      // Bỏ qua lỗi nếu trình duyệt không hỗ trợ
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={isFloating ? { position: 'absolute', width: '100%', height: '100%' } : {}}
    >
      <div
        ref={doorRef}
        className="alien-vehicle w-36 h-24 cursor-pointer flex flex-col items-center justify-center p-3 relative overflow-hidden"
        draggable={!isFloating}
        onDragStart={onDragStart}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: `linear-gradient(135deg, 
            rgba(20, 20, 40, 0.9) 0%, 
            rgba(40, 20, 60, 0.8) 30%, 
            rgba(60, 40, 80, 0.9) 70%, 
            rgba(20, 20, 40, 0.9) 100%)`,
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          border: "2px solid rgba(0, 255, 255, 0.3)",
          boxShadow: `
            0 0 20px rgba(0, 255, 255, 0.3),
            inset 0 0 20px rgba(100, 0, 255, 0.2),
            0 8px 32px rgba(0, 0, 0, 0.3)
          `,
          transform: isHovered ? "scale(1.1) rotateY(10deg)" : "scale(1)",
          transition: isHovered ? "all 0.3s ease-in-out" : "none", /* Only transition on hover, not during animation */
          position: isFloating ? 'absolute' : 'relative',
          left: isFloating ? `${position.x}px` : 'auto',
          top: isFloating ? `${position.y}px` : 'auto',
          zIndex: isOpen ? 999 : (isHovered ? 50 : 10),
          willChange: 'transform, left, top', /* Optimize animation performance */
        }}
      >
        {/* Central Core */}
        <div
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle at center, rgba(0, 255, 255, 0.4) 0%, transparent 70%)",
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          }}
        />

        {/* Alien Lights */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          <div
            className={`w-2 h-2 rounded-full ${isHovered ? "bg-cyan-400 animate-pulse" : "bg-cyan-600"} shadow-lg shadow-cyan-400/50`}
          ></div>
          <div
            className={`w-2 h-2 rounded-full ${isHovered ? "bg-purple-400 animate-pulse" : "bg-purple-600"} shadow-lg shadow-purple-400/50`}
          ></div>
          <div
            className={`w-2 h-2 rounded-full ${isHovered ? "bg-green-400 animate-pulse" : "bg-green-600"} shadow-lg shadow-green-400/50`}
          ></div>
        </div>

        {/* Room Number as Alien Symbol */}
        <div
          className="room-number absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-mono text-cyan-300 bg-black/50 px-2 py-1 rounded-full border border-cyan-400/30"
          style={{ fontSize: "10px" }}
        >
          {date}
        </div>

        <div
          className={`text-3xl mb-1 transition-all duration-300 ${isHovered ? "scale-125 animate-bounce" : ""}`}
          style={{
            filter: "drop-shadow(0 0 10px rgba(0, 255, 255, 0.8))",
            color: isHovered ? "#00ffff" : "#40e0d0",
          }}
        >
          🛸
        </div>

        {/* Energy Beam Effect */}
        {isHovered && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-16 opacity-60">
            <div
              className="w-full h-full animate-pulse"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0, 255, 255, 0.8) 0%, rgba(0, 255, 255, 0.2) 50%, transparent 100%)",
                clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
              }}
            />
          </div>
        )}

        {/* Status Indicator */}
        <div
          className={`absolute top-1 right-2 w-2 h-2 rounded-full transition-all duration-300 ${
            isOpen
              ? "bg-red-400 shadow-lg shadow-red-400/50 animate-pulse"
              : "bg-green-400 shadow-lg shadow-green-400/50 animate-pulse"
          }`}
        ></div>

        {isHovered && (
          <>
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }}
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse"></div>
              <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse"></div>
              <div className="absolute right-0 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-pink-400 to-transparent animate-pulse"></div>
            </div>

            {/* Scanning Effect */}
            <div
              className="absolute inset-0 animate-pulse"
              style={{
                background: "conic-gradient(from 0deg, transparent, rgba(0, 255, 255, 0.1), transparent)",
                borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              }}
            />
          </>
        )}
      </div>

      {/* Content Popup - Fixed position to ensure visibility */}
      {isOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-80 max-w-sm animate-popup-fade-in">
          <div className="door-content rounded-lg p-6 relative" 
            style={{
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(12px)',
              border: '2px solid rgba(0, 255, 255, 0.3)',
              boxShadow: '0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 0, 20, 0.4)'
            }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="absolute top-2 right-2 text-cyan-300 hover:text-cyan-100 hover:rotate-90 transform transition-all duration-200 text-lg font-bold"
            >
              ✕
            </button>

            <div className="flex flex-col items-center">
              <img
                src={imageUrl || "/logo.svg"}
                alt="Nội dung"
                className="w-20 h-20 object-cover rounded-lg mb-4 border-2 border-cyan-400/50 shadow-lg shadow-cyan-400/20 animate-floating"
              />
  
              {/* Content */}
              <p className="text-white text-center text-base leading-relaxed mb-3">{content}</p>
  
              <div className="mt-2 text-xs text-cyan-300 font-mono py-1 px-3 rounded-full border border-cyan-500/30 bg-cyan-900/30">
                UFO {date}
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx="true">{`
        @keyframes popup-fade-in {
          from { opacity: 0; transform: translate(-50%, -40%) scale(0.8); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        
        @keyframes floating {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-popup-fade-in {
          animation: popup-fade-in 0.3s ease-out forwards;
        }
        
        .animate-floating {
          animation: floating 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
