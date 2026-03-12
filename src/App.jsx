import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheckIcon,
  ClockIcon,
  ServerIcon,
  EyeIcon,
  BeakerIcon,
  EnvelopeIcon,
  BuildingLibraryIcon,
  XMarkIcon,
  Bars3Icon,
  DocumentTextIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
  DocumentCheckIcon,
  ScaleIcon,
  CpuChipIcon,
  GlobeAltIcon,
  ArrowPathIcon,
  KeyIcon,
  FingerPrintIcon,
  DevicePhoneMobileIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

// ---------- Background Video (abstract medical/tech) ----------
const BG_VIDEO =
  "https://res.cloudinary.com/dvcmopd4q/video/upload/v1773156949/197931-906226441_medium_w2cg3v.mp4";

// ---------- Animation Variants ----------
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

// ---------- Reusable Pill Component ----------
const Pill = ({ children }) => (
  <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-[#0f2b4b] shadow-sm border border-[#64bc9f]/20">
    {children}
  </span>
);

// ---------- Modal Component (inlined) ----------
const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#0f2b4b]">{title}</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-slate-100 rounded-full"
              >
                <XMarkIcon className="h-6 w-6 text-slate-500" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ---------- Main App ----------
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [legalModal, setLegalModal] = useState({ open: false, type: "" });

  const videoRef = useRef(null);

  // Smooth scroll to sections
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  // Ensure video plays on mobile
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* ---------- Navbar ---------- */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
        <img
          src="https://res.cloudinary.com/dvcmopd4q/image/upload/v1773158219/d83cbb18-2d41-4d79-8e2a-4d5ef303e442_dpd91v.png"
          alt="BioChainVault Logo"
          className="w-30 h-14 object-contain"
        />
        {/* <span className="font-bold text-[#0f2b4b]">BioChainVault</span> */}
      </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollTo("overview")} className="text-sm font-medium text-slate-700 hover:text-[#64bc9f]">Overview</button>
            <button onClick={() => scrollTo("components")} className="text-sm font-medium text-slate-700 hover:text-[#64bc9f]">Components</button>
            <button onClick={() => scrollTo("privacy")} className="text-sm font-medium text-slate-700 hover:text-[#64bc9f]">Privacy</button>
            <button onClick={() => scrollTo("governance")} className="text-sm font-medium text-slate-700 hover:text-[#64bc9f]">Governance</button>
            <button onClick={() => scrollTo("deployment")} className="text-sm font-medium text-slate-700 hover:text-[#64bc9f]">Deployment</button>
            <button
              onClick={() => setContactModalOpen(true)}
              className="px-4 py-2 bg-[#0f2b4b] text-white rounded-lg text-sm font-medium hover:bg-[#1a3a5f]"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6 text-slate-700" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Modal */}
      <Modal isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} title="Menu">
        <div className="flex flex-col gap-4">
          <button onClick={() => scrollTo("overview")} className="text-left py-2 text-slate-700 hover:text-[#64bc9f]">Overview</button>
          <button onClick={() => scrollTo("components")} className="text-left py-2 text-slate-700 hover:text-[#64bc9f]">Components</button>
          <button onClick={() => scrollTo("privacy")} className="text-left py-2 text-slate-700 hover:text-[#64bc9f]">Privacy</button>
          <button onClick={() => scrollTo("governance")} className="text-left py-2 text-slate-700 hover:text-[#64bc9f]">Governance</button>
          <button onClick={() => scrollTo("deployment")} className="text-left py-2 text-slate-700 hover:text-[#64bc9f]">Deployment</button>
          <button
            onClick={() => { setMobileMenuOpen(false); setContactModalOpen(true); }}
            className="mt-2 px-4 py-2 bg-[#0f2b4b] text-white rounded-lg text-center"
          >
            Contact
          </button>
        </div>
      </Modal>

      {/* Contact Modal */}
      <Modal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} title="Contact BioChainVault">
        <div className="space-y-4">
          <p className="flex items-center gap-2">
            <EnvelopeIcon className="h-5 w-5 text-[#64bc9f]" />
            <a href="mailto:contact@biochainvault.com" className="text-[#0f2b4b] hover:underline">contact@biochainvault.com</a>
          </p>
          <p className="flex items-center gap-2">
            <BuildingLibraryIcon className="h-5 w-5 text-[#64bc9f]" />
            <a href="#" className="text-[#0f2b4b] hover:underline">linkedin.com/company/biochainvault</a>
          </p>
        </div>
      </Modal>

      {/* Legal Modal (Privacy/Terms placeholder) */}
      <Modal isOpen={legalModal.open} onClose={() => setLegalModal({ open: false, type: "" })} title={legalModal.type}>
        <div className="text-slate-600">
          {legalModal.type === "Privacy" && <p>Placeholder privacy policy. We take data protection seriously.</p>}
          {legalModal.type === "Terms" && <p>Placeholder terms of use. By using this site you agree...</p>}
        </div>
      </Modal>

      {/* ---------- Hero with Video ---------- */}
      <section id="overview" className="relative h-screen flex items-center justify-center overflow-hidden">
  <video
    ref={videoRef}
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src={BG_VIDEO} type="video/mp4" />
  </video>
  <div className="absolute inset-0 bg-gradient-to-b from-[#0f2b4b]/80 via-[#0f2b4b]/60 to-[#0f2b4b]/90" />
  
  <div className="relative z-10 text-center px-4 max-w-4xl mx-auto ">
    {/* Logo - centered, sized appropriately, with bottom margin */}
    <img
      src="https://res.cloudinary.com/dvcmopd4q/image/upload/v1773158219/d83cbb18-2d41-4d79-8e2a-4d5ef303e442_dpd91v.png"
      alt="BioChainVault Logo"
      className="h-32 bg-white/20 object-contain rounded-2xl border mb-20 border-white/10 shadow-[0_10px_40px_rgba(100,188,159,0.35)] w-auto mx-auto "
    />
    
    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
    >
      On‑premise governance layer for secure healthcare data access.
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
    >
      BioChainVault sits inside hospitals, labs, and research centers to enable compliant, consent‑aware data sharing with audit‑ready transparency.
    </motion.p>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="flex flex-col sm:flex-row gap-4 justify-center"
    >
      <button 
    onClick={() => window.open('https://calendly.com/salahzakaria/biochainvault-intro-call', '_blank')}
    className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
  >
    Request a pilot
  </button>
      <button
        onClick={() => setContactModalOpen(true)}
        className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold border border-white/30 hover:bg-white/30 transition"
      >
        Contact
      </button>
    </motion.div>
  </div>
