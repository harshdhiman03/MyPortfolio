// // lib/data.ts

// export type LensType = 'product' | 'engineering' | 'agentic';

// // The new Editorial Deep Dive format for the Product Lens
// export interface ProductContent {
//   headline: string;
//   painPoint: string;
//   targetAudience: string;
//   ahaMoment: string;
//   swot: {
//     s: string;
//     w: string;
//     o: string;
//     t: string;
//   };
//   keyAchievements: { label: string; value: string }[];
//   techStack: string[];
// }

// export interface EngineeringContent {
//   headline: string;
//   architectureFlow: {
//     nodes: { id: string; title: string; tech: string; groupId?: string }[];
//     edges: { fromId: string; toId: string; labelTop: string; labelBottom?: string }[];
//     groups: { id: string; title: string }[];
//   };
// }

// export interface EngineeringDeveloperDetails {
//   architecture: string;
//   coreSnippet: string;
//   techStack: string[];
// }

// export type EngineeringProjectContent = EngineeringContent & EngineeringDeveloperDetails;

// export interface AgenticContent {
//   headline: string;
//   paradigm: string;
//   reasoningTrace: { step: string; action: string; result: string }[];
//   coreLogic: string;
//   techStack: string[];
// }

// export interface Project {
//   id: string;
//   title: string;
//   category: 'Professional' | 'Research' | 'Hackathon' | 'AI & Vision' | 'Web3 Gaming' | 'FinTech AI' | 'Cybersecurity' | 'Machine Learning' | 'Frontend Engineering' | 'Cloud Engineering';
//   stack: string[]; 
//   content: {
//     product: ProductContent;
//     engineering: EngineeringProjectContent;
//     agentic: AgenticContent;
//   };
// }

