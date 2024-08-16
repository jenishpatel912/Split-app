import React from "react";

function ProfileIcon({ size = 30, color = "#000000" }) {
  return (
    <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      {/* <circle cx="12" cy="12" r="10" fill="#808080" /> */}
      <path
        d="M12 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4m0-2c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zM21.67 20.3C20.56 18.78 17.62 18 12 18s-8.56.78-9.67 2.3C1.24 21.05 2.67 22 12 22s10.76-.95 9.67-1.7z"
        fill="#fff"
      />
    </svg>
    </div>
  );
}

export default ProfileIcon;
