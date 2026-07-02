import { supabase } from './utils/supabase';

const projects = [
  {
    title: "NexCRM",
    slug: "nexcrm",
    category: "Enterprise SaaS",
    short_description: "A custom AI-driven CRM system processing 100k+ daily interactions with predictive lead scoring and automated workflow triggers.",
    full_description: "A custom AI-driven CRM system processing 100k+ daily interactions with predictive lead scoring and automated workflow triggers.",
    tech_stack: ["Next.js", "Node.js", "Supabase", "OpenAI", "Tailwind"],
    thumbnail: "/images/ai-renders/hero-dashboard.png",
    gallery_images: [],
    is_featured: true
  },
  {
    title: "FreshCart",
    slug: "freshcart",
    category: "Mobile App",
    short_description: "Hyper-local grocery delivery app with real-time driver tracking, ML-based stock prediction, and sub-15 minute delivery optimization.",
    full_description: "Hyper-local grocery delivery app with real-time driver tracking, ML-based stock prediction, and sub-15 minute delivery optimization.",
    tech_stack: ["React Native", "Firebase", "Google Maps API", "Express", "MongoDB"],
    thumbnail: "/images/ai-renders/app-dev.png",
    gallery_images: [],
    is_featured: true
  },
  {
    title: "ArcBot",
    slug: "arcbot",
    category: "AI Integration",
    short_description: "Enterprise customer service LLM trained on company knowledge bases, reducing human support tickets by 68% in the first quarter.",
    full_description: "Enterprise customer service LLM trained on company knowledge bases, reducing human support tickets by 68% in the first quarter.",
    tech_stack: ["Python", "FastAPI", "Pinecone", "LangChain", "Claude 3"],
    thumbnail: "/images/ai-renders/ai-automation.png",
    gallery_images: [],
    is_featured: true
  },
  {
    title: "MediBook",
    slug: "medibook",
    category: "Healthcare App",
    short_description: "HIPAA-compliant telemedicine and appointment booking platform integrating with EMR systems, serving 40+ hospitals with HD video consultation and digital prescriptions.",
    full_description: "HIPAA-compliant telemedicine and appointment booking platform integrating with EMR systems, serving 40+ hospitals with HD video consultation and digital prescriptions.",
    tech_stack: ["React Native", "Supabase", "WebRTC", "Node.js", "Twilio"],
    thumbnail: "/images/ai-renders/saas-dev.png",
    gallery_images: [],
    is_featured: false
  },
  {
    title: "TablePOS",
    slug: "tablepos",
    category: "SaaS Platform",
    short_description: "An end-to-end restaurant management SaaS with table management, kitchen display systems, inventory tracking, and multi-outlet analytics for restaurant chains.",
    full_description: "An end-to-end restaurant management SaaS with table management, kitchen display systems, inventory tracking, and multi-outlet analytics for restaurant chains.",
    tech_stack: ["Next.js", "React Native", "PostgreSQL", "Stripe", "WebSocket"],
    thumbnail: "/images/ai-renders/cloud-infra.png",
    gallery_images: [],
    is_featured: false
  },
  {
    title: "ShopFlow",
    slug: "shopflow",
    category: "Web Platform",
    short_description: "A high-performance headless e-commerce platform with AI-powered personalization, dynamic pricing, and a multi-vendor marketplace supporting 500+ sellers.",
    full_description: "A high-performance headless e-commerce platform with AI-powered personalization, dynamic pricing, and a multi-vendor marketplace supporting 500+ sellers.",
    tech_stack: ["Next.js", "Sanity CMS", "Stripe", "PostgreSQL", "Redis"],
    thumbnail: "/images/ai-renders/web-dev.png",
    gallery_images: [],
    is_featured: false
  }
];

async function seed() {
  console.log('Seeding projects...');
  for (const project of projects) {
    const { error } = await supabase.from('projects').insert([project]);
    if (error) {
      console.error(`Error inserting ${project.title}:`, error.message);
    } else {
      console.log(`Inserted ${project.title}`);
    }
  }
  console.log('Seeding complete.');
}

seed();
