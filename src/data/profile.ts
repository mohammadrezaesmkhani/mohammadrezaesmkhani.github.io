/**
 * ════════════════════════════════════════════════════════════════════
 *  CONTENT — single source of truth for the whole site.
 *  Edit this file to update text, links, projects and publications.
 *
 *  Placeholders: any link left as an empty string ('') is rendered as a
 *  tasteful "pending" label instead of a broken link. Fill them in when
 *  ready — nothing else needs to change.
 * ════════════════════════════════════════════════════════════════════
 */

export const profile = {
  name: 'M. Reza Esmkhani',
  firstName: 'M. Reza',
  lastName: 'Esmkhani',
  title: 'AI Engineer | Deep Learning Researcher | Aspiring PhD Candidate',
  shortTitle: 'AI Engineer / Researcher',
  location: 'Open to international research opportunities',
  availability: 'Open to PhD & Research Opportunities',
  tagline: 'Exploring the boundaries of intelligent systems.',
  statement: 'Building intelligent systems. Exploring new ideas. Turning research into reality.',
  summary: [
    'I am an AI Engineer and Deep Learning Researcher interested in building intelligent systems that combine scientific research with practical engineering.',
    'My work focuses on Large Language Models, Retrieval-Augmented Generation, Agentic AI, Parameter-Efficient Fine-Tuning, Computer Vision, and efficient deep learning architectures.',
    'I enjoy exploring how AI models work internally, developing novel adaptation strategies, improving model efficiency, and translating research ideas into practical systems.',
    'My long-term goal is to contribute to advanced AI research through a PhD and develop intelligent systems that make a meaningful impact.',
  ],
};

/**
 * CONTACT & SOCIAL — replace the empty strings with your real details.
 *   email:   'name@example.com'          (no "mailto:" needed)
 *   github:  'https://github.com/<user>'
 *   scholar: 'https://scholar.google.com/citations?user=<id>'
 *   linkedin:'https://www.linkedin.com/in/<handle>'
 */
export const contact = {
  email: 'm.rezaesmkhani@hotmail.com',
  github: 'https://github.com/mohammadrezaesmkhani',
  scholar: 'https://scholar.google.com/citations?user=DBgq5vUAAAAJ&hl=en',
  linkedin: '',
};

export type Interest = {
  id: string;
  label: string;
  short: string;
  description: string;
  links: string[]; // ids of related interests
  related: string[]; // related projects / work
};

export const interests: Interest[] = [
  {
    id: 'llm',
    label: 'Large Language Models',
    short: 'LLMs',
    description:
      'How large language models represent and retrieve knowledge — and how to adapt them without retraining from scratch.',
    links: ['rag', 'peft', 'mm', 'eff'],
    related: ['Agentic Financial RAG', 'Persian Whisper Optimization'],
  },
  {
    id: 'rag',
    label: 'Agentic AI & RAG',
    short: 'Agents · RAG',
    description:
      'Retrieval pipelines and agentic workflows that answer complex, multi-step questions with grounded, citable evidence.',
    links: ['llm', 'eff'],
    related: ['Agentic Financial RAG', 'Banking Agentic RAG · AIOpt'],
  },
  {
    id: 'peft',
    label: 'Parameter-Efficient Fine-Tuning',
    short: 'PEFT',
    description:
      'LoRA, QLoRA and representation-level interventions (ReFT) for adapting foundation models on modest compute.',
    links: ['llm', 'cl', 'eff', 'cv'],
    related: ['DS-ReFT', 'Persian Whisper Optimization', 'Generative Virtual Try-On'],
  },
  {
    id: 'cl',
    label: 'Continual Learning & Catastrophic Forgetting',
    short: 'Continual Learning',
    description:
      'Teaching models new tasks while preserving what they already know — the stability–plasticity trade-off.',
    links: ['peft', 'mm'],
    related: ['DS-ReFT', 'Quantized continual adaptation · AIOpt'],
  },
  {
    id: 'cv',
    label: 'Computer Vision',
    short: 'Vision',
    description:
      'Vision Transformers and CNNs for recognition and medical image analysis, from research models to embedded hardware.',
    links: ['mm', 'peft', 'eff'],
    related: ['Swin Transformer for Melanoma', 'SecureVision'],
  },
  {
    id: 'mm',
    label: 'Multimodal AI',
    short: 'Multimodal',
    description:
      'Shared vision–language representations such as CLIP, and how their semantic geometry shifts under adaptation.',
    links: ['llm', 'cv', 'cl'],
    related: ['DS-ReFT', 'Generative Virtual Try-On'],
  },
  {
    id: 'eff',
    label: 'Efficient Foundation Models',
    short: 'Efficiency',
    description:
      'Quantization, distillation and inference optimization that move large models onto local, affordable hardware.',
    links: ['llm', 'peft', 'rag', 'cv'],
    related: ['Generative Virtual Try-On', 'C-based inference · AIOpt'],
  },
];