// export const projects: Project[] = [
//   {
//     id: "foodoptima",
//     title: "FoodOptima",
//     category: "AI & Vision",
//     stack: ["EfficientNetB0", "OpenCV", "T5 Transformer", "Streamlit"],
//     content: {
//       product: {
//         headline: "Ending Food Waste with Post-Meal AI Vision.",
//         painPoint: "Food wastage is a massive global issue, but existing tracking systems create friction by requiring users to take annoying 'before-meal' images.",
//         targetAudience: "Environmentally conscious consumers, restaurants, and commercial cafeterias.",
//         ahaMoment: "The system learns portion-size baselines directly from food datasets. It instantly estimates wasted volume and generates personalized reduction recommendations using only a single post-meal image.",
//         swot: {
//           s: "Extreme user convenience - eliminates the dependency on 'before' images. Validated by academia.",
//           w: "Baseline intelligence is currently tied to specific data (Indian food datasets), scoping its immediate accuracy.",
//           o: "Scaling the dataset to global cuisines and adapting for commercial cafeteria SaaS.",
//           t: "Relies heavily on the user capturing a clear, well-lit post-meal image for OpenCV to function properly."
//         },
//         keyAchievements: [
//           { label: "Publication", value: "Springer Scopus" },
//           { label: "Friction", value: "Zero Pre-Meal Scans" }
//         ],
//         techStack: ["EfficientNetB0", "OpenCV", "T5 Transformer", "Streamlit"],
//       },
//       engineering: {
//         headline: "Computer Vision to LLM Pipeline",
//         architecture: "Monolithic Python application leveraging Streamlit for client-side rendering and PyTorch for zero-latency local inference.",
//         architectureFlow: {
//           groups: [
//             { id: "edge", title: "Client Edge" },
//             { id: "vision", title: "Vision Compute" },
//             { id: "ml", title: "ML Intelligence" }
//           ],
//           nodes: [
//             { id: "capture", title: "Meal Capture UI", tech: "Streamlit", groupId: "edge" },
//             { id: "ingest", title: "Image Ingestion", tech: "NumPy + OpenCV", groupId: "vision" },
//             { id: "contours", title: "Contour Extractor", tech: "OpenCV", groupId: "vision" },
//             { id: "classifier", title: "Food Classifier", tech: "EfficientNetB0", groupId: "ml" },
//             { id: "advisor", title: "Advice Generator", tech: "T5 Transformer", groupId: "ml" }
//           ],
//           edges: [
//             { fromId: "capture", toId: "ingest", labelTop: "upload", labelBottom: "preview" },
//             { fromId: "ingest", toId: "contours", labelTop: "normalized tensor" },
//             { fromId: "contours", toId: "classifier", labelTop: "features" },
//             { fromId: "classifier", toId: "advisor", labelTop: "prediction", labelBottom: "recommendation" }
//           ]
//         },
//         coreSnippet: "def process_waste_image(image):\n    contours = cv2.findContours(image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)\n    features = efficientnet_model.predict(normalize(image))\n    return calculate_volume(contours, features)",
//         techStack: ["Python", "PyTorch", "OpenCV", "Streamlit"],
//       },
//       agentic: {
//         headline: "Visual Reasoning & Generative Feedback",
//         paradigm: "Multi-Modal Inference",
//         reasoningTrace: [
//           {
//             step: "01",
//             action: "Ingest post-meal image and normalize visual tensors.",
//             result: "Input frame converted into model-ready features."
//           },
//           {
//             step: "02",
//             action: "Extract contours and classify residual food classes.",
//             result: "Waste geometry and food category confidence generated."
//           },
//           {
//             step: "03",
//             action: "Prompt T5 with quantitative waste context.",
//             result: "Context-aware reduction recommendations returned."
//           }
//         ],
//         coreLogic: "The agent fuses CV-derived contour metrics with semantic generation. It transforms numeric waste signals into natural-language guidance tailored to user behavior.",
//         techStack: ["T5 Transformer", "EfficientNetB0", "OpenCV", "PyTorch"]
//       },
//     },
//   },
//   {
//     id: "runic-realm",
//     title: "Runic Realm",
//     category: "Web3 Gaming",
//     stack: ["Next.js", "Solidity", "Ethers.js", "Thirdweb"],
//     content: {
//       product: {
//         headline: "Web3 Gaming Without the Friction.",
//         painPoint: "High blockchain transaction costs (gas fees) and constant wallet approval pop-ups ruin the immersive experience for casual gamers.",
//         targetAudience: "Casual gamers and Web3 enthusiasts tired of expensive micro-transactions.",
//         ahaMoment: "Instead of writing every single game move to the blockchain, the platform uses a Session-Based Gaming Model. It batches interactions securely, preserving funds and focus.",
//         swot: {
//           s: "Drastically improves UX by reducing transaction friction by 40% and load times by 30%.",
//           w: "Requires players to have a basic understanding of connecting a Web3 wallet to start.",
//           o: "The session-based model can be licensed as a framework for other Web3 developers.",
//           t: "Dependent on the underlying Base Blockchain's network stability during settlement."
//         },
//         keyAchievements: [
//           { label: "Winner", value: "HACKINDIA SPARK-2" },
//           { label: "Friction", value: "-40%" }
//         ],
//         techStack: ["Next.js", "Solidity", "Ethers.js", "Thirdweb"],
//       },
//       engineering: {
//         headline: "Session-Based Smart Contracts",
//         architecture: "Next.js client with Thirdweb provider, handling gameplay state locally before pushing batched payload to Base Blockchain via Ethers.js.",
//         architectureFlow: {
//           groups: [
//             { id: "client", title: "Player Client" },
//             { id: "session", title: "Session Layer" },
//             { id: "chain", title: "Base Chain" }
//           ],
//           nodes: [
//             { id: "wallet", title: "Wallet Auth", tech: "Thirdweb", groupId: "client" },
//             { id: "game", title: "Gameplay Runtime", tech: "Next.js", groupId: "client" },
//             { id: "sessionMgr", title: "Session Manager", tech: "Ethers.js", groupId: "session" },
//             { id: "hash", title: "State Hashing", tech: "Keccak256", groupId: "session" },
//             { id: "settle", title: "Contract Settlement", tech: "Solidity", groupId: "chain" }
//           ],
//           edges: [
//             { fromId: "wallet", toId: "game", labelTop: "session signature" },
//             { fromId: "game", toId: "sessionMgr", labelTop: "move stream" },
//             { fromId: "sessionMgr", toId: "hash", labelTop: "batched state" },
//             { fromId: "hash", toId: "settle", labelTop: "proof", labelBottom: "final balances" }
//           ]
//         },
//         coreSnippet: "const initializeSession = async () => {\n  const signature = await signer._signTypedData(domain, types, value);\n  setSessionState({ active: true, sig: signature });\n};",
//         techStack: ["Next.js", "Ethers.js", "Solidity"],
//       },
//       agentic: {
//         headline: "Autonomous State Management",
//         paradigm: "Autonomous Smart Contract",
//         reasoningTrace: [
//           {
//             step: "01",
//             action: "Capture signed gameplay events into a session channel.",
//             result: "Trusted move stream assembled without per-action gas cost."
//           },
//           {
//             step: "02",
//             action: "Hash and validate batched state transitions.",
//             result: "Tamper-resistant proof of gameplay integrity created."
//           },
//           {
//             step: "03",
//             action: "Execute settlement contract with final state proof.",
//             result: "Balances and outcomes committed on-chain deterministically."
//           }
//         ],
//         coreLogic: "The runtime behaves as an autonomous adjudicator: it accumulates off-chain actions, validates integrity through cryptographic proofs, and finalizes state through Solidity settlement.",
//         techStack: ["Solidity", "Ethers.js", "Thirdweb", "Next.js"]
//       }
//     },
//   },
//   {
//     id: "finspire",
//     title: "FinSpire AI",
//     category: "FinTech AI",
//     stack: ["Next.js", "TradingView API", "T5 Transformer", "Python"],
//     content: {
//       product: {
//         headline: "Democratizing Financial Insights with AI.",
//         painPoint: "Retail investors are constantly bombarded with raw market data and complex charts, struggling to interpret the noise.",
//         targetAudience: "Retail investors and casual traders seeking plain-English market analysis.",
//         ahaMoment: "Users can look at a live, intimidating stock chart and simply ask a chatbot, 'What does this mean for my portfolio?' and get domain-specific insights.",
//         swot: {
//           s: "Highly specialized domain knowledge trained on 68K financial records for context-aware answers.",
//           w: "Financial markets change by the second, requiring constant model updates or RAG integration.",
//           o: "Expanding into premium tiers for institutional-grade sentiment analytics.",
//           t: "Financial advice carries inherent trust and liability risks."
//         },
//         keyAchievements: [
//           { label: "Training Data", value: "68,000 Records" },
//           { label: "Integration", value: "Live TradingView" }
//         ],
//         techStack: ["Next.js", "TradingView API", "T5 Transformer", "Python"],
//       },
//       engineering: {
//         headline: "Real-Time Visualization & NLP",
//         architecture: "Next.js frontend heavily utilizing TradingView charting components, paired with a Python backend running a fine-tuned T5 NLP model.",
//         architectureFlow: {
//           groups: [
//             { id: "client", title: "Investor UI" },
//             { id: "data", title: "Data Context" },
//             { id: "ai", title: "AI Analysis" }
//           ],
//           nodes: [
//             { id: "chart", title: "Chart Widget", tech: "TradingView", groupId: "client" },
//             { id: "ticker", title: "Ticker Context", tech: "Next.js State", groupId: "data" },
//             { id: "prompt", title: "Prompt Builder", tech: "Python API", groupId: "data" },
//             { id: "inference", title: "T5 Inference", tech: "Fine-Tuned T5", groupId: "ai" },
//             { id: "insight", title: "Insight Feed", tech: "Chainlit", groupId: "ai" }
//           ],
//           edges: [
//             { fromId: "chart", toId: "ticker", labelTop: "price action" },
//             { fromId: "ticker", toId: "prompt", labelTop: "market context" },
//             { fromId: "prompt", toId: "inference", labelTop: "semantic prompt" },
//             { fromId: "inference", toId: "insight", labelTop: "analysis", labelBottom: "chat response" }
//           ]
//         },
//         coreSnippet: "export default function TradingChart({ symbol }) {\n  return (\n    <div className=\"tradingview-widget-container\">\n      <AdvancedRealTimeChart symbol={symbol} theme=\"dark\" />\n    </div>\n  );\n}",
//         techStack: ["Next.js", "TradingView", "Python", "T5"],
//       },
//       agentic: {
//         headline: "Domain-Specific NLP Analyst",
//         paradigm: "Financial Language Inference",
//         reasoningTrace: [
//           {
//             step: "01",
//             action: "Bind live ticker context and chart dynamics.",
//             result: "Structured market snapshot prepared for reasoning."
//           },
//           {
//             step: "02",
//             action: "Translate indicators into semantic prompt context.",
//             result: "Model receives domain-grounded financial signals."
//           },
//           {
//             step: "03",
//             action: "Run fine-tuned T5 inference and summarize risk.",
//             result: "Plain-English market guidance emitted for users."
//           }
//         ],
//         coreLogic: "The agent maps volatile quantitative market data into stable semantic abstractions, then uses a finance-adapted language model to explain implications in actionable language.",
//         techStack: ["T5 Transformer", "TradingView", "Next.js", "Python"]
//       }
//     },
//   },
//   {
//     id: "hacksuraksha",
//     title: "HackSuraksha",
//     category: "Cybersecurity",
//     stack: ["LSTM", "CNNs", "Streamlit", "BeautifulSoup"],
//     content: {
//       product: {
//         headline: "Automated Threat Scouting & User Protection.",
//         painPoint: "Everyday internet users frequently fall victim to highly convincing fake websites and scam customer-care numbers.",
//         targetAudience: "Everyday web consumers and enterprise Trust & Safety teams.",
//         ahaMoment: "It doesn't just read the URL; it uses AI to analyze the web address while simultaneously using visual AI to look at the actual ad images on the site.",
//         swot: {
//           s: "Exceptionally high precision (96.8% accuracy) due to the combined text and image analysis.",
//           w: "Relies on web scraping; dynamically loaded sites (heavy JS) can break the scraper.",
//           o: "Packaging the model as a lightweight Chrome extension for real-time user protection.",
//           t: "Adversarial attacks (subtly altering images to trick CNNs) by evolving scammers."
//         },
//         keyAchievements: [
//           { label: "Accuracy", value: "96.8%" },
//           { label: "Latency", value: "-35%" }
//         ],
//         techStack: ["LSTM", "CNNs", "Streamlit", "BeautifulSoup"],
//       },
//       engineering: {
//         headline: "Multi-Modal Inference Pipeline",
//         architecture: "Streamlit UI acts as a rapid ingestion portal, passing user URLs into a synchronous Python scraping and dual-model inference pipeline.",
//         architectureFlow: {
//           groups: [
//             { id: "edge", title: "Input Edge" },
//             { id: "scrape", title: "Scraping Layer" },
//             { id: "detect", title: "Detection Layer" }
//           ],
//           nodes: [
//             { id: "url", title: "URL Intake", tech: "Streamlit", groupId: "edge" },
//             { id: "dom", title: "DOM Parser", tech: "BeautifulSoup", groupId: "scrape" },
//             { id: "assets", title: "Asset Extractor", tech: "Image Fetch", groupId: "scrape" },
//             { id: "models", title: "LSTM + CNN", tech: "Parallel Inference", groupId: "detect" },
//             { id: "verdict", title: "Risk Verdict", tech: "Heuristic Scorer", groupId: "detect" }
//           ],
//           edges: [
//             { fromId: "url", toId: "dom", labelTop: "target domain" },
//             { fromId: "dom", toId: "assets", labelTop: "text + media" },
//             { fromId: "assets", toId: "models", labelTop: "feature bundles" },
//             { fromId: "models", toId: "verdict", labelTop: "threat score", labelBottom: "safe/phishing" }
//           ]
//         },
//         coreSnippet: "def analyze_domain(url):\n    html, images = scraper.extract(url)\n    text_score = lstm_model.predict(html)\n    img_score = cnn_model.predict(images)\n    return weighted_average(text_score, img_score)",
//         techStack: ["Python", "LSTM", "CNN", "BeautifulSoup"],
//       },
//       agentic: {
//         headline: "Multi-Modal Threat Detection",
//         paradigm: "Multi-Modal Security Inference",
//         reasoningTrace: [
//           {
//             step: "01",
//             action: "Scrape domain HTML, metadata, and image assets.",
//             result: "Raw textual and visual artifacts collected."
//           },
//           {
//             step: "02",
//             action: "Run LSTM and CNN inference in parallel pipelines.",
//             result: "Independent phishing likelihood scores produced."
//           },
//           {
//             step: "03",
//             action: "Fuse model outputs through weighted risk scoring.",
//             result: "Final safe/phishing verdict with confidence surfaced."
//           }
//         ],
//         coreLogic: "The decision engine cross-validates linguistic deception markers and visual scam patterns. Ensemble scoring reduces single-model bias and improves resilience to evasive tactics.",
//         techStack: ["LSTM", "CNN", "BeautifulSoup", "Python"]
//       }
//     },
//   },
//   {
//     id: "transformer-scratch",
//     title: "Neural Translator",
//     category: "Machine Learning",
//     stack: ["TensorFlow", "Python", "Deep Learning"],
//     content: {
//       product: {
//         headline: "Context-Aware Neural Translation.",
//         painPoint: "Traditional statistical translation models translate word-for-word, failing to grasp nuance and resulting in robotic text.",
//         targetAudience: "Enterprises needing highly accurate, context-aware translation engines without using expensive third-party APIs.",
//         ahaMoment: "By implementing Self-Attention mechanisms, the model looks at the entire sentence at once to understand how every word relates to every other word.",
//         swot: {
//           s: "Exceptional performance, achieving 98% translation accuracy while improving computational efficiency.",
//           w: "Requires strictly curated, high-quality bilingual datasets to avoid learning bad grammar.",
//           o: "Can be custom-trained on highly specialized domains (e.g., legal or medical) where commercial APIs fail.",
//           t: "Competing with state-of-the-art commercial LLMs requires immense GPU compute power."
//         },
//         keyAchievements: [
//           { label: "Accuracy", value: "98%" },
//           { label: "Architecture", value: "Built from Scratch" }
//         ],
//         techStack: ["TensorFlow", "Python", "Deep Learning"],
//       },
//       engineering: {
//         headline: "Encoder-Decoder Architecture",
//         architecture: "Core Machine Learning architecture built natively in TensorFlow without high-level abstraction libraries, running in Jupyter/Python environments.",
//         architectureFlow: {
//           groups: [
//             { id: "prep", title: "Sequence Prep" },
//             { id: "encode", title: "Transformer Core" },
//             { id: "decode", title: "Decoder Head" }
//           ],
//           nodes: [
//             { id: "tokens", title: "Tokenization", tech: "Subword Vocab", groupId: "prep" },
//             { id: "position", title: "Positional Encode", tech: "Sinusoidal Math", groupId: "prep" },
//             { id: "attention", title: "Self Attention", tech: "QKV Matrices", groupId: "encode" },
//             { id: "ffn", title: "Feed Forward", tech: "TensorFlow", groupId: "encode" },
//             { id: "softmax", title: "Token Output", tech: "Softmax Decoder", groupId: "decode" }
//           ],
//           edges: [
//             { fromId: "tokens", toId: "position", labelTop: "indexed sequence" },
//             { fromId: "position", toId: "attention", labelTop: "embedded vectors" },
//             { fromId: "attention", toId: "ffn", labelTop: "context weights" },
//             { fromId: "ffn", toId: "softmax", labelTop: "logits", labelBottom: "next token" }
//           ]
//         },
//         coreSnippet: "class MultiHeadAttention(tf.keras.layers.Layer):\n  def call(self, v, k, q, mask):\n    attention_weights = tf.matmul(q, k, transpose_b=True)\n    # scaled dot-product logic from scratch",
//         techStack: ["TensorFlow", "Math", "Python"],
//       },
//       agentic: {
//         headline: "Self-Attention Mechanism",
//         paradigm: "Sequence-to-Sequence Reasoning",
//         reasoningTrace: [
//           {
//             step: "01",
//             action: "Tokenize bilingual sequences and encode positional context.",
//             result: "Order-aware embeddings generated for each token."
//           },
//           {
//             step: "02",
//             action: "Compute multi-head self-attention over token graph.",
//             result: "Contextual dependencies amplified across sequence."
//           },
//           {
//             step: "03",
//             action: "Decode logits into target-language token stream.",
//             result: "Context-aware translation candidate produced."
//           }
//         ],
//         coreLogic: "The agentic behavior emerges from attention routing: each token dynamically reweights other tokens before decoding, enabling context preservation beyond local n-gram limits.",
//         techStack: ["TensorFlow", "Transformers", "Python", "Deep Learning"]
//       }
//     },
//   },
//   {
//     id: "infosys-intern",
//     title: "Enterprise Mailing System",
//     category: "Frontend Engineering",
//     stack: ["React.js", "Tailwind CSS", "JavaScript"],
//     content: {
//       product: {
//         headline: "Scaling Enterprise Communication.",
//         painPoint: "Enterprise HR and Admin teams struggle with creating brand-compliant emails, wrestling with clunky legacy software.",
//         targetAudience: "Internal stakeholders, HR departments, and corporate communications teams.",
//         ahaMoment: "By componentizing email elements using React, non-technical staff no longer had to code. They could simply drag-and-drop to spin up pixel-perfect corporate emails.",
//         swot: {
//           s: "Massive operational efficiency gain, boosting template creation speed by 60%.",
//           w: "React components had to be heavily constrained to ensure cross-client compatibility (e.g., older Outlook versions).",
//           o: "Can easily be scaled beyond emails into a full-fledged internal CMS for employee portals.",
//           t: "Employee resistance to adopting new tools in a rigid corporate environment."
//         },
//         keyAchievements: [
//           { label: "Speed", value: "60% Faster" },
//           { label: "Scale", value: "Enterprise-Wide" }
//         ],
//         techStack: ["React.js", "Tailwind CSS", "JavaScript"],
//       },
//       engineering: {
//         headline: "Component-Driven Architecture",
//         architecture: "Client-side React Single Page Application acting as a visual builder, translating drag-and-drop UI state into raw, compliant HTML structures.",
//         architectureFlow: {
//           groups: [
//             { id: "ui", title: "Builder UI" },
//             { id: "state", title: "State Engine" },
//             { id: "export", title: "Export Pipeline" }
//           ],
//           nodes: [
//             { id: "sidebar", title: "Component Library", tech: "React DnD", groupId: "ui" },
//             { id: "canvas", title: "Drop Canvas", tech: "React State", groupId: "ui" },
//             { id: "layout", title: "Layout AST", tech: "JSON Schema", groupId: "state" },
//             { id: "compiler", title: "HTML Compiler", tech: "Inline CSS", groupId: "export" },
//             { id: "preview", title: "Email Preview", tech: "Template Renderer", groupId: "export" }
//           ],
//           edges: [
//             { fromId: "sidebar", toId: "canvas", labelTop: "drag payload" },
//             { fromId: "canvas", toId: "layout", labelTop: "component state" },
//             { fromId: "layout", toId: "compiler", labelTop: "render plan" },
//             { fromId: "compiler", toId: "preview", labelTop: "compiled HTML", labelBottom: "QA ready" }
//           ]
//         },
//         coreSnippet: "const handleDrop = (item) => {\n  setCanvasState(prev => [...prev, {\n    id: uuid(),\n    type: item.type,\n    styles: defaultStyles[item.type]\n  }]);\n};",
//         techStack: ["React", "JavaScript", "CSS"],
//       },
//       agentic: {
//         headline: "Rule-Based Assembly",
//         paradigm: "Deterministic Template Orchestration",
//         reasoningTrace: [
//           {
//             step: "01",
//             action: "Capture drag-drop component intent from builder state.",
//             result: "Structured layout AST emitted by UI engine."
//           },
//           {
//             step: "02",
//             action: "Validate AST against enterprise design constraints.",
//             result: "Invalid blocks rejected and compliant styles enforced."
//           },
//           {
//             step: "03",
//             action: "Compile constrained AST into production-ready HTML.",
//             result: "Brand-safe email template generated automatically."
//           }
//         ],
//         coreLogic: "A deterministic rules engine codifies brand and compatibility constraints, allowing autonomous layout generation while maintaining strict corporate compliance.",
//         techStack: ["React", "JavaScript", "Tailwind CSS", "HTML Compiler"]
//       }
//     },
//   },
//   {
//     id: "infosys-se",
//     title: "Automated Data Workflows",
//     category: "Cloud Engineering",
//     stack: ["Azure Databricks", ".NET Core", "SQL", "Python"],
//     content: {
//       product: {
//         headline: "Enterprise Data Pipeline Automation.",
//         painPoint: "Manual data processing and legacy infrastructure cause severe bottlenecks, leading to delayed reporting and high operational costs.",
//         targetAudience: "Enterprise data teams and internal corporate stakeholders.",
//         ahaMoment: "Migrating legacy processes to Azure Databricks enabled automated, scalable workflows that run entirely hands-off.",
//         swot: {
//           s: "Boosted overall system efficiency by 36% through cloud modernization.",
//           w: "High initial migration and setup overhead for legacy systems.",
//           o: "The pipeline architecture can be templated for other departments.",
//           t: "Reliance on specific cloud vendors (Azure lock-in)."
//         },
//         keyAchievements: [
//           { label: "Efficiency", value: "+36%" },
//           { label: "Infrastructure", value: "Cloud Migrated" }
//         ],
//         techStack: ["Azure Databricks", ".NET Core", "SQL", "Python"],
//       },
//       engineering: {
//         headline: "Cloud-Native Data Pipelines",
//         architecture: "Enterprise data engineering architecture orchestrating large-scale ETL jobs using Azure infrastructure and .NET Core microservices.",
//         architectureFlow: {
//           groups: [
//             { id: "azure", title: "Azure Cloud" },
//             { id: "compute", title: "Data Processing" },
//             { id: "serve", title: "Service Layer" }
//           ],
//           nodes: [
//             { id: "ingest", title: "Data Factory", tech: "ADF Pipelines", groupId: "azure" },
//             { id: "lake", title: "Raw Storage", tech: "Blob Storage", groupId: "azure" },
//             { id: "spark", title: "Databricks Jobs", tech: "PySpark", groupId: "compute" },
//             { id: "sql", title: "Serving DB", tech: "SQL Server", groupId: "serve" },
//             { id: "api", title: "API Gateway", tech: ".NET Core", groupId: "serve" }
//           ],
//           edges: [
//             { fromId: "ingest", toId: "lake", labelTop: "raw batches" },
//             { fromId: "lake", toId: "spark", labelTop: "etl trigger" },
//             { fromId: "spark", toId: "sql", labelTop: "curated tables" },
//             { fromId: "sql", toId: "api", labelTop: "query response", labelBottom: "dashboard data" }
//           ]
//         },
//         coreSnippet: "public async Task<IActionResult> TriggerEtlJob()\n{\n    var response = await _databricksClient.Jobs.RunNow(jobId);\n    return Ok(new { RunId = response.RunId });\n}",
//         techStack: ["Azure", "Databricks", ".NET Core"],
//       },
//       agentic: {
//         headline: "Automated ETL",
//         paradigm: "Autonomous ETL Orchestration",
//         reasoningTrace: [
//           {
//             step: "01",
//             action: "Schedule ingestion triggers across Azure data sources.",
//             result: "Raw datasets land in cloud storage partitions."
//           },
//           {
//             step: "02",
//             action: "Execute Databricks transformation and validation jobs.",
//             result: "Curated analytical tables materialized with quality checks."
//           },
//           {
//             step: "03",
//             action: "Publish serving datasets to SQL and service layer.",
//             result: "Downstream APIs and dashboards updated with fresh data."
//           }
//         ],
//         coreLogic: "The orchestrator continuously drives ingestion, transformation, and serving transitions with policy-based triggers, reducing manual intervention and improving operational reliability.",
//         techStack: ["Azure Databricks", "SQL", ".NET Core", "Python"]
//       }
//     }
//   }
// ];

