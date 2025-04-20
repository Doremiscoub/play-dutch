
declare module '@react-three/drei';
declare module '@react-three/fiber';
declare module '@sentry/react';
declare module '@sentry/tracing';

declare module '*.glb' {
  const src: string;
  export default src;
}
