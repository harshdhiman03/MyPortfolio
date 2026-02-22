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

// Engineering Lens - Developer Tool / LLD Blueprint
export interface SystemComponent {
  name: string;
  role: string;
  tech: string;
}

export interface APIRoute {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  route: string;
  description: string;
}

export interface EngineeringContent {
  headline: string;
  architecture: string;
  systemComponents: SystemComponent[];
  apiReference: APIRoute[];
  schemaSnippet: string;
  techStack: string[];
}

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
  category: 'Professional' | 'Research' | 'Hackathon';
  stack: string[]; 
  content: {
    product: ProductContent;
    engineering: EngineeringContent;
    agentic: LegacyContent;
  };
}

export const projects: Project[] = [
  {
    id: "infosys-tv",
    title: "Infosys TV Authoring Automation",
    category: "Professional",
    stack: [".NET Core", "React", "SQL", "Databricks", "Azure", "Process Automation", "Enterprise Scale"],
    content: {
      product: {
        headline: "Accelerating Enterprise Workflows.",
        painPoint: "Manual data processing and legacy infrastructure cause severe bottlenecks, leading to delayed reporting and high operational costs for enterprise teams.",
        targetAudience: "Enterprise data teams and internal corporate stakeholders.",
        ahaMoment: "Migrating legacy manual processes to Azure Databricks enabled automated, scalable workflows that run entirely hands-off.",
        swot: {
          s: "Boosted overall system efficiency by 36% through cloud modernization.",
          w: "High initial migration and setup overhead for legacy systems.",
          o: "The pipeline architecture can be templated for other departments globally.",
          t: "Reliance on specific cloud vendors (Azure lock-in)."
        },
        keyAchievements: [
          { label: "Time Reduction", value: "36%" },
          { label: "Scale", value: "Enterprise" }
        ],
        techStack: [".NET Core", "React", "Azure", "Databricks"],
      },
      engineering: {
        headline: "Scalable Cloud Architecture",
        architecture: "Databricks → Azure SQL → REST API → React Frontend",
        systemComponents: [
          { name: "Data Ingestion", role: "Ingest raw TV files", tech: ".NET Core" },
          { name: "Processing Pipeline", role: "Transform & normalize", tech: "Databricks SQL" },
          { name: "Storage Layer", role: "Persistent data store", tech: "Azure SQL" },
          { name: "API Gateway", role: "REST endpoints", tech: ".NET Core APIs" },
          { name: "Frontend UI", role: "User interface", tech: "React" }
        ],
        apiReference: [
          { method: "POST", route: "/api/tv/upload", description: "Upload TV file for processing" },
          { method: "GET", route: "/api/tv/list", description: "Retrieve processed TV records" },
          { method: "GET", route: "/api/tv/:id", description: "Fetch specific TV by ID" },
          { method: "PUT", route: "/api/tv/:id", description: "Update TV record metadata" },
          { method: "DELETE", route: "/api/tv/:id", description: "Archive TV record" }
        ],
        schemaSnippet: `{
  "tvRecord": {
    "id": "uuid",
    "filename": "string",
    "status": "processing|completed|failed",
    "processedAt": "ISO8601",
    "rows": 45000,
    "size_mb": 234.5
  }
}`,
        techStack: [".NET Core", "React", "SQL", "Databricks", "Azure"]
      },
      agentic: {
        headline: "AI-Assisted Doc Generation",
        description: "Contributed to AI modules that generate technical documentation, reducing human error in variance reporting.",
        stat: "Automated Reporting",
        tags: ["Doc Gen", "Automation Logic"]
      }
    }
  },
  {
    id: "foodoptima",
    title: "FoodOptima (Springer/Scopus)",
    category: "Research",
    stack: ["EfficientNetB0", "OpenCV", "Streamlit", "Python", "Transformers", "Hugging Face", "T5"],
    content: {
      product: {
        headline: "Ending Food Waste with AI.",
        painPoint: "Food wastage tracking systems create friction by requiring users to take annoying 'before-meal' images.",
        targetAudience: "Environmentally conscious consumers, restaurants, and commercial cafeterias.",
        ahaMoment: "The system learns portion-size baselines directly from food datasets, estimating wasted volume using only a single post-meal image.",
        swot: {
          s: "Extreme user convenience—eliminates the dependency on 'before' images. Validated by academia.",
          w: "Baseline intelligence is currently tied to specific data (Indian food datasets).",
          o: "Scaling the dataset to global cuisines and adapting for commercial cafeteria SaaS.",
          t: "Relies heavily on the user capturing a clear, well-lit post-meal image."
        },
        keyAchievements: [
          { label: "Publication", value: "Scopus" },
          { label: "Friction", value: "Zero Pre-Scans" }
        ],
        techStack: ["EfficientNetB0", "OpenCV", "T5 Transformer", "Streamlit"],
      },
      engineering: {
        headline: "Computer Vision Pipeline",
        architecture: "Image Input → EfficientNetB0 → OpenCV Processing → Volume Estimation",
        systemComponents: [
          { name: "Image Preprocessor", role: "Normalize & resize images", tech: "OpenCV" },
          { name: "Feature Extractor", role: "Extract DNN features", tech: "EfficientNetB0" },
          { name: "Contour Detector", role: "Detect food boundaries", tech: "OpenCV" },
          { name: "Volume Calculator", role: "Estimate food volume", tech: "NumPy" },
          { name: "UI Layer", role: "Interactive visualization", tech: "Streamlit" }
        ],
        apiReference: [
          { method: "POST", route: "/api/food/analyze", description: "Upload image for waste analysis" },
          { method: "GET", route: "/api/food/history", description: "Get user's waste history" },
          { method: "POST", route: "/api/food/recommend", description: "Get reduction strategies" },
          { method: "GET", route: "/api/food/stats", description: "Get aggregate statistics" }
        ],
        schemaSnippet: `{
  "analysisResult": {
    "image_id": "uuid",
    "waste_volume_ml": 245,
    "confidence": 0.94,
    "food_type": "rice",
    "recommendation": "Reduce portion by 20%",
    "timestamp": "ISO8601"
  }
}`,
        techStack: ["EfficientNetB0", "OpenCV", "Streamlit", "Python"]
      },
      agentic: {
        headline: "Generative Recommendations",
        description: "Fine-tuned a T5 Transformer on Indian food datasets to generate personalized reduction strategies based on waste patterns.",
        stat: "Fine-tuned T5",
        tags: ["Transformers", "Hugging Face", "GenAI"]
      }
    }
  },
  {
    id: "runic-realm",
    title: "Runic Realm",
    category: "Hackathon",
    stack: ["Solidity", "Next.js", "Ethers.js", "ThirdWeb", "Base Blockchain", "Smart Contracts", "Web3"],
    content: {
      product: {
        headline: "Web3 Gaming Without Friction.",
        painPoint: "High blockchain transaction costs (gas fees) and constant wallet approval pop-ups ruin the immersive experience for casual gamers.",
        targetAudience: "Casual gamers and Web3 enthusiasts tired of expensive micro-transactions.",
        ahaMoment: "Using a Session-Based Gaming Model, the platform batches interactions securely, preserving player funds and focus.",
        swot: {
          s: "Drastically improves UX by reducing transaction friction by 40% and load times by 30%.",
          w: "Requires players to have a basic understanding of connecting a Web3 wallet.",
          o: "The session-based model can be licensed as a framework for other Web3 developers.",
          t: "Dependent on the underlying Base Blockchain's network stability."
        },
        keyAchievements: [
          { label: "Winner", value: "HackIndia Spark-2" },
          { label: "Friction", value: "-40%" }
        ],
        techStack: ["Next.js", "Solidity", "Ethers.js", "ThirdWeb"],
      },
      engineering: {
        headline: "Session-Based Blockchain Logic",
        architecture: "Wallet Connection → Session Key Generation → Transaction Batching → Base Chain Execution",
        systemComponents: [
          { name: "Auth Module", role: "Wallet connection & verification", tech: "Ethers.js" },
          { name: "Session Manager", role: "Generate & manage session keys", tech: "Solidity" },
          { name: "Transaction Pool", role: "Batch user transactions", tech: "Smart Contracts" },
          { name: "Contract Executor", role: "Execute batched calls", tech: "Base Chain" },
          { name: "Frontend SDK", role: "Session abstraction layer", tech: "Next.js + ThirdWeb" }
        ],
        apiReference: [
          { method: "POST", route: "/api/session/create", description: "Initialize session key" },
          { method: "POST", route: "/api/txn/queue", description: "Queue transaction in pool" },
          { method: "POST", route: "/api/txn/batch", description: "Batch & execute transactions" },
          { method: "GET", route: "/api/session/status", description: "Check session validity" },
          { method: "POST", route: "/api/session/revoke", description: "Revoke session key" }
        ],
        schemaSnippet: `{
  "sessionKey": {
    "key": "0x...",
    "player_address": "0x...",
    "valid_until": "ISO8601",
    "txn_count": 24,
    "gas_optimized": true
  }
}`,
        techStack: ["Solidity", "Ethers.js", "Next.js", "ThirdWeb", "Base Chain"]
      },
      agentic: {
        headline: "Smart Contract Logic",
        description: "While not Generative AI, the autonomous state management mimics agentic behavior through self-executing smart contracts.",
        stat: "Autonomous State",
        tags: ["Smart Contracts", "Base Chain"]
      }
    }
  },
  {
    id: "transformer-core",
    title: "English-to-French Translator",
    category: "Research",
    stack: ["TensorFlow", "Deep Learning", "Math", "Encoder-Decoder", "Attention Mechanism", "Self-Attention"],
    content: {
      product: {
        headline: "Context-Aware Neural Translation.",
        painPoint: "Traditional statistical translation models translate word-for-word, failing to grasp nuance and resulting in robotic text.",
        targetAudience: "Enterprises needing highly accurate, context-aware translation engines.",
        ahaMoment: "By implementing Self-Attention mechanisms, the model looks at the entire sentence at once to understand contextual meaning.",
        swot: {
          s: "Exceptional performance, achieving 98% translation accuracy while improving computational efficiency.",
          w: "Requires strictly curated, high-quality bilingual datasets to avoid learning bad grammar.",
          o: "Can be custom-trained on highly specialized domains (e.g., legal or medical).",
          t: "Competing with state-of-the-art commercial LLMs requires immense GPU compute power."
        },
        keyAchievements: [
          { label: "Accuracy", value: "98%" },
          { label: "Architecture", value: "From Scratch" }
        ],
        techStack: ["TensorFlow", "Python", "Deep Learning"],
      },
      engineering: {
        headline: "Transformer from Scratch",
        architecture: "Input Embedding → Self-Attention Layers → Feed-Forward → Output Projection",
        systemComponents: [
          { name: "Tokenizer", role: "Convert text to tokens", tech: "Python" },
          { name: "Embedding Layer", role: "Token → Dense vectors", tech: "TensorFlow" },
          { name: "Positional Encoding", role: "Add sequence position info", tech: "NumPy Math" },
          { name: "Multi-Head Attention", role: "Compute attention weights", tech: "TensorFlow" },
          { name: "Encoder-Decoder Stack", role: "Transform sequences", tech: "TensorFlow Core" }
        ],
        apiReference: [
          { method: "POST", route: "/api/translate", description: "Translate English to French" },
          { method: "GET", route: "/api/model/info", description: "Get model architecture details" },
          { method: "POST", route: "/api/batch/translate", description: "Batch translation requests" },
          { method: "GET", route: "/api/metrics", description: "Model performance metrics" }
        ],
        schemaSnippet: `{
  "translation": {
    "source": "The quick brown fox jumps",
    "target": "Le rapide renard brun saute",
    "confidence": 0.98,
    "attention_scores": [0.92, 0.87, 0.95, 0.89, 0.91],
    "inference_ms": 145
  }
}`,
        techStack: ["TensorFlow", "Python", "Deep Learning", "Math"]
      },
      agentic: {
        headline: "The DNA of Agents",
        description: "Implemented Self-Attention mechanisms—the core logic that allows modern AI Agents to 'think' and retain context.",
        stat: "Self-Attention",
        tags: ["Attention Mech", "Encoder-Decoder"]
      }
    }
  },
  {
    id: "finspire",
    title: "FinSpire AI",
    category: "Research",
    stack: ["Next.js", "TradingView API", "Python", "T5", "Fine-tuning", "NLP", "FinTech"],
    content: {
      product: {
        headline: "Democratizing Financial Insights.",
        painPoint: "Retail investors are constantly bombarded with raw market data and complex charts, struggling to interpret the noise.",
        targetAudience: "Retail investors and casual traders seeking plain-English market analysis.",
        ahaMoment: "Users can look at an intimidating stock chart and simply ask a chatbot, 'What does this mean for my portfolio?'",
        swot: {
          s: "Highly specialized domain knowledge trained on 68K financial records.",
          w: "Financial markets change by the second, requiring constant model updates.",
          o: "Expanding into premium tiers for institutional-grade sentiment analytics.",
          t: "Financial advice carries inherent trust and liability risks."
        },
        keyAchievements: [
          { label: "Training Data", value: "68,000 Records" },
          { label: "Insights", value: "Real-Time" }
        ],
        techStack: ["Next.js", "TradingView API", "T5 Transformer", "Python"],
      },
      engineering: {
        headline: "Live Market Data Ingestion",
        architecture: "TradingView API → WebSocket Stream → Python Backend → Redis Cache → Next.js UI",
        systemComponents: [
          { name: "API Consumer", role: "Pull live market feeds", tech: "TradingView API" },
          { name: "WebSocket Server", role: "Real-time data streaming", tech: "Python (AsyncIO)" },
          { name: "Data Cache", role: "Reduce API calls", tech: "Redis" },
          { name: "Backend Service", role: "Process & enrich data", tech: "Python FastAPI" },
          { name: "Frontend Client", role: "Display insights", tech: "Next.js + React" }
        ],
        apiReference: [
          { method: "GET", route: "/api/ticker/:symbol", description: "Get current stock price" },
          { method: "GET", route: "/api/historical/:symbol", description: "Fetch historical data" },
          { method: "POST", route: "/api/analysis", description: "AI sentiment analysis" },
          { method: "GET", route: "/api/portfolio/analysis", description: "Portfolio summary" },
          { method: "POST", route: "/api/alert/set", description: "Create price alert" }
        ],
        schemaSnippet: `{
  "marketData": {
    "symbol": "AAPL",
    "price": 178.45,
    "change_percent": 2.34,
    "volume": 52341000,
    "timestamp": "ISO8601",
    "ai_sentiment": "bullish"
  }
}`,
        techStack: ["Next.js", "TradingView API", "Python", "Redis"]
      },
      agentic: {
        headline: "Domain-Specific LLM",
        description: "Fine-tuned a T5 model specifically on financial texts to provide RAG-like summaries and investment context.",
        stat: "Domain Adaptation",
        tags: ["T5", "Fine-tuning", "NLP"]
      }
    }
  },
  {
    id: "hacksuraksha",
    title: "HackSuraksha",
    category: "Hackathon",
    stack: ["LSTM", "CNN", "BeautifulSoup", "Cybersecurity", "Python", "Machine Learning", "Pattern Recognition"],
    content: {
      product: {
        headline: "Automated Threat Scouting.",
        painPoint: "Everyday internet users frequently fall victim to highly convincing fake websites and scam customer-care numbers.",
        targetAudience: "Everyday web consumers and enterprise Trust & Safety teams.",
        ahaMoment: "It doesn't just read the URL; it uses AI to analyze the web address while simultaneously using visual AI to look at the ad images on the site.",
        swot: {
          s: "Exceptionally high precision (96.8% accuracy) due to combined text and image analysis.",
          w: "Relies on web scraping; dynamically loaded sites (heavy JS) can break the scraper.",
          o: "Packaging the model as a lightweight Chrome extension for real-time user protection.",
          t: "Adversarial attacks (subtly altering images to trick CNNs) by evolving scammers."
        },
        keyAchievements: [
          { label: "Accuracy", value: "96.8%" },
          { label: "Rank", value: "Top 300 National" }
        ],
        techStack: ["LSTM", "CNN", "Streamlit", "BeautifulSoup"],
      },
      engineering: {
        headline: "Multi-Modal Classification",
        architecture: "URL Input → Text Analysis (LSTM) + Image Analysis (CNN) → Fusion → Threat Score",
        systemComponents: [
          { name: "Web Scraper", role: "Extract page content & images", tech: "BeautifulSoup" },
          { name: "URL Analyzer", role: "Linguistic pattern detection", tech: "LSTM" },
          { name: "Image Classifier", role: "Detect fake logos/UI", tech: "CNN" },
          { name: "Feature Fusion", role: "Combine text & visual features", tech: "NumPy" },
          { name: "Threat Engine", role: "Calculate fraud probability", tech: "Scikit-learn" }
        ],
        apiReference: [
          { method: "POST", route: "/api/scan/url", description: "Analyze URL for phishing" },
          { method: "POST", route: "/api/scan/number", description: "Check for scam numbers" },
          { method: "GET", route: "/api/threat/report/:id", description: "Get threat analysis report" },
          { method: "POST", route: "/api/report/submit", description: "Report new threat" },
          { method: "GET", route: "/api/stats", description: "Aggregate threat statistics" }
        ],
        schemaSnippet: `{
  "threatAnalysis": {
    "url": "https://example.com",
    "url_score": 0.92,
    "image_score": 0.88,
    "combined_score": 0.91,
    "classification": "HIGH_RISK",
    "confidence": 0.968,
    "flagged_elements": ["logo_mismatch", "script_injection"]
  }
}`,
        techStack: ["LSTM", "CNN", "BeautifulSoup", "Scikit-learn"]
      },
      agentic: {
        headline: "Automated Threat Scouting",
        description: "The system acts as a defensive agent, proactively scraping and analyzing web patterns to flag threats.",
        stat: "Active Learning",
        tags: ["Scraping Agent", "Pattern Rec"]
      }
    }
  }
];

