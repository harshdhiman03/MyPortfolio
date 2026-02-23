// lib/data.ts

export type LensType = 'product' | 'engineering' | 'agentic';

// The new Editorial Deep Dive format for the Product Lens
export interface ProductContent {
  headline: string;
  painPoint: string;
  targetAudience: string;
  ahaMoment: string;
  swot: {
    s: string;
    w: string;
    o: string;
    t: string;
  };
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

// Temporary type to hold your existing data until we design the Agentic deep dive
export interface LegacyContent {
  headline: string;
  description: string;
  stat: string;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'Professional' | 'Research' | 'Hackathon' | 'AI & Vision' | 'Web3 Gaming' | 'FinTech AI' | 'Cybersecurity' | 'Machine Learning' | 'Frontend Engineering' | 'Cloud Engineering';
  stack: string[]; 
  content: {
    product: ProductContent;
    engineering: EngineeringProjectContent;
    agentic: LegacyContent;
  };
}

export const projects: Project[] = [
  {
    id: "foodoptima",
    title: "FoodOptima",
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
        description: "Translates pixel-level waste contours into semantic understanding. Fine-tuned to provide context-aware reduction strategies.",
        stat: "Fine-tuned T5",
        tags: ["T5", "Hugging Face"]
      },
    },
  },
  {
    id: "runic-realm",
    title: "Runic Realm",
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
        description: "Smart contracts act as autonomous judges for in-game session settlements. Static rules engine (Non-ML).",
        stat: "Autonomous State",
        tags: ["Smart Contracts"]
      }
    },
  },
  {
    id: "finspire",
    title: "FinSpire AI",
    category: "FinTech AI",
    stack: ["Next.js", "TradingView API", "T5 Transformer", "Python"],
    content: {
      product: {
        headline: "Democratizing Financial Insights with AI.",
        painPoint: "Retail investors are constantly bombarded with raw market data and complex charts, struggling to interpret the noise.",
        targetAudience: "Retail investors and casual traders seeking plain-English market analysis.",
        ahaMoment: "Users can look at a live, intimidating stock chart and simply ask a chatbot, 'What does this mean for my portfolio?' and get domain-specific insights.",
        swot: {
          s: "Highly specialized domain knowledge trained on 68K financial records for context-aware answers.",
          w: "Financial markets change by the second, requiring constant model updates or RAG integration.",
          o: "Expanding into premium tiers for institutional-grade sentiment analytics.",
          t: "Financial advice carries inherent trust and liability risks."
        },
        keyAchievements: [
          { label: "Training Data", value: "68,000 Records" },
          { label: "Integration", value: "Live TradingView" }
        ],
        techStack: ["Next.js", "TradingView API", "T5 Transformer", "Python"],
      },
      engineering: {
        headline: "Real-Time Visualization & NLP",
        architecture: "Next.js frontend heavily utilizing TradingView charting components, paired with a Python backend running a fine-tuned T5 NLP model.",
        architectureFlow: {
          groups: [
            { id: "client", title: "Investor UI" },
            { id: "data", title: "Data Context" },
            { id: "ai", title: "AI Analysis" }
          ],
          nodes: [
            { id: "chart", title: "Chart Widget", tech: "TradingView", groupId: "client" },
            { id: "ticker", title: "Ticker Context", tech: "Next.js State", groupId: "data" },
            { id: "prompt", title: "Prompt Builder", tech: "Python API", groupId: "data" },
            { id: "inference", title: "T5 Inference", tech: "Fine-Tuned T5", groupId: "ai" },
            { id: "insight", title: "Insight Feed", tech: "Chainlit", groupId: "ai" }
          ],
          edges: [
            { fromId: "chart", toId: "ticker", labelTop: "price action" },
            { fromId: "ticker", toId: "prompt", labelTop: "market context" },
            { fromId: "prompt", toId: "inference", labelTop: "semantic prompt" },
            { fromId: "inference", toId: "insight", labelTop: "analysis", labelBottom: "chat response" }
          ]
        },
        coreSnippet: "export default function TradingChart({ symbol }) {\n  return (\n    <div className=\"tradingview-widget-container\">\n      <AdvancedRealTimeChart symbol={symbol} theme=\"dark\" />\n    </div>\n  );\n}",
        techStack: ["Next.js", "TradingView", "Python", "T5"],
      },
      agentic: {
        headline: "Domain-Specific NLP Analyst",
        description: "Processes numerical market indicators and translates them into semantic financial advice. Fine-tuned on massive financial text corpus.",
        stat: "Domain Adaptation",
        tags: ["T5", "NLP"]
      }
    },
  },
  {
    id: "hacksuraksha",
    title: "HackSuraksha",
    category: "Cybersecurity",
    stack: ["LSTM", "CNNs", "Streamlit", "BeautifulSoup"],
    content: {
      product: {
        headline: "Automated Threat Scouting & User Protection.",
        painPoint: "Everyday internet users frequently fall victim to highly convincing fake websites and scam customer-care numbers.",
        targetAudience: "Everyday web consumers and enterprise Trust & Safety teams.",
        ahaMoment: "It doesn't just read the URL; it uses AI to analyze the web address while simultaneously using visual AI to look at the actual ad images on the site.",
        swot: {
          s: "Exceptionally high precision (96.8% accuracy) due to the combined text and image analysis.",
          w: "Relies on web scraping; dynamically loaded sites (heavy JS) can break the scraper.",
          o: "Packaging the model as a lightweight Chrome extension for real-time user protection.",
          t: "Adversarial attacks (subtly altering images to trick CNNs) by evolving scammers."
        },
        keyAchievements: [
          { label: "Accuracy", value: "96.8%" },
          { label: "Latency", value: "-35%" }
        ],
        techStack: ["LSTM", "CNNs", "Streamlit", "BeautifulSoup"],
      },
      engineering: {
        headline: "Multi-Modal Inference Pipeline",
        architecture: "Streamlit UI acts as a rapid ingestion portal, passing user URLs into a synchronous Python scraping and dual-model inference pipeline.",
        architectureFlow: {
          groups: [
            { id: "edge", title: "Input Edge" },
            { id: "scrape", title: "Scraping Layer" },
            { id: "detect", title: "Detection Layer" }
          ],
          nodes: [
            { id: "url", title: "URL Intake", tech: "Streamlit", groupId: "edge" },
            { id: "dom", title: "DOM Parser", tech: "BeautifulSoup", groupId: "scrape" },
            { id: "assets", title: "Asset Extractor", tech: "Image Fetch", groupId: "scrape" },
            { id: "models", title: "LSTM + CNN", tech: "Parallel Inference", groupId: "detect" },
            { id: "verdict", title: "Risk Verdict", tech: "Heuristic Scorer", groupId: "detect" }
          ],
          edges: [
            { fromId: "url", toId: "dom", labelTop: "target domain" },
            { fromId: "dom", toId: "assets", labelTop: "text + media" },
            { fromId: "assets", toId: "models", labelTop: "feature bundles" },
            { fromId: "models", toId: "verdict", labelTop: "threat score", labelBottom: "safe/phishing" }
          ]
        },
        coreSnippet: "def analyze_domain(url):\n    html, images = scraper.extract(url)\n    text_score = lstm_model.predict(html)\n    img_score = cnn_model.predict(images)\n    return weighted_average(text_score, img_score)",
        techStack: ["Python", "LSTM", "CNN", "BeautifulSoup"],
      },
      agentic: {
        headline: "Multi-Modal Threat Detection",
        description: "Cross-references visual data with textual data to detect deceptive patterns. Trained on labeled datasets of known phishing domains.",
        stat: "Multi-Modal Eval",
        tags: ["LSTM", "CNN"]
      }
    },
  },
  {
    id: "transformer-scratch",
    title: "Neural Translator",
    category: "Machine Learning",
    stack: ["TensorFlow", "Python", "Deep Learning"],
    content: {
      product: {
        headline: "Context-Aware Neural Translation.",
        painPoint: "Traditional statistical translation models translate word-for-word, failing to grasp nuance and resulting in robotic text.",
        targetAudience: "Enterprises needing highly accurate, context-aware translation engines without using expensive third-party APIs.",
        ahaMoment: "By implementing Self-Attention mechanisms, the model looks at the entire sentence at once to understand how every word relates to every other word.",
        swot: {
          s: "Exceptional performance, achieving 98% translation accuracy while improving computational efficiency.",
          w: "Requires strictly curated, high-quality bilingual datasets to avoid learning bad grammar.",
          o: "Can be custom-trained on highly specialized domains (e.g., legal or medical) where commercial APIs fail.",
          t: "Competing with state-of-the-art commercial LLMs requires immense GPU compute power."
        },
        keyAchievements: [
          { label: "Accuracy", value: "98%" },
          { label: "Architecture", value: "Built from Scratch" }
        ],
        techStack: ["TensorFlow", "Python", "Deep Learning"],
      },
      engineering: {
        headline: "Encoder-Decoder Architecture",
        architecture: "Core Machine Learning architecture built natively in TensorFlow without high-level abstraction libraries, running in Jupyter/Python environments.",
        architectureFlow: {
          groups: [
            { id: "prep", title: "Sequence Prep" },
            { id: "encode", title: "Transformer Core" },
            { id: "decode", title: "Decoder Head" }
          ],
          nodes: [
            { id: "tokens", title: "Tokenization", tech: "Subword Vocab", groupId: "prep" },
            { id: "position", title: "Positional Encode", tech: "Sinusoidal Math", groupId: "prep" },
            { id: "attention", title: "Self Attention", tech: "QKV Matrices", groupId: "encode" },
            { id: "ffn", title: "Feed Forward", tech: "TensorFlow", groupId: "encode" },
            { id: "softmax", title: "Token Output", tech: "Softmax Decoder", groupId: "decode" }
          ],
          edges: [
            { fromId: "tokens", toId: "position", labelTop: "indexed sequence" },
            { fromId: "position", toId: "attention", labelTop: "embedded vectors" },
            { fromId: "attention", toId: "ffn", labelTop: "context weights" },
            { fromId: "ffn", toId: "softmax", labelTop: "logits", labelBottom: "next token" }
          ]
        },
        coreSnippet: "class MultiHeadAttention(tf.keras.layers.Layer):\n  def call(self, v, k, q, mask):\n    attention_weights = tf.matmul(q, k, transpose_b=True)\n    # scaled dot-product logic from scratch",
        techStack: ["TensorFlow", "Math", "Python"],
      },
      agentic: {
        headline: "Self-Attention Mechanism",
        description: "Dynamically weighs the importance of different words in a sequence to derive contextual meaning. Supervised learning on bilingual text pairs.",
        stat: "98% Accuracy",
        tags: ["Transformers", "Attention"]
      }
    },
  },
  {
    id: "infosys-intern",
    title: "Enterprise Mailing System",
    category: "Frontend Engineering",
    stack: ["React.js", "Tailwind CSS", "JavaScript"],
    content: {
      product: {
        headline: "Scaling Enterprise Communication.",
        painPoint: "Enterprise HR and Admin teams struggle with creating brand-compliant emails, wrestling with clunky legacy software.",
        targetAudience: "Internal stakeholders, HR departments, and corporate communications teams.",
        ahaMoment: "By componentizing email elements using React, non-technical staff no longer had to code. They could simply drag-and-drop to spin up pixel-perfect corporate emails.",
        swot: {
          s: "Massive operational efficiency gain, boosting template creation speed by 60%.",
          w: "React components had to be heavily constrained to ensure cross-client compatibility (e.g., older Outlook versions).",
          o: "Can easily be scaled beyond emails into a full-fledged internal CMS for employee portals.",
          t: "Employee resistance to adopting new tools in a rigid corporate environment."
        },
        keyAchievements: [
          { label: "Speed", value: "60% Faster" },
          { label: "Scale", value: "Enterprise-Wide" }
        ],
        techStack: ["React.js", "Tailwind CSS", "JavaScript"],
      },
      engineering: {
        headline: "Component-Driven Architecture",
        architecture: "Client-side React Single Page Application acting as a visual builder, translating drag-and-drop UI state into raw, compliant HTML structures.",
        architectureFlow: {
          groups: [
            { id: "ui", title: "Builder UI" },
            { id: "state", title: "State Engine" },
            { id: "export", title: "Export Pipeline" }
          ],
          nodes: [
            { id: "sidebar", title: "Component Library", tech: "React DnD", groupId: "ui" },
            { id: "canvas", title: "Drop Canvas", tech: "React State", groupId: "ui" },
            { id: "layout", title: "Layout AST", tech: "JSON Schema", groupId: "state" },
            { id: "compiler", title: "HTML Compiler", tech: "Inline CSS", groupId: "export" },
            { id: "preview", title: "Email Preview", tech: "Template Renderer", groupId: "export" }
          ],
          edges: [
            { fromId: "sidebar", toId: "canvas", labelTop: "drag payload" },
            { fromId: "canvas", toId: "layout", labelTop: "component state" },
            { fromId: "layout", toId: "compiler", labelTop: "render plan" },
            { fromId: "compiler", toId: "preview", labelTop: "compiled HTML", labelBottom: "QA ready" }
          ]
        },
        coreSnippet: "const handleDrop = (item) => {\n  setCanvasState(prev => [...prev, {\n    id: uuid(),\n    type: item.type,\n    styles: defaultStyles[item.type]\n  }]);\n};",
        techStack: ["React", "JavaScript", "CSS"],
      },
      agentic: {
        headline: "Rule-Based Assembly",
        description: "Enforces strict design system rules automatically during template generation. Non-ML, deterministic logic.",
        stat: "Deterministic",
        tags: ["React"]
      }
    },
  },
  {
    id: "infosys-se",
    title: "Automated Data Workflows",
    category: "Cloud Engineering",
    stack: ["Azure Databricks", ".NET Core", "SQL", "Python"],
    content: {
      product: {
        headline: "Enterprise Data Pipeline Automation.",
        painPoint: "Manual data processing and legacy infrastructure cause severe bottlenecks, leading to delayed reporting and high operational costs.",
        targetAudience: "Enterprise data teams and internal corporate stakeholders.",
        ahaMoment: "Migrating legacy processes to Azure Databricks enabled automated, scalable workflows that run entirely hands-off.",
        swot: {
          s: "Boosted overall system efficiency by 36% through cloud modernization.",
          w: "High initial migration and setup overhead for legacy systems.",
          o: "The pipeline architecture can be templated for other departments.",
          t: "Reliance on specific cloud vendors (Azure lock-in)."
        },
        keyAchievements: [
          { label: "Efficiency", value: "+36%" },
          { label: "Infrastructure", value: "Cloud Migrated" }
        ],
        techStack: ["Azure Databricks", ".NET Core", "SQL", "Python"],
      },
      engineering: {
        headline: "Cloud-Native Data Pipelines",
        architecture: "Enterprise data engineering architecture orchestrating large-scale ETL jobs using Azure infrastructure and .NET Core microservices.",
        architectureFlow: {
          groups: [
            { id: "azure", title: "Azure Cloud" },
            { id: "compute", title: "Data Processing" },
            { id: "serve", title: "Service Layer" }
          ],
          nodes: [
            { id: "ingest", title: "Data Factory", tech: "ADF Pipelines", groupId: "azure" },
            { id: "lake", title: "Raw Storage", tech: "Blob Storage", groupId: "azure" },
            { id: "spark", title: "Databricks Jobs", tech: "PySpark", groupId: "compute" },
            { id: "sql", title: "Serving DB", tech: "SQL Server", groupId: "serve" },
            { id: "api", title: "API Gateway", tech: ".NET Core", groupId: "serve" }
          ],
          edges: [
            { fromId: "ingest", toId: "lake", labelTop: "raw batches" },
            { fromId: "lake", toId: "spark", labelTop: "etl trigger" },
            { fromId: "spark", toId: "sql", labelTop: "curated tables" },
            { fromId: "sql", toId: "api", labelTop: "query response", labelBottom: "dashboard data" }
          ]
        },
        coreSnippet: "public async Task<IActionResult> TriggerEtlJob()\n{\n    var response = await _databricksClient.Jobs.RunNow(jobId);\n    return Ok(new { RunId = response.RunId });\n}",
        techStack: ["Azure", "Databricks", ".NET Core"],
      },
      agentic: {
        headline: "Automated ETL",
        description: "Executes rule-based data transformations and routing without human intervention. Deterministic orchestration.",
        stat: "Rule-based",
        tags: ["Databricks", "SQL"]
      }
    }
  }
];
