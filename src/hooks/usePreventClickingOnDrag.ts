import React, { useState, useRef } from 'react';

export function usePreventClickOnDrag(threshold = 5) {
  const [dragging, setDragging] = useState(false);
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    setDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragStartPos.current) return;

    const dx = Math.abs(e.clientX - dragStartPos.current.x);
    const dy = Math.abs(e.clientY - dragStartPos.current.y);

    if (dx > threshold || dy > threshold) {
      setDragging(true);
    }
  };

  const shouldTriggerClick = () => !dragging;

  return { onMouseDown, onMouseMove, shouldTriggerClick };
}