export type LensType = 'product' | 'engineering' | 'agentic';

export interface ProductContent {
  headline: string;
  painPoint: string;
  targetAudience: string;
  ahaMoment: string;
  swot: { s: string; w: string; o: string; t: string; };
  keyAchievements: { label: string; value: string }[];
  techStack: string[];
}

export interface EngineeringContent {
  headline: string;
  architectureFlow: {
    nodes: { id: string; title: string; tech: string; groupId?: string }[];
    edges: { fromId: string; toId: string; labelTop: string; labelBottom?: string }[];
    groups: { id: string; title: string }[];
  };
}

export interface EngineeringDeveloperDetails {
  architecture: string;
  coreSnippet: string;
  techStack: string[];
}

export type EngineeringProjectContent = EngineeringContent & EngineeringDeveloperDetails;

export interface AgenticContent {
  headline: string;
  paradigm: string;
  reasoningTrace: { step: string; action: string; result: string }[];
  coreLogic: string;
  techStack: string[];
}

export interface Project {
  id: string;
  title: string;
  img: string;
  category: 'Professional' | 'Research' | 'Hackathon' | 'AI & Vision' | 'Web3 Gaming' | 'FinTech AI' | 'Cybersecurity' | 'Machine Learning' | 'Frontend Engineering' | 'Cloud Engineering';
  stack: string[]; 
  content: {
    product: ProductContent;
    engineering: EngineeringProjectContent;
    agentic?: AgenticContent;
  };
}

