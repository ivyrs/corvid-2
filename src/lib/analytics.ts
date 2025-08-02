import { currentEnv, e } from "~/lib/utils";

function enableAnalytics(): boolean {
  // if (currentEnv().dev === true) return false;
  if (e.ANALYTICS) return e.ANALYTICS;

  return false;
}

function analyticsSource() {
  const result = () => {
    if (enableAnalytics() === false) return null;
    if (e.ANALYTICS_SOURCE) return e.ANALYTICS_SOURCE;
    if (a.source)
      return a.source;
    return null;
  };
  if (result() === "none") return null;
  return result();
}

export { analyticsSource };