import {
    ShieldCheck, Scale, Radar, Siren, SearchCheck, Gauge,
    Landmark, Flame, Building2, HeartPulse, ShoppingCart, Factory, GraduationCap, Briefcase,
    Lightbulb, Gem, Users, Cloud, BrainCircuit, Boxes, Network, Eye,
    Compass, ClipboardList, Shield, MonitorCheck, LifeBuoy, TrendingUp,
    MessageSquare, Map, Rocket, RefreshCw,
} from "lucide-react";

export const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Cyber Security Services", to: "/cyber-security-services" },
    { label: "Solutions", to: "/solutions" },
    { label: "Industries", to: "/industries" },
    { label: "Technology Partners", to: "/technology-partners" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
];

export const SOLUTIONS = [
    {
        slug: "cyber-defense",
        title: "Cyber Defense Services",
        description: "Comprehensive SOC, NOC & IT Operations Management",
        icon: ShieldCheck,
        overview:
            "Continuous defense for your digital environment. Our cyber defense services bring together security operations, network operations, and IT operations management so your organization stays protected, observable, and operational around the clock.",
        focus: [
            "Security Operations (SOC) management",
            "Network Operations (NOC) management",
            "IT operations monitoring & management",
            "Operational reporting and service visibility",
        ],
    },
    {
        slug: "governance-risk-compliance",
        title: "Governance, Risk & Compliance",
        description: "Strengthening IT governance, managing risks, and ensuring secure, compliant operations",
        icon: Scale,
        overview:
            "A structured approach to governance, risk, and compliance that helps leadership make confident decisions. We help organizations define policies, understand their risk posture, and operate in a secure, compliant, and auditable way.",
        focus: [
            "IT governance frameworks & policy design",
            "Risk identification, assessment & treatment",
            "Compliance readiness & audit support",
            "Security awareness & governance reporting",
        ],
    },
    {
        slug: "cybersecurity",
        title: "Cybersecurity",
        description: "Proactive threat detection, prevention, and rapid response solutions",
        icon: Radar,
        overview:
            "Security built for a fast-moving threat landscape. We combine proactive threat detection, layered prevention, and rapid response capabilities to reduce risk and keep your business resilient.",
        focus: [
            "Threat detection & prevention",
            "Security monitoring & alerting",
            "Incident response readiness",
            "Security assessments & hardening",
        ],
    },
    {
        slug: "ar-vr",
        title: "AR/VR Solutions",
        description: "Extended Reality (XR) Training & Visualization Solutions",
        icon: Boxes,
        overview:
            "Immersive extended reality experiences for training and visualization. AR/VR solutions help teams learn faster, practice safely, and visualize complex environments in entirely new ways.",
        focus: [
            "Immersive training environments",
            "3D visualization & simulation",
            "Virtual walkthroughs & digital twins",
            "XR solution design & delivery",
        ],
    },
    {
        slug: "ai-for-business",
        title: "AI for Business",
        description: "AI-Powered Automation & Analytics Solutions",
        icon: BrainCircuit,
        overview:
            "Practical AI that works for your business. From intelligent automation to advanced analytics, we help organizations turn data into decisions and manual processes into efficient, automated workflows.",
        focus: [
            "AI-powered process automation",
            "Business analytics & intelligence",
            "Data-driven decision support",
            "AI solution design & integration",
        ],
    },
    {
        slug: "cloud",
        title: "Cloud Solutions",
        description: "Secure, scalable cloud solutions designed for business growth",
        icon: Cloud,
        overview:
            "Cloud built for growth and governed for security. We design, migrate, and manage secure cloud environments that scale with your business and support modern ways of working.",
        focus: [
            "Cloud strategy & architecture",
            "Secure cloud migration",
            "Cloud operations & optimization",
            "Hybrid & multi-cloud environments",
        ],
    },
];

export const INDUSTRIES = [
    { name: "Government & Public Sector", icon: Landmark, description: "Secure, resilient technology environments that support public services and mission-critical operations." },
    { name: "Oil & Gas/Energy", icon: Flame, description: "Protection and performance for energy infrastructure, operational technology, and connected assets." },
    { name: "Banking & Finance", icon: Building2, description: "Security-first IT solutions for organizations where trust, availability, and compliance are essential." },
    { name: "Healthcare", icon: HeartPulse, description: "Secure digital environments that safeguard sensitive data and support uninterrupted care delivery." },
    { name: "Retail & E-Commerce", icon: ShoppingCart, description: "Reliable, secure platforms that keep transactions flowing and customer data protected." },
    { name: "Manufacturing", icon: Factory, description: "Connected, protected operations across plants, supply chains, and industrial systems." },
    { name: "Education", icon: GraduationCap, description: "Safe, scalable digital learning environments for institutions, educators, and students." },
    { name: "SMEs", icon: Briefcase, description: "Enterprise-grade security and IT capability, right-sized for growing businesses." },
];

export const APPROACH_STEPS = [
    { number: "01", title: "Discover", icon: Compass, description: "Understand your environment, assets, and business objectives." },
    { number: "02", title: "Assess", icon: ClipboardList, description: "Evaluate risks, gaps, and opportunities across your landscape." },
    { number: "03", title: "Protect", icon: Shield, description: "Implement layered defenses aligned to your risk profile." },
    { number: "04", title: "Monitor", icon: MonitorCheck, description: "Maintain continuous visibility across systems and networks." },
    { number: "05", title: "Respond", icon: LifeBuoy, description: "Act quickly and decisively when threats emerge." },
    { number: "06", title: "Improve", icon: TrendingUp, description: "Evolve your security posture as threats and business needs change." },
];

