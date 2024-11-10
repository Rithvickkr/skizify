import { useState, useEffect } from "react";

interface SkizzerModalProps {
  isSkizzer: boolean;
}

const SkizzerModal = ({ isSkizzer }: SkizzerModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Show the modal if the user is a Skizzer
  useEffect(() => {
    if (isSkizzer) {
      setIsModalOpen(true);
    }
  }, [isSkizzer]);

  // Close modal handler
  const closeModal = () => setIsModalOpen(false);
  window.alert("hi")
  if (!isModalOpen) return null; // Don't render modal if not open
    
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Welcome Skizzer!</h2>
        <p>As a Skizzer, you can create profiles and connect with others.</p>
        <button onClick={closeModal}>Close</button>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.5);
          z-index: 9999;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          width: 400px;
          max-width: 90%;
        }
        button {
          margin-top: 10px;
          padding: 10px;
          border: none;
          background: #0070f3;
          color: white;
          cursor: pointer;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default SkizzerModal;
