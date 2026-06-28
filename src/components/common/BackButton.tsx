import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  to?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function BackButton({ to, className, children }: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant="ghost"
      className={className}
      onClick={handleClick}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      {children || "Back"}
    </Button>
  );
}
