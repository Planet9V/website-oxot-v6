import React from "react";
import Image from "next/image";

export interface DrawioIconProps {
  category: string;
  name: string;
  size?: number;
  className?: string;
  alt?: string;
}

/**
 * Universal Draw.io / Stencil Vector Icon Renderer for Next.js & React
 * Renders vector SVGs and assets from the new_material_source/asset_icons_drawio library.
 */
export function DrawioIcon({
  category,
  name,
  size = 24,
  className = "",
  alt
}: DrawioIconProps) {
  const iconPath = `/drawio_icons/${category}/${name}.svg`;
  
  return (
    <span className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <img
        src={iconPath}
        alt={alt || name}
        width={size}
        height={size}
        className="object-contain w-full h-full"
        loading="lazy"
      />
    </span>
  );
}
