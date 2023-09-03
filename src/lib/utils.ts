import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export function convertSearchParamsToURLSearchParams(searchParams: {
   [key: string]: string | string[] | undefined;
}) {
   const urlSearchParams = new URLSearchParams();
   Object.keys(searchParams).forEach((key) => {
      const value = searchParams[key];
      if (Array.isArray(value)) {
         value.forEach((item) => urlSearchParams.append(key, item));
      } else if (value) {
         urlSearchParams.append(key, value);
      }
   });
   return urlSearchParams;
}
