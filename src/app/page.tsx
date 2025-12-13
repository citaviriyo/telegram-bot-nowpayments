export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center space-y-3">
        {/* LOGO */}
        <img
          src="/koinity.jpg"
          alt="Koinity Logo"
          className="mx-auto w-32 h-32 object-contain"
        />
        <h1 className="text-3xl font-bold">Koinity</h1>
        <p className="text-muted-foreground">Local dev OK ✅</p>
      </div>
    </main>
  );
}
