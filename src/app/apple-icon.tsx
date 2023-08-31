/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";

import iconSrc from "./icon.png";

// Image metadata
export const size = {
   width: 180,
   height: 180,
};
export const contentType = "image/png";

// Image generation
export default async function AppleIcon() {
   return new ImageResponse(
      (
         // ImageResponse JSX element
         <>{iconSrc && <img src={iconSrc.src} alt="apple-touch-icon" {...size} />}</>
      ),
      // ImageResponse options
      {
         // For convenience, we can re-use the exported icons size metadata
         // config to also set the ImageResponse's width and height.
         ...size,
      }
   );
}
