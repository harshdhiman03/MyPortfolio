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
export interface FrontendComponent {
  component: string;
  role: string;
}

export interface DataPipelineStep {
  step: string;
  description: string;
}

export interface EngineeringContent {
  headline: string;
  architecture: string;
  frontendStructure: FrontendComponent[];
  dataPipeline: DataPipelineStep[];
  coreSnippet: string;
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
  category: 'Professional' | 'Research' | 'Hackathon' | 'AI & Vision' | 'Web3 Gaming' | 'FinTech AI' | 'Cybersecurity' | 'Machine Learning' | 'Frontend Engineering' | 'Cloud Engineering';
  stack: string[]; 
  content: {
    product: ProductContent;
    engineering: EngineeringContent;
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
          s: "Extreme user convenience—eliminates the dependency on 'before' images. Validated by academia.",
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
        frontendStructure: [
          { component: "<StreamlitApp />", role: "Root Container" },
          { component: "├── <ImageUploader />", role: "Captures multipart post-meal image" },
          { component: "├── <InferenceState />", role: "Manages loading UI during ML processing" },
          { component: "└── <WasteDashboard />", role: "Renders visual contours and T5 text" }
        ],
        dataPipeline: [
          { step: "Image Ingestion", description: "Base64 decode and normalization to 224x224 tensors." },
          { step: "OpenCV Edge Detection", description: "Extracts physical boundaries of leftover food." },
          { step: "EfficientNetB0 Inference", description: "Classifies food type and estimates volume against baseline." },
          { step: "T5 Generative Pass", description: "Generates actionable reduction advice based on classification." }
        ],
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
        frontendStructure: [
          { component: "<ThirdwebProvider />", role: "Global Web3 Context & Auth" },
          { component: "├── <GameCanvas />", role: "Renders actual gameplay loop" },
          { component: "├── <SessionManager />", role: "Tracks local state changes (moves/scores)" },
          { component: "└── <RelayerSync />", role: "Batches local state and triggers wallet signature" }
        ],
        dataPipeline: [
          { step: "Session Init", description: "Player signs a zero-gas typed data message to start." },
          { step: "Local State Mutations", description: "Game loop runs entirely off-chain in Next.js state." },
          { step: "State Hashing", description: "Final session state is hashed using Keccak256." },
          { step: "On-Chain Settlement", description: "Smart contract verifies hash signature and updates balances." }
        ],
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
        frontendStructure: [
          { component: "<DashboardLayout />", role: "Next.js Grid Container" },
          { component: "├── <TradingViewWidget />", role: "Iframe/JS execution for live candlestick data" },
          { component: "├── <ChartContext />", role: "Extracts current ticker and timeframe" },
          { component: "└── <ChainlitChat />", role: "Websocket connection to Python AI backend" }
        ],
        dataPipeline: [
          { step: "Ticker Selection", description: "User changes chart view, triggering state update." },
          { step: "Data Extraction", description: "Current price action and basic indicators pulled from API." },
          { step: "Prompt Construction", description: "Numerical data injected into semantic text prompt." },
          { step: "T5 Inference", description: "68k-record fine-tuned model generates contextual advice." }
        ],
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
        frontendStructure: [
          { component: "<ThreatScoutApp />", role: "Streamlit Main View" },
          { component: "├── <URLInputBox />", role: "Captures target domain" },
          { component: "├── <ProgressTracker />", role: "Shows visual breakdown of scraping vs inference" },
          { component: "└── <SecurityReport />", role: "Displays final 96.8% confidence score" }
        ],
        dataPipeline: [
          { step: "URL Submission", description: "Target string passed to BeautifulSoup." },
          { step: "DOM Parsing", description: "Extracts textual structure and downloads rendered image assets." },
          { step: "Parallel Inference", description: "LSTM processes text sequences; CNN processes image tensors." },
          { step: "Heuristic Aggregation", description: "Combines ML outputs for final Safe/Phishing classification." }
        ],
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
        frontendStructure: [
          { component: "<No_GUI />", role: "Headless execution" },
          { component: "├── Training Script", role: "Executes epoch loops and loss calculation" },
          { component: "└── Inference Script", role: "Command line input for English string" }
        ],
        dataPipeline: [
          { step: "Tokenization", description: "Sub-word splitting and vocabulary mapping." },
          { step: "Positional Encoding", description: "Injects sequence order mathematics into embeddings." },
          { step: "Self-Attention", description: "Calculates Query, Key, Value matrices for contextual weights." },
          { step: "Softmax Output", description: "Generates probability distribution for French token prediction." }
        ],
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
        frontendStructure: [
          { component: "<EmailBuilderLayout />", role: "Main application wrapper" },
          { component: "├── <ComponentSidebar />", role: "Library of draggable React blocks" },
          { component: "├── <DropCanvas />", role: "Active workspace tracking array index" },
          { component: "└── <ExportEngine />", role: "Compiles React virtual DOM to inline-CSS HTML" }
        ],
        dataPipeline: [
          { step: "User Interaction", description: "Component dropped onto canvas, updating local state array." },
          { step: "Live Preview", description: "React maps array to DOM elements for WYSIWYG editing." },
          { step: "AST Generation", description: "Layout state converted to a JSON Abstract Syntax Tree." },
          { step: "HTML Compilation", description: "JSON mapped to rigid table-based HTML for email clients." }
        ],
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
        frontendStructure: [
          { component: "<AdminDashboard />", role: "Internal React view for monitoring pipelines" },
          { component: "├── <JobStatusGrid />", role: "Polls .NET backend for execution status" },
          { component: "└── <TriggerControls />", role: "Manual overrides for automated workflows" }
        ],
        dataPipeline: [
          { step: "Data Ingestion", description: "Azure Data Factory pulls raw files from legacy blob storage." },
          { step: "Transformation", description: "Databricks PySpark clusters clean and normalize the data." },
          { step: "Serving Layer", description: "Clean data is written to SQL Server." },
          { step: "API Exposure", description: ".NET Core REST APIs serve structured data to end clients." }
        ],
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