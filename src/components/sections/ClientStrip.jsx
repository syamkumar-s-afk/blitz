const clients = [
  "WEBSITES",
  "MOBILE APPS",
  "E-COMMERCE",
  "BILLING SOFTWARE",
  "CRM SYSTEMS",
  "DASHBOARDS",
  "SAAS PRODUCTS",
  "CUSTOM SOFTWARE",
  "AI CHATBOTS"
];

export default function ClientStrip() {
  // Repeat clients multiple times for seamless marquee
  const repeatedClients = [...clients, ...clients, ...clients, ...clients, ...clients, ...clients];

  return (
    <section className="py-12 border-y border-black overflow-hidden bg-black text-white">
      <div className="flex w-max animate-marquee items-center gap-24 opacity-70 px-12">
        {repeatedClients.map((client, index) => (
          <span key={index} className="text-2xl font-black tracking-widest uppercase">
            {client}
          </span>
        ))}
      </div>
    </section>
  );
}
