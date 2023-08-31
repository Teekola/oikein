/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";

import iconSrc from "./icon.png";

// Image metadata
export const size = {
   width: 32,
   height: 32,
};
export const contentType = "image/png";

// Image generation
export default async function Icon() {
   return new ImageResponse(
      (
         // ImageResponse JSX element
         <>{iconSrc && <img src={iconSrc.src} alt="favicon" {...size} />}</>
      ),
      // ImageResponse options
      {
         // For convenience, we can re-use the exported icons size metadata
         // config to also set the ImageResponse's width and height.
         ...size,
      }
   );
}
