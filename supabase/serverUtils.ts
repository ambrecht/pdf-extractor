import { headers, cookies } from 'next/headers';

export const getServerHeaders = () => headers();
export const getServerCookies = () => cookies();