export const METHODOLOGY_STEPS = [
    { number: "01", title: "Understand", icon: MessageSquare, description: "We listen first — your business, your challenges, your goals." },
    { number: "02", title: "Strategize", icon: Map, description: "We design practical, scalable solutions aligned to long-term objectives." },
    { number: "03", title: "Implement", icon: Rocket, description: "We deliver securely, with minimal disruption to your operations." },
    { number: "04", title: "Evolve", icon: RefreshCw, description: "We refine and adapt as your business and technology landscape change." },
];

export const VALUES = [
    { name: "Integrity", icon: Scale },
    { name: "Innovation", icon: Lightbulb },
    { name: "Excellence", icon: Gem },
    { name: "Security", icon: ShieldCheck },
    { name: "Customer Focus", icon: Users },
];

export const CYBER_CAPABILITIES = [
    { title: "Threat Detection", icon: Radar, description: "Identify suspicious activity early with layered detection across your environment." },
    { title: "Threat Prevention", icon: ShieldCheck, description: "Reduce attack surface and stop threats before they disrupt your business." },
    { title: "Security Monitoring", icon: Eye, description: "Continuous visibility across networks, systems, endpoints, and cloud workloads." },
    { title: "Incident Response", icon: Siren, description: "Structured, rapid response to contain, investigate, and recover from incidents." },
    { title: "Risk Management", icon: Gauge, description: "Understand, prioritize, and treat cyber risk in line with business objectives." },
    { title: "Security Assessment", icon: SearchCheck, description: "Evaluate your security posture and identify practical paths to strengthen it." },
];

export const WHY_CHOOSE_CAPABILITIES = [
    { name: "IT", icon: Network },
    { name: "Cybersecurity", icon: ShieldCheck },
    { name: "Cloud", icon: Cloud },
    { name: "Infrastructure", icon: Boxes },
    { name: "Digital Solutions", icon: BrainCircuit },
];

export const BLOG_CATEGORIES = ["All", "Cybersecurity", "Cloud", "AI", "IT", "Digital Transformation", "Technology"];

const demoBody = (topic) => [
    `This is placeholder demonstration content about ${topic}, created for layout and design preview purposes only. It does not represent an official MITS publication, position, or announcement.`,
    `Organizations navigating ${topic.toLowerCase()} initiatives typically begin by understanding their current environment, clarifying business objectives, and identifying the risks that matter most. A structured, security-first approach helps teams move faster with greater confidence.`,
    `When real MITS articles are published, this space will feature expert insights, practical guidance, and company perspectives on ${topic.toLowerCase()} and related technology topics.`,
    `Until then, this demo article exists so the blog experience — layout, typography, filtering, and navigation — can be reviewed end to end.`,
];

export const BLOG_POSTS = [
    { slug: "building-a-proactive-security-culture", title: "Building a Proactive Security Culture", category: "Cybersecurity", date: "2026-06-18", excerpt: "Why prevention-first thinking changes the economics of cybersecurity for modern organizations." },
    { slug: "cloud-migration-without-the-chaos", title: "Cloud Migration Without the Chaos", category: "Cloud", date: "2026-06-02", excerpt: "A structured approach to moving workloads securely, with minimal disruption to operations." },
    { slug: "where-ai-automation-delivers-real-value", title: "Where AI Automation Delivers Real Value", category: "AI", date: "2026-05-21", excerpt: "Cutting through the hype: practical automation starting points for business teams." },
    { slug: "it-operations-as-a-strategic-advantage", title: "IT Operations as a Strategic Advantage", category: "IT", date: "2026-05-07", excerpt: "Well-run operations are invisible — until they are not. Making the case for operational excellence." },
    { slug: "digital-transformation-that-sticks", title: "Digital Transformation That Sticks", category: "Digital Transformation", date: "2026-04-22", excerpt: "Why transformation programs fail, and how security-led planning changes the outcome." },
    { slug: "understanding-your-attack-surface", title: "Understanding Your Attack Surface", category: "Cybersecurity", date: "2026-04-08", excerpt: "You cannot protect what you cannot see. Mapping exposure is the first step to reducing it." },
    { slug: "hybrid-cloud-in-practice", title: "Hybrid Cloud in Practice", category: "Cloud", date: "2026-03-25", excerpt: "Balancing control, cost, and flexibility across on-premises and cloud environments." },
    { slug: "the-rise-of-xr-in-enterprise-training", title: "The Rise of XR in Enterprise Training", category: "Technology", date: "2026-03-11", excerpt: "Immersive training is moving from novelty to necessity in high-stakes industries." },
    { slug: "from-data-to-decisions-with-analytics", title: "From Data to Decisions with Analytics", category: "AI", date: "2026-02-24", excerpt: "Turning operational data into decisions leaders can actually act on." },
].map((p) => ({ ...p, demo: true, author: "MITS Editorial (placeholder)", body: demoBody(p.category) }));

export const INDUSTRY_OPTIONS = INDUSTRIES.map((i) => i.name);
export const INTEREST_OPTIONS = [...SOLUTIONS.map((s) => s.title), "General Inquiry"];

export const CONTACT_PLACEHOLDER_NOTE = "Official MITS contact details will be published here once provided.";

// Add official technology partners here once announced. Drop logo files into
// /public/partners/ and reference them as "/partners/<filename>". Partner cards
// render automatically and replace the reserved placeholder slots.
export const PARTNERS = [
    // { name: "Partner Name", logo: "/partners/example.svg", description: "What the partnership delivers.", url: "https://partner.example" },
];
