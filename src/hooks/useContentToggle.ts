import { useEffect, useState } from "react";
import { HeaderContentType } from "@components/layout/header";

export const useContentToggle = () => {
  const [visibleContent, setVisibleContent] = useState<HeaderContentType | null>(null);

  const handleContentChange = (content: HeaderContentType | null) => {
    setVisibleContent(prev => (prev === content ? null : content));
  };

  useEffect(() => {
    if (!localStorage.getItem("isFirstVisit")) {
      setVisibleContent("Help");
      localStorage.setItem("isFirstVisit", "false");
    }
  }, []);

  return { visibleContent, handleContentChange };
};