</section>
      {/* ---------- Core Components ---------- */}
      <motion.section
        id="components"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="py-20 px-4 max-w-7xl mx-auto"
      >
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#0f2b4b] mb-4">
          Core Components
        </motion.h2>
        <motion.p variants={fadeUp} className="text-lg text-slate-600 mb-12 max-w-3xl">
          BioChainVault is a modular governance stack that integrates with your existing health IT infrastructure.
        </motion.p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: CloudArrowUpIcon, title: "Data Integration", desc: "HL7/FHIR connectors, EHR adapters, lab system interfaces, and research DB connectors normalize data from all sources." },
            { icon: ShieldCheckIcon, title: "Governance Engine", desc: "Policy enforcement (RBAC/ABAC), consent management, and dynamic access control built on InthraOS." },
            { icon: DocumentCheckIcon, title: "Compliance & Audit", desc: "Immutable audit logs, real‑time monitoring, and regulatory rule engine (PDPL, GDPR, HIPAA)." },
            { icon: CpuChipIcon, title: "Secure Compute", desc: "Sandboxed analytics with differential privacy, de‑identification, and query‑only results – no raw data egress." },
            { icon: GlobeAltIcon, title: "API Gateway", desc: "Secure endpoints for researchers, rate limiting, quotas, and fine‑grained authorization." },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-[#64bc9f] hover:shadow-xl transition"
            >
              <item.icon className="h-10 w-10 text-[#64bc9f] mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#0f2b4b]">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ---------- Data Flow ---------- */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger}
        className="py-20 bg-slate-50 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#0f2b4b] mb-12">
            How Data Flows
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Ingest", desc: "Patient data from EHRs, labs, research systems via HL7/FHIR, normalized and stored securely." },
              { step: "2", title: "De‑identify", desc: "Immediate tokenization/pseudonymization of PII. Only governance engine can re‑identify when policy permits." },
              { step: "3", title: "Govern", desc: "Every access request checked against policies, patient consent, and context (role, purpose, time)." },
              { step: "4", title: "Compute & Release", desc: "Researchers query sandboxed environment; only aggregated/de‑identified results returned via API." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="p-6 bg-white rounded-xl shadow-md border border-slate-200"
              >
                <span className="inline-block w-8 h-8 bg-[#64bc9f] text-white rounded-full text-center leading-8 font-bold mb-4">
                  {item.step}
                </span>
                <h3 className="text-xl font-semibold mb-2 text-[#0f2b4b]">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ---------- Privacy & Security Features ---------- */}
      <motion.section
        id="privacy"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger}
        className="py-20 px-4 max-w-7xl mx-auto"
      >
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#0f2b4b] mb-12">
          Privacy & Security
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: LockClosedIcon, title: "Encryption", desc: "TLS 1.3, AES‑256 at rest and in transit. Keys managed via HSM/cloud KMS inside hospital boundary." },
            { icon: FingerPrintIcon, title: "Data Masking", desc: "Tokenization, format‑preserving encryption. Re‑identification requires explicit policy approval." },
            { icon: ScaleIcon, title: "Differential Privacy", desc: "ε‑DP noise added to query results to prevent re‑identification. ε configurable per dataset." },
            { icon: ArrowPathIcon, title: "Zero Trust", desc: "Micro‑segmentation, mTLS between services. Continuous verification for every request." },
            { icon: ServerIcon, title: "Data Sovereignty", desc: "On‑premise or VPC deployment – data never leaves hospital infrastructure without explicit policy." },
            { icon: CpuChipIcon, title: "Secure Enclaves", desc: "Confidential computing (Intel SGX/AMD SEV) for highly sensitive computations." },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="p-6 bg-white rounded-xl shadow-md border border-slate-200 flex flex-col"
            >
              <item.icon className="h-8 w-8 text-[#64bc9f] mb-3" />
              <h3 className="text-lg font-semibold mb-1 text-[#0f2b4b]">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ---------- Governance Engine Deep Dive ---------- */}
      <motion.section
        id="governance"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger}
        className="py-20 bg-slate-50 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#0f2b4b] mb-4">
            Governance Engine 
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-600 mb-8">
            Policy‑as‑code framework with RBAC/ABAC, consent management, and real‑time enforcement.
          </motion.p>
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="space-y-4">
              <div className="flex items-start gap-3">
                <ShieldCheckIcon className="h-6 w-6 text-[#64bc9f] mt-1" />
                <div>
                  <h4 className="font-semibold text-[#0f2b4b]">RBAC + ABAC</h4>
                  <p className="text-slate-600">Predefined roles (clinician, researcher, auditor) combined with dynamic attributes (time, location, data sensitivity, consent).</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DocumentTextIcon className="h-6 w-6 text-[#64bc9f] mt-1" />
                <div>
                  <h4 className="font-semibold text-[#0f2b4b]">Consent Management</h4>
                  <p className="text-slate-600">Patients grant/revoke consent via portal; consents stored as signed JWTs / verifiable credentials. Supports FHIR Consent resource.</p>
                </div>
              </div>
             
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-4">
              <div className="flex items-start gap-3">
                <ClockIcon className="h-6 w-6 text-[#64bc9f] mt-1" />
                <div>
                  <h4 className="font-semibold text-[#0f2b4b]">PEP & PDP</h4>
                  <p className="text-slate-600">Policy Enforcement Point intercepts all requests; Policy Decision Point caches policies and decides in &lt;10ms.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <KeyIcon className="h-6 w-6 text-[#64bc9f] mt-1" />
                <div>
                  <h4 className="font-semibold text-[#0f2b4b]">Audit Logging</h4>
                  <p className="text-slate-600">Every decision, access attempt, and consent change is recorded in an immutable, cryptographically signed audit trail.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ---------- Compliance & Audit Layer ---------- */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger}
        className="py-20 px-4 max-w-7xl mx-auto"
      >
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#0f2b4b] mb-12">
          Compliance & Audit
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: DocumentTextIcon, title: "Immutable Audit Logs", desc: "Tamper‑evident ledger with cryptographic signatures – perfect for regulator audits." },
            { icon: EyeIcon, title: "Real‑time Monitoring", desc: "Alerts on anomalous access patterns (e.g., bulk downloads at 3 AM)." },
            { icon: ScaleIcon, title: "Regulatory Rule Engine", desc: "Pre‑configured for PDPL, GDPR, HIPAA. Automatically enforces data minimization, purpose limitation." },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="p-6 bg-white rounded-xl shadow-md border border-slate-200"
            >
              <item.icon className="h-8 w-8 text-[#64bc9f] mb-3" />
              <h3 className="text-lg font-semibold mb-1 text-[#0f2b4b]">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ---------- Integration & Deployment ---------- */}
      <motion.section
        id="deployment"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger}
        className="py-20 bg-slate-50 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#0f2b4b] mb-4">
            Integration & Deployment
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-600 mb-8">
            Deploy on‑premise or in a private cloud – BioChainVault runs inside your network, connecting to existing systems.
          </motion.p>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="space-y-4">
              <h3 className="text-xl font-semibold text-[#0f2b4b]">Hospital Connectors</h3>
              <ul className="space-y-2">
                {[
                  "EHR Connectors: Epic, Cerner (FHIR APIs or direct DB)",
                  "Lab System Adapters: HL7 v2.x, ASTM",
                  "Research DBs: SQL, NoSQL, RedCap, i2b2",
                  "Identity Federation: Active Directory / LDAP"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#64bc9f]">•</span>
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-4">
              <h3 className="text-xl font-semibold text-[#0f2b4b]">Deployment Specs</h3>
              <ul className="space-y-2">
                {[
                  "Containerized (Docker), orchestrated via Kubernetes",
                  "Minimal hardware: 8+ CPU cores, 32+ GB RAM, 500+ GB SSD",
                  "High availability: multiple replicas, DB replication",
                  "Network: 1 Gbps internal connectivity"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#64bc9f]">•</span>
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ---------- Credibility ---------- */}
      <motion.section
        id="credibility"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="py-20 px-4 max-w-7xl mx-auto"
      >
        <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md border border-slate-200">
          <BeakerIcon className="h-12 w-12 text-[#64bc9f]" />
          <div>
            <h2 className="text-2xl font-bold text-[#0f2b4b]">QSTP Early Track</h2>
            <p className="text-slate-600">Progressing through the Qatar Science & Technology Park accelerator pipeline.</p>
          </div>
        </div>
      </motion.section>

      {/* ---------- Summary ---------- */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="py-20 bg-[#46AF75]/80 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f2b4b] mb-6">Governance as a strategic asset</h2>
          <p className="text-lg text-slate-700 max-w-4xl mx-auto leading-relaxed">
            BioChainVault transforms healthcare data compliance from burden to enabler. Secure data sharing, granular patient consent, regulatory compliance out‑of‑the‑box, and sovereign control – all built on InthraOS. Deploy inside your hospital and unlock research collaborations with complete trust.
          </p>
        </div>
      </motion.section>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-slate-200 bg-white py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-600">
            © 2026 BioChainVault — All rights reserved.
          </div>
          <div className="flex gap-6">
            <button
              onClick={() => setLegalModal({ open: true, type: "Privacy" })}
              className="text-sm text-slate-600 hover:text-[#0f2b4b]"
            >
              Privacy
            </button>
            <button
              onClick={() => setLegalModal({ open: true, type: "Terms" })}
              className="text-sm text-slate-600 hover:text-[#0f2b4b]"
            >
              Terms
            </button>
            <button
              onClick={() => setContactModalOpen(true)}
              className="text-sm text-slate-600 hover:text-[#0f2b4b]"
            >
              Contact
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}