import {
  SiBootstrap,
  SiCloudflare,
  SiCplusplus,
  SiCss3,
  SiDocker,
  SiEthereum,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiHtml5,
  SiOpenjdk,
  SiJavascript,
  SiKeras,
  SiLinux,
  SiMongodb,
  SiNextdotjs,
  SiNuxtdotjs,
  SiPhp,
  SiPython,
  SiPytorch,
  SiReact,
  SiRust,
  SiSupabase,
  SiTensorflow,
  SiTypescript,
  SiVuedotjs,
  SiZapier,
  SiVite,
  SiTailwindcss,
} from 'react-icons/si'
import { BsMicrosoftTeams } from 'react-icons/bs'
// import { TbBrandZapier } from "react-icons/tb";

const TECH_ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  PHP: SiPhp,
  Bootstrap: SiBootstrap,
  Linux: SiLinux,
  Cloudflare: SiCloudflare,
  Nuxt: SiNuxtdotjs,
  Vue: SiVuedotjs,
  TypeScript: SiTypescript,
  Supabase: SiSupabase,
  UX: SiFigma,
  React: SiReact,
  'Next.js': SiNextdotjs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  Docker: SiDocker,
  Zapier: SiZapier,
  Firebase: SiFirebase,
  Blockchain: SiEthereum,
  'C++': SiCplusplus,
  'C/C++': SiCplusplus,
  Python: SiPython,
  Java: SiOpenjdk,
  Rust: SiRust,
  JavaScript: SiJavascript,
  HTML: SiHtml5,
  CSS: SiCss3,
  PyTorch: SiPytorch,
  TensorFlow: SiTensorflow,
  Keras: SiKeras,
  'Microsoft Teams': BsMicrosoftTeams,
  // 'Zapier': TbBrandZapier,
  Vite: SiVite,
  'Tailwind CSS': SiTailwindcss,
}

export function TechIcon({
  name,
  className = 'size-3.5',
}: {
  name: string
  className?: string
}) {
  const Icon = TECH_ICON_MAP[name]
  if (!Icon) return null
  return <Icon className={className} aria-hidden />
}
