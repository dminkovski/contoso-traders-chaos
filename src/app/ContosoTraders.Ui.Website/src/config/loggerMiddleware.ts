const logger = () => (next:any) => (action:any) => {
  const isDevEnv = process.env.REACT_ENVIRONMENT === "dev";
  if (isDevEnv) {
    const { type, payload, meta, error } = action;

    console.groupCollapsed(type);
    console.log('Payload:', payload);
    if (error) {
      console.log('Error:', error);
    }
    console.log('Meta:', meta);
    console.groupEnd();
  }

  return next(action);
};
export default logger;