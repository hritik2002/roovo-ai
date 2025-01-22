import { useState } from "react";
import { Loader2 } from "lucide-react";

const ProfileImage = () => {
  const [gifLoaded, setGifLoaded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="relative w-8 h-8">
      {!imgLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-full">
          <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
        </div>
      )}

      <img
        src="/assets/logo.png"
        alt="Profile"
        className={`absolute inset-0 rounded-full ${
          imgLoaded && !gifLoaded ? "opacity-100" : "opacity-0"
        } ${gifLoaded ? "opacity-0" : "opacity-100"}`}
        onLoad={() => setImgLoaded(true)}
      />

      <img
        src="https://res.cloudinary.com/dnqfxuxsm/image/upload/v1737557845/safarmonk_aaz0tr.gif"
        alt="Profile GIF"
        className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
          gifLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setGifLoaded(true)}
      />
    </div>
  );
};

export default ProfileImage;
