export const cookies = typeof window !== "undefined" 
  ? document.cookie.split("; ").reduce((acc, curr) => {
      const [name, value] = curr.split("=");
      acc[name] = value;
      return acc;
    }, {} as Record<string, string>)
  : {};
