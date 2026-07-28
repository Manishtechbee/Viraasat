import toast from "react-hot-toast";

const ROUTE_RULES = [
  {
    test: (q) => /\b(map|maps|location|locations|where is|show me on map|open map)\b/.test(q),
    route: "/map",
    message: "Opening the map...",
  },
  {
    test: (q) => /\b(explore|discover|browse|find|search|look for|show me|show|view)\b/.test(q),
    route: "/explore",
    message: "Opening the explore section...",
  },
  {
    test: (q) => /\b(guide|assistant|help me|explain|tell me about|what is|who is|info|information|details)\b/.test(q),
    route: "/explore",
    message: "Opening heritage details...",
  },
  {
    test: (q) => /\b(demo|watch demo|video|tutorial)\b/.test(q),
    route: "/watchdemo",
    message: "Opening the demo...",
  },
  {
    test: (q) => /\b(home|main page|start|landing)\b/.test(q),
    route: "/",
    message: "Opening the home page...",
  },
  {
    test: (q) => /\b(dashboard|profile|account)\b/.test(q),
    route: "/dashboard",
    message: "Opening your dashboard...",
  },
  {
    test: (q) => /\b(about|about us|who are you)\b/.test(q),
    route: "/about",
    message: "Opening the about page...",
  },
  {
    test: (q) => /\b(cookies|privacy|terms|policy)\b/.test(q),
    route: "/cookies",
    message: "Opening the policy details...",
  },
];

function normalizeText(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractSearchQuery(query) {
  const cleaned = query
    .replace(/^(please|can you|could you|show me|open|take me to|go to|search for|find|look for|tell me about|what is|who is|where is|explain)\s+/i, "")
    .replace(/\b(map|explore|guide|demo|dashboard|about|cookies|privacy|terms)\b/gi, "")
    .trim();

  return cleaned || query;
}

function getRouteAction(query) {
  for (const rule of ROUTE_RULES) {
    if (rule.test(query)) {
      return rule;
    }
  }

  return null;
}

async function tryAiInterpretation(query) {
  const endpoint = import.meta.env.VITE_AI_ENDPOINT || import.meta.env.VITE_AI_URL || "";

  if (!endpoint) {
    return null;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: query }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const route = data?.route || data?.action?.route;
    const message = data?.message || data?.action?.message;
    const searchQuery = data?.query || data?.action?.query;

    if (route) {
      return { route, message, searchQuery };
    }
  } catch (error) {
    console.warn("AI fallback failed:", error);
  }

  return null;
}

export async function processVoiceCommand(text, navigate) {
  const query = normalizeText(text);

  if (!query) {
    toast.error("Couldn't hear anything.");
    return { handled: false, reason: "empty" };
  }

  const directAction = getRouteAction(query);
  if (directAction) {
    toast.success(directAction.message);
    navigate(directAction.route);
    return { handled: true, route: directAction.route, type: "route" };
  }

  const aiAction = await tryAiInterpretation(query);
  if (aiAction?.route) {
    toast.success(aiAction.message || "Handling your request...");
    navigate(aiAction.route);
    return { handled: true, route: aiAction.route, type: "ai-route" };
  }

  const searchQuery = extractSearchQuery(query);
  toast.success(`Searching for "${searchQuery}"`);
  navigate(`/explore?query=${encodeURIComponent(searchQuery)}`);
  return { handled: true, route: `/explore?query=${encodeURIComponent(searchQuery)}`, type: "search" };
}