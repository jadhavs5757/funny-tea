import { useEffect, useState } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  isExiting: boolean;
}

export default function LoadingScreen({ isExiting }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar from 0 to 100% over 1200ms
    const startTime = performance.now();
    const duration = 1200;

    let frameId: number;
    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(currentProgress);

      if (elapsed < duration) {
        frameId = requestAnimationFrame(updateProgress);
      }
    };

    frameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className={`loading-screen-wrapper ${isExiting ? 'exit-fade' : ''}`}>
      {/* Subtle Background Radial Gradient */}
      <div className="loading-bg-gradient"></div>

      {/* Steam lines rising behind the logo */}
      <div className="loading-steam-container">
        <span className="loading-steam-line lsl-1"></span>
        <span className="loading-steam-line lsl-2"></span>
        <span className="loading-steam-line lsl-3"></span>
      </div>

      <div className="loading-content">
        <div className="loading-logo-box">
          <img 
            src="/images/logo/funny-tea-logo.png" 
            alt="Funny Tea Logo" 
            className="loading-logo-img" 
          />
        </div>
        
        <h2 className="loading-text">Brewing Happiness...</h2>

        {/* Progress Bar Container */}
        <div className="loading-progress-container">
          <div 
            className="loading-progress-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