export const publications = [
  {
    title: 'An efficient Swin Transformer architecture for cutaneous melanoma detection',
    role: 'First Author',
    venue: 'Intelligence-Based Medicine', // Elsevier journal (from DOI prefix j.ibmed)
    quartile: 'Q2',
    year: '2026',
    type: 'Journal Article',
    doi: '10.1016/j.ibmed.2026.100484',
    url: 'https://www.sciencedirect.com/science/article/pii/S2666521226001420',
    areas: ['Medical AI', 'Computer Vision', 'Vision Transformers'],
  },
];

export type ProjectLinkSet = {
  /** Leave '' to show "Code · forthcoming" */
  github: string;
  /** Leave '' to hide / show "Demo · forthcoming" */
  demo: string;
  /** Optional paper link */
  paper?: string;
};

export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  kind: 'Research' | 'Engineering';
  status: string;
  summary: string;
  points: string[];
  stack: string[];
  visual: 'rag' | 'reft' | 'whisper' | 'swin' | 'tryon';
  links: ProjectLinkSet;
};

export const projects: Project[] = [
  {
    id: 'financial-rag',
    index: '01',
    title: 'Agentic Financial RAG',
    subtitle: 'Document intelligence over SEC 10-K filings',
    kind: 'Engineering',
    status: 'In active development',
    summary:
      'An agentic retrieval system designed to answer complex financial questions over SEC 10-K filings — with an emphasis on retrieval quality and verifiable citations.',
    points: [
      'Structured parsing of long, table-heavy filings',
      'Vector search with agentic multi-step retrieval',
      'Evaluation of retrieval quality and citation accuracy',
    ],
    stack: ['Python', 'RAG', 'LLMs', 'Vector Search', 'Document Parsing', 'Retrieval Evaluation', 'Citation Accuracy'],
    visual: 'rag',
    links: { github: 'https://github.com/mohammadrezaesmkhani/finrag-agent', demo: '' },
  },
  {
    id: 'ds-reft',
    index: '02',
    title: 'DS-ReFT',
    subtitle: 'Orthogonal Semantic Shift',
    kind: 'Research',
    status: 'Ongoing experimental research',
    summary:
      'An experimental direction in representation fine-tuning for CLIP: can a model learn new tasks through orthogonal semantic shifts while preserving what it already knows?',
    points: [
      'Learn new tasks while preserving prior knowledge',
      'Reduce catastrophic forgetting',
      'Explore orthogonal shifts in representation space',
      'Investigate ReFT-based adaptation strategies',
    ],
    stack: ['PyTorch', 'CLIP', 'ReFT', 'PEFT', 'Representation Learning'],
    visual: 'reft',
    links: { github: '', demo: '' },
  },
  {
    id: 'persian-whisper',
    index: '03',
    title: 'Surgical-Whisper',
    subtitle: 'Progressive Multi-Stage QLoRA for Low-Resource Persian ASR',
    kind: 'Engineering',
    status: 'Industry project · AIOpt',
    summary:
      'Progressive, layer-selective Parameter-Efficient Fine-Tuning (PEFT) framework for adapting openai/whisper-medium to low-resource Persian Automatic Speech Recognition. Uses a Multi-Stage Surgical Curriculum (Freeze → Surgical Adapt → Merge → Full-Layer Re-LoRA → Anti-Forgetting Domain Replay) that reduces validation Word Error Rate from 34.0% baseline to 10.0% on Mozilla Common Voice.',
    points: [
      'Surgical Adapt: Freeze acoustic layers 0–8, adapt only semantic layers 9–23 with rank-32 LoRA (prevents Acoustic Representation Collapse)',
      'Stage 2 Merge-and-Reinit: Permanently fuse Stage 1 adapters, re-quantize to 4-bit NF4, initialize fresh rank-32 LoRA across all 24 layers (rank expansion: 32 → 64)',
      'Catastrophic Forgetting control: Spectral depth regularization on top 6 layers (18–23), halved rank (r=16), Experience Replay mixing across Common Voice and Mana domains',
      'Parameter accounting: 21.6M trainable params (Stage 1), 34.6M (Stage 2), 4.3M (Anti-Forgetting)',
    ],
    stack: ['Whisper Medium', 'QLoRA', 'Persian ASR', 'PEFT', 'LoRA', 'Surgical Fine-Tuning', 'NF4 Quantization', 'Experience Replay'],
    visual: 'whisper',
    links: { github: 'https://github.com/mohammadrezaesmkhani/whisper-med-persian', demo: '' },
  },
  {
    id: 'swin-melanoma',
    index: '04',
    title: 'Vision Transformer for Medical Imaging',
    subtitle: 'Efficient Swin Transformer for melanoma detection',
    kind: 'Research',
    status: 'Published · 2026',
    summary:
      'Research on cutaneous melanoma detection using an efficient Swin Transformer architecture — published as a first-author journal article.',
    points: ['Hierarchical shifted-window attention', 'Efficiency-oriented architecture design', 'Dermoscopic image analysis'],
    stack: ['Computer Vision', 'Medical Image Analysis', 'Swin Transformer', 'Deep Learning'],
    visual: 'swin',
    links: { github: '', demo: '', paper: 'https://doi.org/10.1016/j.ibmed.2026.100484' },
  },
  {
    id: 'virtual-try-on',
    index: '05',
    title: 'Generative AI for Virtual Try-On',
    subtitle: 'Efficient adaptation of generative models',
    kind: 'Research',
    status: 'Exploratory · Far Fashion Park',
    summary:
      'Exploring how knowledge distillation and parameter-efficient fine-tuning can bring FLUX-class generative capabilities to fashion applications and locally deployable systems.',
    points: ['Knowledge distillation for FLUX models', 'PEFT for garment-aware generation', 'Paths to local deployment'],
    stack: ['FLUX', 'Knowledge Distillation', 'PEFT', 'Generative AI', 'Virtual Try-On'],
    visual: 'tryon',
    links: { github: '', demo: '' },
  },
];