export const projects: Project[] = [
  // {
  //   id: "infosys-tv",
  //   title: "Infosys TV Authoring Automation",
  //   category: "Cloud Engineering",
  //   stack: ["Azure Databricks", ".NET Core", "SQL", "Python"],
  //   content: {
  //     product: {
  //       headline: "Enterprise Data Pipeline Automation.",
  //       painPoint: "Manual data processing and legacy infrastructure for TV authoring workflows caused severe bottlenecks, leading to delayed reporting and high operational costs.",
  //       targetAudience: "Enterprise data teams and internal corporate stakeholders at Infosys.",
  //       ahaMoment: "Migrating legacy processes to Azure Databricks enabled automated, scalable cloud workflows that execute entirely hands-off.",
  //       swot: {
  //         s: "Boosted overall system efficiency and reduced process time by 36% through cloud modernization.",
  //         w: "High initial migration and setup overhead for decoupling legacy systems.",
  //         o: "The scalable pipeline architecture can be templated for other enterprise departments.",
  //         t: "Reliance on specific cloud vendors (Azure infrastructure lock-in)."
  //       },
  //       keyAchievements: [
  //         { label: "Process Reduction", value: "36% Faster" },
  //         { label: "Infrastructure", value: "Cloud Migrated" }
  //       ],
  //       techStack: ["Azure Databricks", ".NET Core", "SQL", "Python"],
  //     },
  //     engineering: {
  //       headline: "Cloud-Native Data Pipelines",
  //       architecture: "Enterprise data engineering architecture orchestrating large-scale ETL jobs using Azure infrastructure and .NET Core microservices.",
  //       architectureFlow: {
  //         groups: [
  //           { id: "azure", title: "Azure Cloud" },
  //           { id: "compute", title: "Data Processing" },
  //           { id: "serve", title: "Service Layer" }
  //         ],
  //         nodes: [
  //           { id: "ingest", title: "Data Factory", tech: "ADF Pipelines", groupId: "azure" },
  //           { id: "lake", title: "Raw Storage", tech: "Blob Storage", groupId: "azure" },
  //           { id: "spark", title: "Databricks Jobs", tech: "PySpark", groupId: "compute" },
  //           { id: "sql", title: "Serving DB", tech: "SQL Server", groupId: "serve" },
  //           { id: "api", title: "API Gateway", tech: ".NET Core", groupId: "serve" }
  //         ],
  //         edges: [
  //           { fromId: "ingest", toId: "lake", labelTop: "raw batches" },
  //           { fromId: "lake", toId: "spark", labelTop: "etl trigger" },
  //           { fromId: "spark", toId: "sql", labelTop: "curated tables" },
  //           { fromId: "sql", toId: "api", labelTop: "query response", labelBottom: "dashboard data" }
  //         ]
  //       },
  //       coreSnippet: "public async Task<IActionResult> TriggerEtlJob()\n{\n    var response = await _databricksClient.Jobs.RunNow(jobId);\n    return Ok(new { RunId = response.RunId });\n}",
  //       techStack: ["Azure", "Databricks", ".NET Core"],
  //     },
  //     agentic: {
  //       headline: "Automated ETL",
  //       paradigm: "Autonomous ETL Orchestration",
  //       reasoningTrace: [
  //         { step: "01", action: "Schedule ingestion triggers across Azure data sources.", result: "Raw datasets land in cloud storage partitions." },
  //         { step: "02", action: "Execute Databricks transformation and validation jobs.", result: "Curated analytical tables materialized with quality checks." },
  //         { step: "03", action: "Publish serving datasets to SQL and service layer.", result: "Downstream APIs and dashboards updated with fresh data." }
  //       ],
  //       coreLogic: "The orchestrator continuously drives ingestion, transformation, and serving transitions with policy-based triggers, acting as a deterministic agent to reduce manual intervention and improve reliability.",
  //       techStack: ["Azure Databricks", "SQL", ".NET Core", "Python"]
  //     }
  //   }
  // },
  {
    id: "foodoptima",
    title: "FoodOptima",
    img:"/img/foodoptimaimg.png",
    category: "AI & Vision",
    stack: ["EfficientNetB0", "OpenCV", "T5 Transformer", "Streamlit"],
    content: {
      product: {
        headline: "Ending Food Waste with Post-Meal AI Vision.",
        painPoint: "Food wastage is a massive global issue, but existing tracking systems create friction by requiring users to take annoying 'before-meal' images.",
        targetAudience: "Environmentally conscious consumers, restaurants, and commercial cafeterias.",
        ahaMoment: "The system learns portion-size baselines directly from food datasets. It instantly estimates wasted volume and generates personalized reduction recommendations using only a single post-meal image.",
        swot: {
          s: "Extreme user convenience - eliminates the dependency on 'before' images. Validated by academia.",
          w: "Baseline intelligence is currently tied to specific data (Indian food datasets), scoping its immediate accuracy.",
          o: "Scaling the dataset to global cuisines and adapting for commercial cafeteria SaaS.",
          t: "Relies heavily on the user capturing a clear, well-lit post-meal image for OpenCV to function properly."
        },
        keyAchievements: [
          { label: "Publication", value: "Springer Scopus" },
          { label: "Friction", value: "Zero Pre-Meal Scans" }
        ],
        techStack: ["EfficientNetB0", "OpenCV", "T5 Transformer", "Streamlit"],
      },
      engineering: {
        headline: "Computer Vision to LLM Pipeline",
        architecture: "Monolithic Python application leveraging Streamlit for client-side rendering and PyTorch for zero-latency local inference.",
        architectureFlow: {
          groups: [
            { id: "edge", title: "Client Edge" },
            { id: "vision", title: "Vision Compute" },
            { id: "ml", title: "ML Intelligence" }
          ],
          nodes: [
            { id: "capture", title: "Meal Capture UI", tech: "Streamlit", groupId: "edge" },
            { id: "ingest", title: "Image Ingestion", tech: "NumPy + OpenCV", groupId: "vision" },
            { id: "contours", title: "Contour Extractor", tech: "OpenCV", groupId: "vision" },
            { id: "classifier", title: "Food Classifier", tech: "EfficientNetB0", groupId: "ml" },
            { id: "advisor", title: "Advice Generator", tech: "T5 Transformer", groupId: "ml" }
          ],
          edges: [
            { fromId: "capture", toId: "ingest", labelTop: "upload", labelBottom: "preview" },
            { fromId: "ingest", toId: "contours", labelTop: "normalized tensor" },
            { fromId: "contours", toId: "classifier", labelTop: "features" },
            { fromId: "classifier", toId: "advisor", labelTop: "prediction", labelBottom: "recommendation" }
          ]
        },
        coreSnippet: "def process_waste_image(image):\n    contours = cv2.findContours(image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)\n    features = efficientnet_model.predict(normalize(image))\n    return calculate_volume(contours, features)",
        techStack: ["Python", "PyTorch", "OpenCV", "Streamlit"],
      },
      agentic: {
        headline: "Visual Reasoning & Generative Feedback",
        paradigm: "Multi-Modal Inference",
        reasoningTrace: [
          { step: "01", action: "Ingest post-meal image and normalize visual tensors.", result: "Input frame converted into model-ready features." },
          { step: "02", action: "Extract contours and classify residual food classes.", result: "Waste geometry and food category confidence generated." },
          { step: "03", action: "Prompt T5 with quantitative waste context.", result: "Context-aware reduction recommendations returned." }
        ],
        coreLogic: "The agent fuses CV-derived contour metrics with semantic generation. It transforms numeric waste signals into natural-language guidance tailored to user behavior.",
        techStack: ["T5 Transformer", "EfficientNetB0", "OpenCV", "PyTorch"]
      },
    },
  },
  {
    id: "runic-realm",
    title: "Runic Realm",
    img:"/img/runicrealmimg.png",
    category: "Web3 Gaming",
    stack: ["Next.js", "Solidity", "Ethers.js", "Thirdweb"],
    content: {
      product: {
        headline: "Web3 Gaming Without the Friction.",
        painPoint: "High blockchain transaction costs (gas fees) and constant wallet approval pop-ups ruin the immersive experience for casual gamers.",
        targetAudience: "Casual gamers and Web3 enthusiasts tired of expensive micro-transactions.",
        ahaMoment: "Instead of writing every single game move to the blockchain, the platform uses a Session-Based Gaming Model. It batches interactions securely, preserving funds and focus.",
        swot: {
          s: "Drastically improves UX by reducing transaction friction by 40% and load times by 30%.",
          w: "Requires players to have a basic understanding of connecting a Web3 wallet to start.",
          o: "The session-based model can be licensed as a framework for other Web3 developers.",
          t: "Dependent on the underlying Base Blockchain's network stability during settlement."
        },
        keyAchievements: [
          { label: "Winner", value: "HACKINDIA SPARK-2" },
          { label: "Friction", value: "-40%" }
        ],
        techStack: ["Next.js", "Solidity", "Ethers.js", "Thirdweb"],
      },
      engineering: {
        headline: "Session-Based Smart Contracts",
        architecture: "Next.js client with Thirdweb provider, handling gameplay state locally before pushing batched payload to Base Blockchain via Ethers.js.",
        architectureFlow: {
          groups: [
            { id: "client", title: "Player Client" },
            { id: "session", title: "Session Layer" },
            { id: "chain", title: "Base Chain" }
          ],
          nodes: [
            { id: "wallet", title: "Wallet Auth", tech: "Thirdweb", groupId: "client" },
            { id: "game", title: "Gameplay Runtime", tech: "Next.js", groupId: "client" },
            { id: "sessionMgr", title: "Session Manager", tech: "Ethers.js", groupId: "session" },
            { id: "hash", title: "State Hashing", tech: "Keccak256", groupId: "session" },
            { id: "settle", title: "Contract Settlement", tech: "Solidity", groupId: "chain" }
          ],
          edges: [
            { fromId: "wallet", toId: "game", labelTop: "session signature" },
            { fromId: "game", toId: "sessionMgr", labelTop: "move stream" },
            { fromId: "sessionMgr", toId: "hash", labelTop: "batched state" },
            { fromId: "hash", toId: "settle", labelTop: "proof", labelBottom: "final balances" }
          ]
        },
        coreSnippet: "const initializeSession = async () => {\n  const signature = await signer._signTypedData(domain, types, value);\n  setSessionState({ active: true, sig: signature });\n};",
        techStack: ["Next.js", "Ethers.js", "Solidity"],
      },
      agentic: {
        headline: "Autonomous State Management",
        paradigm: "Autonomous Smart Contract",
        reasoningTrace: [
          { step: "01", action: "Capture signed gameplay events into a session channel.", result: "Trusted move stream assembled without per-action gas cost." },
          { step: "02", action: "Hash and validate batched state transitions.", result: "Tamper-resistant proof of gameplay integrity created." },
          { step: "03", action: "Execute settlement contract with final state proof.", result: "Balances and outcomes committed on-chain deterministically." }
        ],
        coreLogic: "The runtime behaves as an autonomous adjudicator: it accumulates off-chain actions, validates integrity through cryptographic proofs, and finalizes state through Solidity settlement.",
        techStack: ["Solidity", "Ethers.js", "Thirdweb", "Next.js"]
      }
    },
  },
  {
    id: "hacksuraksha",
    title: "HackSuraksha",
    img:"/img/hacksurakshaimg.png",
    category: "Cybersecurity",
    stack: ["Python", "BeautifulSoup", "CNN", "LSTM", "Streamlit", "Hugging Face"],
    content: {
      product: {
        headline: "Fraudulent Website Detection System.",
        painPoint: "Users are constantly exposed to sophisticated fraudulent websites that use deceptive URLs and misleading visual ad content to bypass standard security filters.",
        targetAudience: "Everyday internet users and cybersecurity teams needing automated, high-accuracy threat detection.",
        ahaMoment: "By combining sequential URL analysis (LSTM) with visual ad-content classification (CNN), the system creates a highly accurate, multi-modal defense against evolving fraud patterns.",
        swot: {
          s: "Achieves 96.8% detection accuracy by covering both content-based and visual-based fraud signals via end-to-end ML deployment.",
          w: "Model accuracy is dependent on scraped data quality, and currently offers limited explainability for end users.",
          o: "Can be extended into a real-time browser plugin and enhanced with Explainable AI (XAI) to build user trust.",
          t: "Fraud patterns and adversarial website obfuscation techniques evolve rapidly, requiring constant model updates."
        },
        keyAchievements: [
          { label: "Accuracy", value: "96.8%" },
          { label: "Latency", value: "Reduced by 35%" }
        ],
        techStack: ["Python", "CNN", "LSTM", "Streamlit", "Hugging Face"],
      },
      engineering: {
        headline: "Dual-Pipeline ML Inference Architecture",
        architecture: "Designed a highly optimized dual-pipeline system combining BeautifulSoup for structured web scraping, LSTM for sequential URL analysis, and CNN for visual ad-content classification.",
        architectureFlow: {
          groups: [
            { id: "ingest", title: "Scraping Layer" },
            { id: "infer", title: "ML Inference" },
            { id: "ui", title: "Deployment" }
          ],
          nodes: [
            { id: "scraper", title: "BeautifulSoup Scraper", tech: "Python", groupId: "ingest" },
            { id: "lstm", title: "URL Analyzer", tech: "LSTM", groupId: "infer" },
            { id: "cnn", title: "Ad Visual Classifier", tech: "CNN", groupId: "infer" },
            { id: "app", title: "Inference App", tech: "Streamlit", groupId: "ui" }
          ],
          edges: [
            { fromId: "scraper", toId: "lstm", labelTop: "URL sequences" },
            { fromId: "scraper", toId: "cnn", labelTop: "Image tensors" },
            { fromId: "lstm", toId: "app", labelTop: "text risk score" },
            { fromId: "cnn", toId: "app", labelBottom: "visual risk score" }
          ]
        },
        coreSnippet: "def analyze_target_website(url):\n    text_data, ad_images = scraper.extract(url)\n    url_risk = lstm_model.predict(text_data)\n    visual_risk = cnn_model.predict(ad_images)\n    return ensemble_score(url_risk, visual_risk)",
        techStack: ["Python", "BeautifulSoup", "Streamlit", "Hugging Face"],
      },
      agentic: {
        headline: "Reactive Multi-Modal Inference Engine",
        paradigm: "Deterministic ML Pipeline (Path to Agentic)",
        reasoningTrace: [
          { step: "01", action: "Receive target URL and scrape DOM for structured text and ad imagery.", result: "Data payloads extracted for independent pipelines." },
          { step: "02", action: "Pass sequence data to LSTM and spatial data to CNN.", result: "Independent threat probabilities calculated." },
          { step: "03", action: "Aggregate dual predictions to output a final 96.8% accurate verdict.", result: "Threat level surfaced rapidly to the end-user." }
        ],
        coreLogic: "Currently operating as a highly optimized, reactive ML system (input → predict → respond) rather than a fully autonomous agent. However, this robust dual-pipeline architecture lays the exact groundwork required for a future agentic system by enabling continuous retraining loops and automated threat-blocking workflows.",
        techStack: ["CNN", "LSTM", "Hugging Face", "Streamlit"]
      }
    }
  },
  {
    id: "finspire",
    title: "FinSpire",
    img:"/img/finspireimg.png",
    category: "FinTech AI",
    stack: ["Next.js", "Python", "T5 Transformer", "TradingView API", "Hugging Face"],
    content: {
      product: {
        headline: "AI-Powered Financial Recommendation Web App.",
        painPoint: "Retail investors often struggle to interpret raw, volatile financial data and complex charts, lacking access to clear, contextualized market insights.",
        targetAudience: "Retail investors and everyday traders seeking AI-driven, plain-English market analysis.",
        ahaMoment: "By fusing real-time TradingView market data with a T5 Transformer fine-tuned on 68,000 financial records, the system translates complex market conditions into actionable, personalized recommendations.",
        swot: {
          s: "Leverages a Transformer-based NLP (T5) model with a clean architectural separation between the Next.js frontend and ML backend.",
          w: "NLP recommendations are probabilistic (not deterministic), and heavily depend on the freshness and quality of the ingested financial data.",
          o: "Massive scope to evolve into a fully personalized financial assistant via feedback-driven improvement loops.",
          t: "Extreme financial data volatility and strict regulatory/compliance constraints inherent to the FinTech sector."
        },
        keyAchievements: [
          { label: "Training Data", value: "68,000 Records" },
          { label: "Integration", value: "Live TradingView" }
        ],
        techStack: ["Next.js", "T5 Transformer", "TradingView API", "Python"],
      },
      engineering: {
        headline: "REST-Driven NLP & SSR Architecture",
        architecture: "Designed with a strict separation of concerns: a performant Next.js frontend utilizing Server-Side Rendering (SSR) communicates via REST APIs to a Python-based ML backend optimized for inference latency.",
        architectureFlow: {
          groups: [
            { id: "client", title: "Frontend UI" },
            { id: "api", title: "REST Gateway" },
            { id: "ml", title: "ML Backend" }
          ],
          nodes: [
            { id: "ui", title: "Next.js App", tech: "SSR & React", groupId: "client" },
            { id: "charts", title: "Market Charts", tech: "TradingView", groupId: "client" },
            { id: "gateway", title: "REST API", tech: "Next.js API Routes", groupId: "api" },
            { id: "inference", title: "T5 Inference Engine", tech: "Python / FastAPI", groupId: "ml" }
          ],
          edges: [
            { fromId: "ui", toId: "charts", labelTop: "render live data" },
            { fromId: "ui", toId: "gateway", labelTop: "user query + context" },
            { fromId: "gateway", toId: "inference", labelTop: "REST payload" },
            { fromId: "inference", toId: "gateway", labelBottom: "probabilistic insight" }
          ]
        },
        coreSnippet: "export async function fetchFinancialInsight(query: string, chartData: any) {\n  const response = await fetch('/api/recommendations', {\n    method: 'POST',\n    body: JSON.stringify({ query, context: chartData })\n  });\n  return response.json();\n}",
        techStack: ["Next.js", "Python", "REST APIs", "Hugging Face"],
      },
      agentic: {
        headline: "Semi-Agentic Contextual Generator",
        paradigm: "Context-Aware NLP (Path to Autonomous Agent)",
        reasoningTrace: [
          { step: "01", action: "Accept natural language user query alongside current financial state context.", result: "Structured prompt formatted for NLP inference." },
          { step: "02", action: "Process prompt through fine-tuned T5 Transformer model.", result: "Domain-specific semantic weights applied to query." },
          { step: "03", action: "Generate context-aware financial recommendation.", result: "Probabilistic text insight returned to the user." }
        ],
        coreLogic: "This is intentionally designed as a semi-agentic system: it accepts queries and generates context-aware responses, but lacks autonomous goal planning or memory persistence. However, the architecture is primed to become fully agentic by introducing user feedback loops and external tool calling (e.g., executing trades via portfolio APIs).",
        techStack: ["T5 Transformer", "Hugging Face", "Python"]
      }
    }
  },
  {
    id: "internal-comm-tool",
    title: "Internal Communication Tool",
    img:"/img/internalcommimg.png",
    category: "Frontend Engineering",
    stack: ["React", "Node.js", "MongoDB", "Tailwind CSS", "JWT"],
    content: {
      product: {
        headline: "Streamlined Organizational Communication.",
        painPoint: "Internal teams spend too much time recreating emails and communications from scratch, leading to inconsistent branding and wasted effort.",
        targetAudience: "Internal organizational staff and corporate communications teams.",
        ahaMoment: "By building an interactive design toolbar with reusable JSX templates, non-technical staff can rapidly assemble and deploy secure internal communications.",
        swot: {
          s: "Highly modular React architecture with reusable templates and secure JWT-based authentication.",
          w: "Internal-only scope means feature expansion relies heavily on internal organizational needs rather than market demands.",
          o: "Can easily be scaled into broader workflow automation tools, incorporating analytics and role-based dashboards.",
          t: "Security and access misconfiguration risks, along with the standard threat of slow internal adoption."
        },
        keyAchievements: [
          { label: "Creation Time", value: "-60%" },
          { label: "User Engagement", value: "+35%" }
        ],
        techStack: ["React", "Node.js", "MongoDB", "Tailwind CSS", "JWT"],
      },
      engineering: {
        headline: "Secure MERN Stack Architecture",
        architecture: "A decoupled full-stack architecture featuring a React SPA with a custom interactive design toolbar, communicating securely via JWT to a Node.js/Express backend backed by MongoDB.",
        architectureFlow: {
          groups: [
            { id: "frontend", title: "Client UI" },
            { id: "backend", title: "API Gateway" },
            { id: "database", title: "Persistence" }
          ],
          nodes: [
            { id: "ui", title: "React SPA", tech: "Tailwind CSS", groupId: "frontend" },
            { id: "toolbar", title: "Design Toolbar", tech: "JSX Templates", groupId: "frontend" },
            { id: "auth", title: "JWT Middleware", tech: "Node.js", groupId: "backend" },
            { id: "api", title: "Express Server", tech: "REST API", groupId: "backend" },
            { id: "db", title: "Document Store", tech: "MongoDB", groupId: "database" }
          ],
          edges: [
            { fromId: "toolbar", toId: "ui", labelTop: "component state" },
            { fromId: "ui", toId: "auth", labelTop: "JWT token" },
            { fromId: "auth", toId: "api", labelTop: "validated request" },
            { fromId: "api", toId: "db", labelTop: "CRUD operations", labelBottom: "JSON payload" }
          ]
        },
        coreSnippet: "const verifyToken = (req, res, next) => {\n  const token = req.header('Authorization');\n  if (!token) return res.status(401).json({ error: 'Access denied' });\n  try {\n    const verified = jwt.verify(token, process.env.JWT_SECRET);\n    req.user = verified;\n    next();\n  } catch (err) {\n    res.status(400).json({ error: 'Invalid token' });\n  }\n};",
        techStack: ["React", "Node.js", "MongoDB", "Express", "JWT"],
      }
      // Notice: No 'agentic' block here!
    }
  },
  {
    id: "neural-translator",
    title: "Language Translation – English to French",
    img:"/img/languagetranslateimg.png",
    category: "Machine Learning",
    stack: ["Python", "TensorFlow", "Transformer", "Deep Learning"],
    content: {
      product: {
        headline: "Custom Transformer for High-Accuracy Translation.",
        painPoint: "Relying purely on black-box commercial APIs prevents deep architectural understanding and limits the ability to build fully custom, offline NLP pipelines.",
        targetAudience: "AI researchers and enterprise teams requiring custom, on-premise language models.",
        ahaMoment: "By engineering the Transformer architecture entirely from scratch—including custom attention mechanisms and positional encoding—the model achieved a highly precise 98% translation accuracy.",
        swot: {
          s: "Built the entire Transformer architecture from scratch, demonstrating a profound understanding of encoder-decoder mechanics and achieving 0.98 accuracy.",
          w: "Computationally expensive to train and currently limited to a single language pair (English to French).",
          o: "Can be extended to multilingual translation architectures or adapted to fine-tune pretrained models for greater efficiency.",
          t: "Massive pretrained open-source models outperform scratch models, and scaling requires high GPU resource availability."
        },
        keyAchievements: [
          { label: "Accuracy", value: "98.0%" },
          { label: "Architecture", value: "Built from Scratch" }
        ],
        techStack: ["Python", "TensorFlow", "Transformer Architecture"],
      },
      engineering: {
        headline: "From-Scratch Encoder-Decoder Pipeline",
        architecture: "Developed a pure deep learning pipeline in TensorFlow, focusing strictly on architectural clarity and mathematical correctness over deployment scale. Hand-implemented embeddings, positional encodings, and complex attention layers.",
        architectureFlow: {
          groups: [
            { id: "input", title: "Sequence Prep" },
            { id: "encoder", title: "Encoder Block" },
            { id: "decoder", title: "Decoder Block" }
          ],
          nodes: [
            { id: "embed", title: "Text Embeddings", tech: "TensorFlow", groupId: "input" },
            { id: "pos", title: "Positional Encoding", tech: "Sine/Cosine Math", groupId: "input" },
            { id: "self_att", title: "Self-Attention", tech: "QKV Matrices", groupId: "encoder" },
            { id: "cross_att", title: "Cross-Attention", tech: "Context Mapping", groupId: "decoder" },
            { id: "ffn", title: "Feed-Forward", tech: "Dense Layers", groupId: "decoder" },
            { id: "softmax", title: "Output Probabilities", tech: "Softmax Activation", groupId: "decoder" }
          ],
          edges: [
            { fromId: "embed", toId: "pos", labelTop: "vector representations" },
            { fromId: "pos", toId: "self_att", labelTop: "sequence + position" },
            { fromId: "self_att", toId: "cross_att", labelTop: "encoder context" },
            { fromId: "cross_att", toId: "ffn", labelTop: "attention weights" },
            { fromId: "ffn", toId: "softmax", labelTop: "logits", labelBottom: "translated token" }
          ]
        },
        coreSnippet: "def call(self, x, training, mask):\n    attn_output = self.mha(x, x, x, mask)\n    out1 = self.layernorm1(x + attn_output)\n    ffn_output = self.ffn(out1)\n    return self.layernorm2(out1 + ffn_output)",
        techStack: ["TensorFlow", "Math", "Python"],
      },
      agentic: {
        headline: "Foundational NLP Capability",
        paradigm: "Core Language Generation Module",
        reasoningTrace: [
          { step: "01", action: "Tokenize input English string and apply mathematical positional encodings.", result: "Sequence order and semantic context preserved." },
          { step: "02", action: "Calculate multi-head self-attention and cross-attention weights.", result: "Model learns relationships between all words simultaneously." },
          { step: "03", action: "Decode latent representations into highest-probability French tokens.", result: "Accurate translation generated." }
        ],
        coreLogic: "This project is purely a core NLP capability system, not an autonomous agent. However, sequence-to-sequence Transformers are the fundamental building blocks (the 'brain') of all modern agentic systems, giving them the ability to comprehend context and generate natural language responses.",
        techStack: ["Transformers", "Self-Attention", "TensorFlow"]
      }
    }
  }
  
];
