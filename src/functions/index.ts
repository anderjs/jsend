/**
 * @description
 * Mount a react app.
 */
export const mountReactApp = async (dist: string, element: Element, onError?: (e: Error) => void) => {
  try {
    const React = await import("react");

    const microfront = await import(`${dist}`);

    const { createRoot } = await import("react-dom/client");

    const root = createRoot(element);

    root.render(React.createElement(microfront.default as never));
  } catch (e) {
    onError?.(e as Error);
  }
};