export type Role = {
  period: string;
  role: string;
  org: string;
  place?: string;
  website?: string;
  highlight?: { value: string; label: string };
  groups: { label?: string; items: string[] }[];
  tags: string[];
};

export const experience: Role[] = [
  {
    period: 'Mar 2026 — Jul 2026',
    role: 'AI Engineer',
    org: 'Far Fashion Park',
    groups: [
      {
        items: [
          'Worked on Knowledge Distillation and Parameter-Efficient Fine-Tuning for FLUX models.',
          'Explored adapting generative models for Virtual Try-On applications.',
          'Investigated efficient ways to bring advanced generative model capabilities into locally deployable systems.',
        ],
      },
    ],
    tags: ['FLUX', 'Distillation', 'PEFT', 'Generative AI'],
  },
  {
    period: 'Jun 2025 — Dec 2025',
    role: 'Senior AI Engineer',
    org: 'AIOpt',
    website: 'https://aiopt.io/',
    highlight: { value: '≈10%', label: 'Word Error Rate in the reported Persian ASR evaluation' },
    groups: [
      {
        items: [
          'Worked on large language models, parameter-efficient fine-tuning, and AI-powered retrieval systems.',
          'Fine-tuned Persian Whisper using QLoRA, investigated Persian tokenizer challenges, and developed agentic RAG solutions for complex banking questions.',
          'Explored embedding-based clustering to improve retrieval efficiency and reduce computational overhead.',
        ],
      },
    ],
    tags: ['LLMs', 'PEFT', 'QLoRA', 'Agentic RAG', 'Retrieval'],
  },
  {
    period: '4 months',
    role: 'AI Researcher',
    org: 'White Tree Academy',
    groups: [
      {
        items: [
          'Conducted research on EEG signal analysis using Emotiv EEG devices, exploring patterns associated with conditions such as anxiety and ADHD.',
          'Investigated signal processing techniques and examined potentially meaningful patterns in EEG data.',
        ],
      },
    ],
    tags: ['EEG', 'Signal Processing', 'Research'],
  },
  {
    period: '2022 — Present',
    role: 'Founder & AI Specialist',
    org: 'SecureVision',
    place: 'Guilan Science and Technology Park',
    groups: [
      {
        items: [
          'Developed AI-based smart home solutions.',
          'Worked on face recognition systems for resource-constrained hardware.',
          'Integrated computer vision with embedded systems and Arduino-based solutions.',
        ],
      },
    ],
    tags: ['Face Recognition', 'Embedded CV', 'Arduino'],
  },
  {
    period: '≈ 1 year',
    role: 'Python & Machine Learning Instructor',
    org: 'Gilan Maharat',
    website: 'https://guilanedu.ir/',
    groups: [{ items: ['Taught Python programming and Machine Learning for approximately one year.'] }],
    tags: ['Teaching', 'Python', 'ML'],
  },
];