export interface ExperienceContent {
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  content: {
    product: ExperienceContent;
    engineering: ExperienceContent;
    agentic: ExperienceContent;
  };
}

export const experiences: Experience[] = [
  {
    id: 'infosys-se',
    company: 'Infosys',
    role: 'System Engineer',
    period: '08/2025 - Present',
    content: {
      product: {
        summary: 'Reduced manual content authoring by 36%, enabling teams to focus on creative work.',
      },
      engineering: {
        summary: 'Built automated workflows using Azure Databricks and .NET Core, scaling TV authoring platform.',
      },
      agentic: {
        summary: 'Implemented autonomous workflow automation with intelligent decision trees for content adaptation.',
      },
    },
  },
  {
    id: 'infosys-intern',
    company: 'Infosys',
    role: 'Intern',
    period: '01/2025 - 06/2025',
    content: {
      product: {
        summary: 'Shipped React mailing system 60% faster than previous implementation.',
      },
      engineering: {
        summary: 'Developed full-stack React + .NET Core application with SQL Server integration.',
      },
      agentic: {
        summary: 'Explored AI-driven template generation for email customization.',
      },
    },
  },
  {
    id: 'ravvio',
    company: 'Ravvio Labs',
    role: 'ML Intern',
    period: '07/2024 - 12/2024',
    content: {
      product: {
        summary: 'Created AI solutions that improved user engagement metrics by 40%.',
      },
      engineering: {
        summary: 'Trained and deployed TensorFlow models on production infrastructure.',
      },
      agentic: {
        summary: 'Fine-tuned transformer models for text summarization and NLP tasks.',
      },
    },
  },
];