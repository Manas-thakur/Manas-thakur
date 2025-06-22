"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Mail,
  Phone,
  MapPin,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  Brain,
  Trophy,
  ChevronDown,
  Menu,
  X,
  Terminal,
  Coffee,
  Zap,
  Heart,
  Star,
} from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [visibleTimelineItems, setVisibleTimelineItems] = useState<number[]>([])
  const [animalFrame, setAnimalFrame] = useState(0)
  const fullText = "manas@portfolio:~$ whoami"
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([])

  // ASCII Animals Animation
  const animals = [
    // Cat frames
    ["   /\\_/\\  ", "  ( o.o ) ", "   > ^ <  "],
    ["   /\\_/\\  ", "  ( ^.^ ) ", "   > - <  "],
    // Dog frames
    ["   /   \\   ", "  ( o o )  ", "   \\_V_/   "],
    ["   /   \\   ", "  ( ^ ^ )  ", "   \\_U_/   "],
    // Bird frames
    ["    <(o )___", "     \\ <_. )", "      `---'  "],
    ["    <(^ )___", "     \\ <_. )", "      `---'  "],
  ]

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const animalTimer = setInterval(() => {
      setAnimalFrame((prev) => (prev + 1) % animals.length)
    }, 1000)

    return () => clearInterval(animalTimer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "experience", "projects", "skills", "achievements", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }

      // Timeline animation logic
      const newVisibleItems: number[] = []
      timelineRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0
          if (isVisible) {
            newVisibleItems.push(index)
          }
        }
      })

      setVisibleTimelineItems((prev) => {
        const combined = [...new Set([...prev, ...newVisibleItems])].sort((a, b) => a - b)
        return combined
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const skills = {
    "Programming Languages": ["Python", "R", "SQL", "C", "C++"],
    "ML & AI": ["Supervised Learning", "Deep Learning", "Computer Vision", "NLP", "Reinforcement Learning"],
    Frameworks: ["PyTorch", "TensorFlow", "Scikit-learn", "OpenCV", "YOLOv8", "Hugging Face"],
    "Model Architectures": ["CNNs", "RNNs", "LSTMs", "Transformers", "U-Net", "CLIP"],
    "Data Science": ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "Streamlit"],
    "MLOps & Tools": ["Docker", "Git", "CUDA", "Weights & Biases", "MLflow"],
    Databases: ["PostgreSQL", "MongoDB", "Redis", "LanceDB", "Pinecone"],
  }

  const projects = [
    {
      title: "SIH 2023 - Lithology Project",
      description: "Intelligent system for real-time object detection and classification using YOLOv8",
      tech: ["YOLOv8", "Computer Vision", "Python"],
      achievements: ["99.97% accuracy", "99.83% precision", "SIH Winner"],
      date: "December 2023",
    },
    {
      title: "Pothole Detection & GPS Tagging",
      description: "Real-time pothole detection system with GPS integration for smart city infrastructure",
      tech: ["YOLO", "OpenCV", "GPS API", "Python"],
      achievements: ["Real-time detection", "GPS mapping", "Smart city deployment"],
      date: "August 2024",
    },
    {
      title: "ML Construction Progress Monitoring",
      description: "Automated construction progress tracking through ML-powered image analysis",
      tech: ["Deep Learning", "OpenCV", "Python"],
      achievements: ["Anomaly detection", "Automated tracking", "Improved accuracy"],
      date: "September 2024",
    },
  ]

  const timelineItems = [
    {
      title: "AI Engineer",
      company: "API-Market / Noveum.ai",
      date: "June 2025 - Present",
      color: "green",
      icon: Brain,
      details: ["AI model optimization and benchmarking", "Data-driven AI solutions development"],
    },
    {
      title: "Backend Developer Intern",
      company: "OSS & Consulting",
      date: "Feb 2025 – May 2025",
      color: "cyan",
      icon: Code,
      details: ["PostgreSQL database design for CRM", "Cloud migration reducing latency by 30%"],
    },
    {
      title: "Smart India Hackathon Winner",
      company: "Lithology Classification Project",
      date: "December 2023",
      color: "yellow",
      icon: Trophy,
      details: ["99.97% accuracy with YOLOv8", "Computer vision & deep learning"],
    },
    {
      title: "Started B.Tech in CS (AI/ML)",
      company: "Dronacharya College of Engineering",
      date: "2023",
      color: "white",
      icon: GraduationCap,
      details: ["CGPA: 7.5/10", "Expected graduation: 2027"],
    },
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case "green":
        return { bg: "bg-green-400", text: "text-green-400" }
      case "cyan":
        return { bg: "bg-cyan-400", text: "text-cyan-400" }
      case "yellow":
        return { bg: "bg-yellow-400", text: "text-yellow-400" }
      case "white":
        return { bg: "bg-white", text: "text-white" }
      default:
        return { bg: "bg-gray-400", text: "text-gray-400" }
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold text-green-400 flex items-center">
              <Terminal className="mr-2" size={20} />
              manas@terminal
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["About", "Experience", "Projects", "Skills", "Achievements", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
                    activeSection === item.toLowerCase() ? "text-cyan-400" : "text-gray-300"
                  }`}
                >
                  ./{item.toLowerCase()}
                </button>
              ))}
            </div>

            {/* Mobile Navigation Button */}
            <button className="md:hidden text-gray-300 hover:text-cyan-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              {["About", "Experience", "Projects", "Skills", "Achievements", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left py-2 text-gray-300 hover:text-cyan-400"
                >
                  ./{item.toLowerCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="border border-gray-800 p-8 bg-gray-950">
            <div className="mb-6">
              <div className="text-green-400 mb-2">
                {typedText}
                <span className="animate-pulse">|</span>
              </div>
              <div className="text-white text-sm mb-4">
                <span className="text-cyan-400">Output:</span>
              </div>
            </div>

            <div className="text-center">
              <div className="mb-8">
                <pre className="text-green-400 text-xs mb-4">
                  {`
 ███▄ ▄███▓ ▄▄▄       ███▄    █  ▄▄▄        ██████ 
▓██▒▀█▀ ██▒▒████▄     ██ ▀█   █ ▒████▄    ▒██    ▒ 
▓██    ▓██░▒██  ▀█▄  ▓██  ▀█ ██▒▒██  ▀█▄  ░ ▓██▄   
▒██    ▒██ ░██▄▄▄▄██ ▓██▒  ▐▌██▒░██▄▄▄▄██   ▒   ██▒
▒██▒   ░██▒ ▓█   ▓██▒▒██░   ▓██░ ▓█   ▓██▒▒██████▒▒
░ ▒░   ░  ░ ▒▒   ▓▒█░░ ▒░   ▒ ▒  ▒▒   ▓▒█░▒ ▒▓▒ ▒ ░
░  ░      ░  ▒   ▒▒ ░░ ░░   ░ ▒░  ▒   ▒▒ ░░ ░▒  ░ ░
░      ░     ░   ▒      ░   ░ ░   ░   ▒   ░  ░  ░  
       ░         ░  ░         ░       ░  ░      ░  
`}
                </pre>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">MANAS KUMAR THAKUR</h1>
                <div className="text-cyan-400 text-lg mb-2">
                  <span className="text-gray-500">Role:</span> AI/ML Engineer & Backend Developer
                </div>
                <div className="text-green-400 text-base mb-8">
                  <span className="text-gray-500">Specialization:</span> Computer Vision | Deep Learning | Intelligent
                  Systems
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button
                  onClick={() => scrollToSection("projects")}
                  className="bg-green-400 text-black hover:bg-green-300 font-mono"
                >
                  ./view_projects.sh
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("contact")}
                  className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-mono"
                >
                  ./contact.sh
                </Button>
              </div>

              <div className="flex justify-center space-x-6 text-gray-400">
                <a href="mailto:thakurmanas168@gmail.com" className="hover:text-green-400 transition-colors">
                  [mail]
                </a>
                <a href="https://linkedin.com/in/manasthakur30" className="hover:text-cyan-400 transition-colors">
                  [linkedin]
                </a>
                <a href="https://github.com/Manas-thakur" className="hover:text-white transition-colors">
                  [github]
                </a>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 animate-bounce">
            <ChevronDown className="text-gray-600 mx-auto" size={32} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Terminal Header */}
          <div className="text-center mb-8">
            <div className="text-green-400 mb-4">
              <span className="text-gray-500">manas@portfolio:~$</span> cat about.txt
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Profile & Quick Facts */}
            <div className="lg:col-span-1 space-y-6">
              {/* Animated ASCII Animals */}
              <div className="border border-gray-800 bg-gray-950 p-6 text-center hover:border-green-400 transition-all duration-500 group">
                <div className="text-green-400 mb-4 text-sm group-hover:text-green-300 transition-colors">
                  ./pets.ascii
                </div>
                <pre className="text-cyan-400 text-sm leading-tight group-hover:text-cyan-300 transition-colors">
                  {animals[animalFrame].map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </pre>
                <div className="text-gray-400 text-xs mt-2 group-hover:text-gray-300 transition-colors">
                  My coding companions ^_^
                </div>
              </div>

              {/* Quick Stats */}
              <div className="border border-gray-800 bg-gray-950 p-6 hover:border-cyan-400 transition-all duration-500 group">
                <div className="text-cyan-400 mb-4 flex items-center group-hover:text-cyan-300 transition-colors">
                  <Zap className="mr-2" size={16} />
                  quick_stats.json
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Age:</span>
                    <span className="text-white">19</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Location:</span>
                    <span className="text-white">New Delhi, IN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Experience:</span>
                    <span className="text-green-400">2+ years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Coffee/day:</span>
                    <span className="text-yellow-400">∞</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bio */}
              <div className="border border-gray-800 bg-gray-950 p-6 hover:border-purple-400 transition-all duration-500 group">
                <div className="text-purple-400 mb-4 flex items-center group-hover:text-purple-300 transition-colors">
                  <Terminal className="mr-2" size={16} />
                  bio.md
                </div>
                <div className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                  <p className="mb-4">
                    <span className="text-cyan-400"># Hello World!</span>
                    <br />
                    I'm a 19-year-old AI/ML Engineer who believes in building intelligent systems that actually solve
                    real problems. Currently working at Noveum.ai, optimizing AI models and creating data-driven
                    solutions.
                  </p>
                
                </div>
              </div>

              {/* Fun Facts Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Interesting Facts */}
                <div className="border border-gray-800 bg-gray-950 p-6 hover:border-yellow-400 transition-all duration-500 group">
                  <div className="text-yellow-400 mb-4 flex items-center group-hover:text-yellow-300 transition-colors">
                    <Star className="mr-2" size={16} />
                    fun_facts.txt
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <span className="text-green-400 mr-2">→</span>
                      <span className="text-gray-300 group-hover:text-gray-200 transition-colors">
                        Debugs code better at 2 AM
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-400 mr-2">→</span>
                      <span className="text-gray-300 group-hover:text-gray-200 transition-colors">
                        Can explain AI to grandparents
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-400 mr-2">→</span>
                      <span className="text-gray-300 group-hover:text-gray-200 transition-colors">
                        Dreams in Python syntax
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-400 mr-2">→</span>
                      <span className="text-gray-300 group-hover:text-gray-200 transition-colors">
                        Believes AI should help, not replace
                      </span>
                    </div>
                  </div>
                </div>

                {/* Current Status */}
                <div className="border border-gray-800 bg-gray-950 p-6 hover:border-orange-400 transition-all duration-500 group">
                  <div className="text-orange-400 mb-4 flex items-center group-hover:text-orange-300 transition-colors">
                    <Heart className="mr-2" size={16} />
                    current_status.log
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                      <span className="text-gray-300 group-hover:text-gray-200 transition-colors">
                        Building AI solutions
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
                      <span className="text-gray-300 group-hover:text-gray-200 transition-colors">Learning MLOps</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                      <span className="text-gray-300 group-hover:text-gray-200 transition-colors">
                        Open to collaborations
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
                      <span className="text-gray-300 group-hover:text-gray-200 transition-colors">
                        Mentoring juniors
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education & Philosophy */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Education */}
                <div className="border border-gray-800 bg-gray-950 p-6 hover:border-indigo-400 transition-all duration-500 group">
                  <div className="text-indigo-400 mb-4 flex items-center group-hover:text-indigo-300 transition-colors">
                    <GraduationCap className="mr-2" size={16} />
                    education.json
                  </div>
                  <div className="text-sm">
                    <div className="text-gray-400">{"{"}</div>
                    <div className="ml-4 space-y-1">
                      <div>
                        <span className="text-cyan-400">"degree":</span>{" "}
                        <span className="text-white">"B.Tech CS (AI/ML)",</span>
                      </div>
                      <div>
                        <span className="text-cyan-400">"year":</span> <span className="text-white">"2023-2027",</span>
                      </div>
                      <div>
                        <span className="text-cyan-400">"cgpa":</span> <span className="text-green-400">"7.5/10"</span>
                      </div>
                    </div>
                    <div className="text-gray-400">{"}"}</div>
                  </div>
                </div>

                {/* Philosophy */}
                <div className="border border-gray-800 bg-gray-950 p-6 hover:border-red-400 transition-all duration-500 group">
                  <div className="text-red-400 mb-4 flex items-center group-hover:text-red-300 transition-colors">
                    <Coffee className="mr-2" size={16} />
                    philosophy.txt
                  </div>
                  <div className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                    <span className="text-cyan-400"># Core Belief</span>
                    <br />
                    "Code with purpose, build with empathy. Every algorithm should make someone's life better."
                    <br />
                    <br />
                    <span className="text-cyan-400"># Approach</span>
                    <br />
                    Learn → Build → Share → Repeat
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="border border-gray-800 bg-gray-950 p-6 hover:border-green-400 transition-all duration-500 group text-center">
                <div className="text-green-400 mb-4 group-hover:text-green-300 transition-colors">
                  <div className="font-mono text-lg">./lets_connect.sh</div>
                </div>
                <div className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors">
                  Want to build something amazing together? Let's chat about AI, code, or life!
                </div>
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-green-400 text-black hover:bg-green-300 font-mono group-hover:scale-105 transition-transform"
                >
                  Start Conversation →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <div className="border border-gray-800 p-6">
            <div className="text-green-400 mb-6">
              <span className="text-gray-500">manas@portfolio:~$</span> ls -la experience/
            </div>

            {/* Current Position */}
            <div className="border border-gray-700 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-white text-xl font-bold flex items-center">
                    <Briefcase className="mr-2 text-green-400" size={20} />
                    AI Engineer
                  </div>
                  <div className="text-gray-400">API-Market / Noveum.ai • Remote</div>
                </div>
                <div className="text-green-400 text-sm">June 2025 – Present</div>
              </div>

              <div className="text-gray-300 space-y-2">
                <div className="flex items-start">
                  <span className="text-cyan-400">{">"}</span>
                  Working on AI model optimization and benchmarking for enterprise clients
                </div>
                <div className="flex items-start">
                  <span className="text-cyan-400">{">"}</span>
                  Developing data-driven AI solutions with proven performance metrics
                </div>
                <div className="flex items-start">
                  <span className="text-cyan-400">{">"}</span>
                  Contributing to AI model evaluation and deployment pipelines
                </div>
              </div>
            </div>

            {/* Previous Position */}
            <div className="border border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-white text-xl font-bold flex items-center">
                    <Briefcase className="mr-2 text-cyan-400" size={20} />
                    Backend Developer Intern
                  </div>
                  <div className="text-gray-400">OSS & Consulting • Remote, India</div>
                </div>
                <div className="text-cyan-400 text-sm">Feb 2025 – May 2025</div>
              </div>

              <div className="text-gray-300 space-y-2">
                <div className="flex items-start">
                  <span className="text-cyan-400">{">"}</span>
                  Designed robust PostgreSQL database for CRM platform, improving data consistency
                </div>
                <div className="flex items-start">
                  <span className="text-cyan-400">{">"}</span>
                  Collaborated on end-to-end application design, aligning backend logic with CRM features
                </div>
                <div className="flex items-start">
                  <span className="text-cyan-400">{">"}</span>
                  Deployed and maintained backend infrastructure on local bare-metal cloud
                </div>
                <div className="flex items-start">
                  <span className="text-cyan-400">{">"}</span>
                  Led backend migration to GCP VM instances, reducing latency by{" "}
                  <span className="text-green-400">30%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-green-400 mb-8 text-center">
            <span className="text-gray-500">manas@portfolio:~$</span> git log --oneline --graph career/
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700"></div>

            {timelineItems.map((item, index) => {
              const colorClasses = getColorClasses(item.color)
              const isVisible = visibleTimelineItems.includes(index)
              const IconComponent = item.icon

              return (
                <div
                  key={index}
                  ref={(el) => (timelineRefs.current[index] = el)}
                  className={`relative flex items-start mb-8 transition-all duration-700 ease-out group ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 200}ms` : "0ms",
                  }}
                >
                  {/* Animated Connection Line */}
                  <div className="absolute left-8 top-16 w-0.5 h-full bg-gray-700 group-hover:bg-cyan-400 transition-colors duration-300 z-0"></div>

                  {/* Hover Glow Effect */}
                  <div
                    className="absolute left-4 top-4 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl z-0"
                    style={{
                      backgroundColor:
                        colorClasses.bg.replace("bg-", "") === "green-400"
                          ? "#4ade80"
                          : colorClasses.bg.replace("bg-", "") === "cyan-400"
                            ? "#22d3ee"
                            : colorClasses.bg.replace("bg-", "") === "yellow-400"
                              ? "#facc15"
                              : "#ffffff",
                    }}
                  ></div>

                  <div
                    className={`flex-shrink-0 w-16 h-16 ${colorClasses.bg} rounded-full flex items-center justify-center border-4 border-black z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg ${
                      isVisible ? "scale-100 rotate-0" : "scale-0 rotate-180"
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${index * 200 + 100}ms` : "0ms",
                      boxShadow: "var(--icon-shadow, 0 0 0 rgba(0,0,0,0))",
                    }}
                    onMouseEnter={(e) => {
                      const shadowColor = colorClasses.bg.includes("green")
                        ? "34, 197, 94"
                        : colorClasses.bg.includes("cyan")
                          ? "34, 211, 238"
                          : colorClasses.bg.includes("yellow")
                            ? "250, 204, 21"
                            : "255, 255, 255"
                      e.currentTarget.style.setProperty("--icon-shadow", `0 0 20px rgba(${shadowColor}, 0.5)`)
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.setProperty("--icon-shadow", "0 0 0 rgba(0,0,0,0)")
                    }}
                  >
                    <IconComponent
                      className="text-black transition-transform duration-300 group-hover:scale-110"
                      size={24}
                    />
                  </div>

                  <div className="ml-6 flex-1">
                    <div
                      className={`border border-gray-800 p-4 bg-gray-950 transition-all duration-500 group-hover:border-${item.color === "green" ? "green" : item.color === "cyan" ? "cyan" : item.color === "yellow" ? "yellow" : "white"}-400 group-hover:bg-gray-900 group-hover:shadow-lg group-hover:scale-105 group-hover:-translate-y-1 ${
                        isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                      }`}
                      style={{
                        transitionDelay: isVisible ? `${index * 200 + 200}ms` : "0ms",
                      }}
                    >
                      {/* Animated Border Effect */}
                      <div
                        className="absolute inset-0 rounded border-2 border-transparent bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(45deg, transparent, ${
                            item.color === "green"
                              ? "#4ade80"
                              : item.color === "cyan"
                                ? "#22d3ee"
                                : item.color === "yellow"
                                  ? "#facc15"
                                  : "#ffffff"
                          }40, transparent)`,
                          backgroundSize: "200% 200%",
                          animation: "gradient-shift 3s ease infinite",
                        }}
                      ></div>

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                          <div
                            className={`${colorClasses.text} font-bold transition-all duration-300 group-hover:text-white group-hover:scale-105`}
                          >
                            {item.title}
                          </div>
                          <div
                            className={`${colorClasses.text} text-sm transition-all duration-300 group-hover:text-white`}
                          >
                            {item.date}
                          </div>
                        </div>
                        <div className="text-white text-sm mb-2 transition-all duration-300 group-hover:text-gray-100">
                          {item.company}
                        </div>
                        <div className="text-gray-400 text-xs transition-all duration-300 group-hover:text-gray-300">
                          {item.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="transition-all duration-300 group-hover:translate-x-1">
                              <span className="text-cyan-400 group-hover:text-cyan-300">{">"}</span> {detail}
                              {detailIndex < item.details.length - 1 && <br />}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Hover Indicator */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Timeline Legend */}
          <div className="mt-12 border border-gray-800 p-4 bg-gray-950">
            <div className="text-cyan-400 mb-3 text-sm">// Timeline Legend</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <span className="text-gray-400">Current Role</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-cyan-400 rounded-full mr-2"></div>
                <span className="text-gray-400">Previous Work</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                <span className="text-gray-400">Achievement</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
                <span className="text-gray-400">Education</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-green-400 mb-8 text-center">
            <span className="text-gray-500">manas@portfolio:~$</span> find ./projects -name "*.py" -type f
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="border border-gray-800 p-4 bg-gray-950 hover:border-cyan-400 hover:bg-gray-900 transition-all duration-300 group hover:scale-105 hover:-translate-y-2 hover:shadow-lg relative overflow-hidden"
              >
                {/* Project Header */}
                <div className="text-cyan-400 text-sm mb-2 group-hover:text-cyan-300 transition-colors break-words overflow-hidden">
                  ./projects/
                  {project.title
                    .toLowerCase()
                    .replace(/\s+/g, "_")
                    .replace(/[^a-z0-9_]/g, "")}
                  /
                </div>

                {/* Project Title */}
                <div className="text-white font-bold mb-2 text-lg group-hover:text-cyan-100 transition-colors break-words">
                  {project.title}
                </div>

                {/* Date */}
                <div className="text-gray-400 text-sm mb-3 group-hover:text-gray-300 transition-colors">
                  <span className="text-green-400">📅</span> {project.date}
                </div>

                {/* Description */}
                <div className="text-gray-300 text-sm mb-4 leading-relaxed group-hover:text-gray-200 transition-colors break-words">
                  {project.description}
                </div>

                {/* Tech Stack */}
                <div className="mb-4">
                  <div className="text-cyan-400 text-xs mb-2 group-hover:text-cyan-300 transition-colors">
                    // Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs bg-gray-900 text-green-400 px-2 py-1 border border-gray-700 group-hover:bg-gray-800 group-hover:border-green-400 group-hover:text-green-300 transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <div className="text-cyan-400 text-xs mb-2 group-hover:text-cyan-300 transition-colors">
                    // Achievements
                  </div>
                  <div className="space-y-1">
                    {project.achievements.map((achievement, achIndex) => (
                      <div
                        key={achIndex}
                        className="text-xs text-gray-400 group-hover:text-gray-300 transition-all duration-200 group-hover:translate-x-1"
                      >
                        <span className="text-green-400 group-hover:text-green-300">✓</span> {achievement}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Indicator */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                </div>

                {/* Animated Border Effect */}
                <div
                  className="absolute inset-0 rounded border-2 border-transparent bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(45deg, transparent, #22d3ee40, transparent)",
                    backgroundSize: "200% 200%",
                    animation: "gradient-shift 3s ease infinite",
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-green-400 mb-8 text-center">
            <span className="text-gray-500">manas@portfolio:~$</span> cat skills.json | jq '.'
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, skillList], index) => (
              <div
                key={index}
                data-category={category}
                className="border border-gray-800 p-6 bg-gray-900 hover:border-cyan-400 hover:bg-gray-800 transition-all duration-300 group hover:scale-105 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden"
              >
                {/* Category Header */}
                <div className="flex items-center mb-4">
                  <div
                    className="w-3 h-3 rounded-full mr-3 group-hover:animate-pulse"
                    style={{
                      backgroundColor:
                        index % 4 === 0
                          ? "#4ade80"
                          : index % 4 === 1
                            ? "#22d3ee"
                            : index % 4 === 2
                              ? "#facc15"
                              : "#f97316",
                    }}
                  ></div>
                  <div className="text-cyan-400 text-sm font-bold group-hover:text-cyan-300 transition-colors">
                    "{category.toLowerCase().replace(/\s+/g, "_")}": [
                  </div>
                </div>

                {/* Skills List */}
                <div className="ml-6 space-y-2 mb-4">
                  {skillList.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="text-gray-300 text-sm hover:text-white transition-all duration-200 hover:translate-x-2 cursor-pointer group/skill"
                      style={{
                        transitionDelay: `${skillIndex * 50}ms`,
                      }}
                    >
                      <span className="text-green-400 group-hover/skill:text-green-300">→</span>
                      <span className="ml-2">"{skill}"</span>
                      {skillIndex < skillList.length - 1 && <span className="text-gray-500">,</span>}
                    </div>
                  ))}
                </div>

                {/* Closing Bracket */}
                <div className="text-cyan-400 text-sm group-hover:text-cyan-300 transition-colors ml-0">]</div>

                {/* Skill Count Badge */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="bg-cyan-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                    {skillList.length}
                  </div>
                </div>

                {/* Animated Border Effect */}
                <div
                  className="absolute inset-0 rounded border-2 border-transparent bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(45deg, transparent, ${
                      index % 4 === 0
                        ? "#4ade80"
                        : index % 4 === 1
                          ? "#22d3ee"
                          : index % 4 === 2
                            ? "#facc15"
                            : "#f97316"
                    }40, transparent)`,
                    backgroundSize: "200% 200%",
                    animation: "gradient-shift 3s ease infinite",
                  }}
                ></div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800 overflow-hidden">
                  <div
                    className="h-full transition-all duration-1000 group-hover:w-full"
                    style={{
                      width: "0%",
                      backgroundColor:
                        index % 4 === 0
                          ? "#4ade80"
                          : index % 4 === 1
                            ? "#22d3ee"
                            : index % 4 === 2
                              ? "#facc15"
                              : "#f97316",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-green-400 mb-8 text-center">
            <span className="text-gray-500">manas@portfolio:~$</span> grep -r "achievement" ./awards/ --sort=date
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Major Achievement */}
            <div className="md:col-span-2 border border-gray-800 p-6 bg-gray-950 hover:border-yellow-400 hover:bg-gray-900 transition-all duration-300 group hover:scale-105 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                    <Trophy className="text-black group-hover:animate-bounce" size={24} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-xl mb-1 group-hover:text-yellow-300 transition-colors">
                      🏆 Smart India Hackathon Winner
                    </div>
                    <div className="text-yellow-400 text-sm font-mono group-hover:text-yellow-300 transition-colors">
                      NATIONAL LEVEL • DECEMBER 2023
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 text-2xl font-bold group-hover:scale-110 transition-transform">
                    99.97%
                  </div>
                  <div className="text-gray-400 text-xs">Accuracy</div>
                </div>
              </div>

              <div className="text-gray-300 mb-4 leading-relaxed group-hover:text-gray-200 transition-colors">
                Developed an automated lithology classification system using YOLOv8 and deep learning techniques.
                Achieved exceptional accuracy in geological rock classification, demonstrating advanced AI/ML
                capabilities.
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {["YOLOv8", "Deep Learning", "Computer Vision", "Python", "AI/ML"].map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-900 text-yellow-400 px-2 py-1 border border-gray-700 group-hover:bg-gray-800 group-hover:border-yellow-400 transition-all duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Achievement Progress Bar */}
              <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-1000 group-hover:w-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
              <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                Impact: National Recognition • Team Leadership • Technical Innovation
              </div>

              {/* Animated Border Effect */}
              <div
                className="absolute inset-0 rounded border-2 border-transparent bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(45deg, transparent, #facc1540, transparent)",
                  backgroundSize: "200% 200%",
                  animation: "gradient-shift 3s ease infinite",
                }}
              ></div>
            </div>

            {/* Other Achievements */}
            <div className="border border-gray-800 p-4 bg-gray-950 hover:border-cyan-400 hover:bg-gray-900 transition-all duration-300 group hover:scale-105 hover:-translate-y-1 hover:shadow-lg relative">
              <div className="flex items-start mb-3">
                <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center mr-3 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                  <Award className="text-black group-hover:animate-pulse" size={20} />
                </div>
                <div>
                  <div className="text-white font-bold group-hover:text-cyan-300 transition-colors">
                    Engineers Day Competition
                  </div>
                  <div className="text-cyan-400 text-sm font-mono">DCE • 2ND PLACE</div>
                </div>
              </div>
              <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors leading-relaxed">
                Designed innovative fire-resistant safety system for automotive accidents. Demonstrated problem-solving
                skills and engineering innovation.
              </div>

              {/* Hover Indicator */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
              </div>
            </div>

            <div className="border border-gray-800 p-4 bg-gray-950 hover:border-green-400 hover:bg-gray-900 transition-all duration-300 group hover:scale-105 hover:-translate-y-1 hover:shadow-lg relative">
              <div className="flex items-start mb-3">
                <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center mr-3 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                  <Brain className="text-black group-hover:animate-pulse" size={20} />
                </div>
                <div>
                  <div className="text-white font-bold group-hover:text-green-300 transition-colors">
                    IDE Bootcamp Selection
                  </div>
                  <div className="text-green-400 text-sm font-mono">AMITY UNIVERSITY • PHASE 2</div>
                </div>
              </div>
              <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors leading-relaxed">
                Advanced to Phase 2 selection process. Collaborated on innovative technology solutions and startup
                ideation.
              </div>

              {/* Hover Indicator */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              </div>
            </div>

            <div className="border border-gray-800 p-4 bg-gray-950 hover:border-orange-400 hover:bg-gray-900 transition-all duration-300 group hover:scale-105 hover:-translate-y-1 hover:shadow-lg relative">
              <div className="flex items-start mb-3">
                <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center mr-3 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                  <Code className="text-black group-hover:animate-pulse" size={20} />
                </div>
                <div>
                  <div className="text-white font-bold group-hover:text-orange-300 transition-colors">
                    AI Team Member
                  </div>
                  <div className="text-orange-400 text-sm font-mono">DEVIATORS CLUB • ACTIVE</div>
                </div>
              </div>
              <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors leading-relaxed">
                Contributing to AI/ML projects and collaborating with team members. Hands-on experience with
                cutting-edge technologies.
              </div>

              {/* Hover Indicator */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <div className="border border-gray-800 p-6">
            <div className="text-green-400 mb-6 text-center">
              <span className="text-gray-500">manas@portfolio:~$</span> ./contact.sh --help
            </div>

            <div className="text-center mb-8">
              <div className="text-gray-300 mb-6">
                <span className="text-cyan-400"># Available contact methods:</span>
                <br />
                Always interested in discussing new opportunities, innovative projects, or collaborations in AI/ML.
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="border border-gray-700 p-4 text-center">
                <Mail className="mx-auto mb-3 text-green-400" size={24} />
                <div className="text-white font-bold mb-2">--email</div>
                <a
                  href="mailto:thakurmanas168@gmail.com"
                  className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                >
                  thakurmanas168@gmail.com
                </a>
              </div>

              <div className="border border-gray-700 p-4 text-center">
                <Phone className="mx-auto mb-3 text-cyan-400" size={24} />
                <div className="text-white font-bold mb-2">--phone</div>
                <a href="tel:+919650376167" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  +91 9650376167
                </a>
              </div>

              <div className="border border-gray-700 p-4 text-center">
                <MapPin className="mx-auto mb-3 text-white" size={24} />
                <div className="text-white font-bold mb-2">--location</div>
                <div className="text-gray-400 text-sm">New Delhi, India</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="border border-gray-800 p-6">
              <div className="text-cyan-400 mb-4 text-center">// Social Networks & Profiles</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a
                  href="https://x.com/menace_thakur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-700 p-4 text-center hover:border-blue-400 hover:bg-gray-800 transition-all duration-300"
                >
                  <div className="text-blue-400 font-bold mb-1">X</div>
                  <div className="text-gray-400 text-xs">Social Updates</div>
                </a>

                <a
                  href="https://linkedin.com/in/manasthakur30"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-700 p-4 text-center hover:border-blue-400 hover:bg-gray-800 transition-all duration-300"
                >
                  <div className="text-blue-400 font-bold mb-1">LinkedIn</div>
                  <div className="text-gray-400 text-xs">Professional Network</div>
                </a>

                <a
                  href="https://github.com/Manas-thakur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-700 p-4 text-center hover:border-white hover:bg-gray-800 transition-all duration-300"
                >
                  <div className="text-white font-bold mb-1">GitHub</div>
                  <div className="text-gray-400 text-xs">Code Repository</div>
                </a>

                <a
                  href="http://discordapp.com/users/868829323975622686"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-700 p-4 text-center hover:border-purple-400 hover:bg-gray-800 transition-all duration-300"
                >
                  <div className="text-purple-400 font-bold mb-1">Discord</div>
                  <div className="text-gray-400 text-xs">Tech Discussions</div>
                </a>

            
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-gray-500 text-sm">
            <span className="text-green-400">manas@portfolio:~$</span> echo "© 2025 Manas Kumar Thakur. Built with
            Next.js and terminal love."
          </div>
        </div>
      </footer>
    </div>
  )
}