export const education = [
  {
    abbr: 'M.Sc.',
    degree: 'M.Sc. in Artificial Intelligence',
    school: 'North Tehran University',
    place: 'Iran',
    period: 'Thesis defense pending',
    gpa: '19.34',
    scale: '20',
    notes: [
      'Thesis-based master’s program.',
      'Research focus: deep learning and medical image analysis.',
    ],
    status: 'Thesis defense pending',
    coursework: [
      { course: 'Computer Vision', grade: '19.5/20' },
      { course: 'Evolutionary Computing', grade: '19.6/20' },
      { course: 'Machine Learning', grade: '19.5/20' },
      { course: 'Research Methods', grade: '19/20' },
      { course: 'Knowledge & Reasoning Demonstration (Fuzzy Systems)', grade: '19.5/20' },
      { course: 'Digital Signal Processing', grade: '20/20' },
      { course: 'Neural Networks and Deep Learning', grade: '20/20' },
      { course: 'Digital Image Processing', grade: '19/20' },
      { course: 'Natural Language Processing', grade: '19/20' },
      { course: 'Seminar', grade: '20/20' },
    ],
  },
  {
    abbr: 'B.Sc.',
    degree: 'B.Sc. in Electrical Engineering — Electronics',
    school: 'University of Guilan',
    place: 'Iran',
    period: '2022',
    gpa: '14.50',
    scale: '20',
    notes: ['Electronics specialization — the hardware foundation behind later work on embedded computer vision.'],
    status: 'Completed 2022',
    coursework: [
      { course: 'Engineering Mathematics', grade: '19.50/20' },
      { course: 'Modern Physics (Quantum Physics)', grade: '20/20' },
      { course: 'Electronics II', grade: '18/20' },
      { course: 'Mathematics II', grade: '16/20' },
      { course: 'Digital Logic Circuits II (FPGA)', grade: '19.50/20' },
    ],
    awards: [
      {
        title: 'Second Place — Top Ideas Competition',
        org: 'Guilan Science and Technology Park',
        place: 'Iran',
        detail: 'Earned direct admission to the Science and Technology Park as a Technology Core (Nucleus) following this achievement.',
      },
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'AI & Deep Learning',
    items: ['PyTorch', 'Deep Learning', 'CNNs', 'Transformers', 'Vision Transformers', 'Swin Transformer', 'Transfer Learning', 'Knowledge Distillation'],
  },
  {
    group: 'LLMs & Generative AI',
    items: ['Large Language Models', 'RAG', 'Agentic RAG', 'LangChain', 'LangGraph', 'PEFT', 'LoRA', 'QLoRA', 'ReFT', 'Fine-Tuning'],
  },
  {
    group: 'Computer Vision',
    items: ['Image Classification', 'Medical Image Analysis', 'CLIP', 'U-Net', 'Object Recognition', 'Generative AI'],
  },
  {
    group: 'Engineering',
    items: ['Python', 'C', 'Docker', 'Git', 'Linux', 'ONNX', 'Vector Databases', 'API Development'],
  },
];

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'research', label: 'Research' },
  { id: 'publications', label: 'Publications' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];
