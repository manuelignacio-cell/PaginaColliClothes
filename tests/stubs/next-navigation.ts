/** Reemplazo de next/navigation para las pruebas. */
export const useRouter = () => ({ push: () => {}, replace: () => {}, back: () => {} });
export const usePathname = () => "/";
export const useSearchParams = () => new URLSearchParams();
export const useParams = () => ({});
